import re
import spacy


class NERService:

    ALLOWED_LABELS = {
        "PERSON",
        "ORG",
        "GPE",
        "DATE"
    }

    def __init__(self):
        self.nlp = spacy.load("en_core_web_sm")

    def extract_entities(self, text: str):

        if not text.strip():
            return []

        # Process only the first part for better performance
        doc = self.nlp(text[:5000])

        entities = []
        seen = set()

        for ent in doc.ents:

            entity_text = ent.text.strip()
            entity_label = ent.label_

            # Keep only useful entity types
            if entity_label not in self.ALLOWED_LABELS:
                continue

            # Ignore very short entities
            if len(entity_text) < 2:
                continue

            # Ignore symbols
            if re.fullmatch(r"[^\w]+", entity_text):
                continue

            # Ignore pure numbers except DATE
            if entity_label != "DATE" and entity_text.isdigit():
                continue

            key = (entity_text.lower(), entity_label)

            if key in seen:
                continue

            seen.add(key)

            entities.append({
                "text": entity_text,
                "label": entity_label
            })

        return entities


ner_service = NERService()