import re
import spacy


class NERService:

    # Entity types useful for DocMind AI
    ALLOWED_LABELS = {
        "PERSON",
        "ORG",
        "GPE",
        "DATE",
        "MONEY",
        "TIME",
        "CARDINAL",
        "NORP",
        "DURATION"
    }

    # Generic words that should not normally appear as useful entities
    IGNORED_ENTITIES = {
        "year",
        "years",
        "month",
        "months",
        "day",
        "days",
        "week",
        "weeks",
        "company",
        "organization",
        "college",
        "school",
        "university",
        "student",
        "candidate",
        "employee",
        "trainee",
        "lakh"
    }

    # ------------------------------------------------------------------
    # Initialization
    # ------------------------------------------------------------------

    def __init__(self):

        print("Loading spaCy Transformer NER model...")

        self.nlp = spacy.load("en_core_web_trf")

        print("spaCy Transformer NER loaded successfully.")

    # ------------------------------------------------------------------
    # Main NER method
    # ------------------------------------------------------------------

    def extract_entities(self, text: str):

        if not text or not text.strip():
            return []

        # Limit processing for CPU performance
        text = text[:5000]

        print("Starting NER extraction...")

        doc = self.nlp(text)

        # --------------------------------------------------------------
        # Step 1: Collect raw spaCy entities
        # --------------------------------------------------------------

        raw_entities = []

        for ent in doc.ents:

            entity_text = ent.text.strip()
            entity_label = ent.label_

            if entity_label not in self.ALLOWED_LABELS:
                continue

            entity_text = self._clean_entity_text(entity_text)

            if not entity_text:
                continue

            if not self._is_valid_entity(entity_text, entity_label):
                continue

            raw_entities.append({
                "text": entity_text,
                "label": entity_label
            })

        # --------------------------------------------------------------
        # Step 2: Correct obvious duration entities
        # --------------------------------------------------------------

        normalized_entities = []

        for entity in raw_entities:

            entity_text = entity["text"]
            entity_label = entity["label"]

            if self._is_duration(entity_text):

                normalized_entities.append({
                    "text": entity_text,
                    "label": "DURATION"
                })

            else:

                normalized_entities.append({
                    "text": entity_text,
                    "label": entity_label
                })

        # --------------------------------------------------------------
        # Step 3: Add money entities detected using patterns
        # --------------------------------------------------------------

        money_entities = self._extract_money_entities(text)

        normalized_entities.extend(money_entities)

        # --------------------------------------------------------------
        # Step 4: Add duration entities detected using patterns
        # --------------------------------------------------------------

        duration_entities = self._extract_duration_entities(text)

        normalized_entities.extend(duration_entities)

        # --------------------------------------------------------------
        # Step 5: Resolve PERSON / ORG conflicts
        # --------------------------------------------------------------

        normalized_entities = self._resolve_person_org_conflicts(
            normalized_entities
        )

        # --------------------------------------------------------------
        # Step 6: Remove duplicates
        # --------------------------------------------------------------

        normalized_entities = self._remove_duplicates(
            normalized_entities
        )

        print(
            f"NER extracted {len(normalized_entities)} "
            f"normalized entities."
        )

        return normalized_entities

    # ------------------------------------------------------------------
    # Entity text cleaning
    # ------------------------------------------------------------------

    @staticmethod
    def _clean_entity_text(text: str):

        text = text.strip()

        # Remove unnecessary surrounding punctuation
        text = text.strip(
            " ,.;:!?()[]{}\"'"
        )

        # Normalize multiple spaces
        text = re.sub(
            r"\s+",
            " ",
            text
        )

        return text.strip()

    # ------------------------------------------------------------------
    # Entity validation
    # ------------------------------------------------------------------

    def _is_valid_entity(
            self,
            text: str,
            label: str
    ):
        if label == "CARDINAL":
            if re.fullmatch(r"\d+(\.\d+)?", text.strip()):
                return False
        if len(text) < 2:
            return False

        # Ignore generic words
        if text.lower() in self.IGNORED_ENTITIES:
            return False

        # Ignore pure symbols
        if re.fullmatch(
                r"[^\w\s]+",
                text
        ):
            return False

        # Ignore isolated numbers
        if label not in {
            "DATE",
            "MONEY",
            "CARDINAL",
            "DURATION"
        }:

            if re.fullmatch(
                    r"\d+",
                    text
            ):
                return False

        # Ignore one-character cardinal numbers
        if label == "CARDINAL":

            if len(text.strip()) == 1:
                return False

        return True

    # ------------------------------------------------------------------
    # Duration detection
    # ------------------------------------------------------------------

    @staticmethod
    def _is_duration(text: str):

        duration_pattern = re.compile(
            r"""
            \b
            (
                \d+
                |
                one|two|three|four|five|six|seven|eight|nine|ten
            )
            \s*
            (
                year|years|
                month|months|
                week|weeks|
                day|days|
                hour|hours|
                minute|minutes
            )
            \b
            """,
            re.IGNORECASE | re.VERBOSE
        )

        return bool(
            duration_pattern.search(text)
        )

    # ------------------------------------------------------------------
    # Extract duration entities directly from document text
    # ------------------------------------------------------------------

    @staticmethod
    def _extract_duration_entities(text: str):

        pattern = re.compile(
            r"""
            \b
            (
                \d+
                |
                one|two|three|four|five|six|seven|eight|nine|ten
                |
                one\s*\(\s*1\s*\)
                |
                two\s*\(\s*2\s*\)
                |
                three\s*\(\s*3\s*\)
            )
            \s*
            (
                year|years|
                month|months|
                week|weeks|
                day|days|
                hour|hours|
                minute|minutes
            )
            \b
            """,
            re.IGNORECASE | re.VERBOSE
        )

        entities = []

        for match in pattern.finditer(text):

            value = match.group(0).strip()

            entities.append({
                "text": value,
                "label": "DURATION"
            })

        return entities

    # ------------------------------------------------------------------
    # Extract money entities
    # ------------------------------------------------------------------

    @staticmethod
    def _extract_money_entities(text: str):

        money_pattern = re.compile(
            r"""
            (?:
                Rs\.?
                |
                INR
                |
                ₹
                |
                \$
                |
                USD
            )
            \s*
            [\d,]+
            (?:
                \.\d+
            )?
            \s*
            (?:
                /-
                |
                lakh
                |
                lakhs
                |
                crore
                |
                crores
            )?
            """,
            re.IGNORECASE | re.VERBOSE
        )

        entities = []

        for match in money_pattern.finditer(text):

            value = match.group(0).strip()

            value = re.sub(
                r"\s+",
                " ",
                value
            )

            entities.append({
                "text": value,
                "label": "MONEY"
            })

        return entities

    # ------------------------------------------------------------------
    # Resolve PERSON / ORG conflicts
    # ------------------------------------------------------------------

    @staticmethod
    def _resolve_person_org_conflicts(entities):

        person_names = set()

        # First collect entities identified as PERSON
        for entity in entities:

            if entity["label"] == "PERSON":

                person_names.add(
                    entity["text"].lower()
                )

        resolved = []

        for entity in entities:

            entity_text = entity["text"]
            entity_label = entity["label"]

            # If spaCy identifies the same text as PERSON
            # anywhere else, prefer PERSON over ORG.
            if (
                entity_label == "ORG"
                and entity_text.lower() in person_names
            ):

                entity_label = "PERSON"

            resolved.append({
                "text": entity_text,
                "label": entity_label
            })

        return resolved

    # ------------------------------------------------------------------
    # Remove duplicates
    # ------------------------------------------------------------------

    @staticmethod
    def _remove_duplicates(entities):

        seen = set()
        result = []

        for entity in entities:

            text = entity["text"]

            label = entity["label"]

            key = (
                re.sub(
                    r"\s+",
                    " ",
                    text.lower()
                ),
                label
            )

            if key in seen:
                continue

            seen.add(key)

            result.append({
                "text": text,
                "label": label
            })

        return result


ner_service = NERService()