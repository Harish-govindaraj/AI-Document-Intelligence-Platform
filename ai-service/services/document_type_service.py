import re


class DocumentTypeService:

    DOCUMENT_TYPES = {
        "RESUME",
        "OFFER_LETTER",
        "INVOICE",
        "CERTIFICATE",
        "ACADEMIC_DOCUMENT",
        "GENERAL_DOCUMENT"
    }

    def classify(self, text: str):

        if not text or not text.strip():
            return "GENERAL_DOCUMENT"

        normalized_text = text.lower()

        # --------------------------------------------------
        # Resume detection
        # --------------------------------------------------

        resume_keywords = [
            "resume",
            "curriculum vitae",
            "professional summary",
            "work experience",
            "education",
            "technical skills",
            "skills",
            "projects",
            "certifications",
            "career objective"
        ]

        resume_score = sum(
            1
            for keyword in resume_keywords
            if keyword in normalized_text
        )

        # --------------------------------------------------
        # Offer / LOI detection
        # --------------------------------------------------

        offer_keywords = [
            "letter of intent",
            "offer letter",
            "employment offer",
            "graduate engineer trainee",
            "joining",
            "employment",
            "designation",
            "salary",
            "terms and conditions",
            "company reserves the right"
        ]

        offer_score = sum(
            1
            for keyword in offer_keywords
            if keyword in normalized_text
        )

        # --------------------------------------------------
        # Invoice detection
        # --------------------------------------------------

        invoice_keywords = [
            "invoice",
            "invoice number",
            "bill to",
            "billing address",
            "subtotal",
            "tax",
            "total amount",
            "amount due",
            "payment due"
        ]

        invoice_score = sum(
            1
            for keyword in invoice_keywords
            if keyword in normalized_text
        )

        # --------------------------------------------------
        # Certificate detection
        # --------------------------------------------------

        certificate_keywords = [
            "certificate",
            "certification",
            "certify that",
            "has successfully completed",
            "completion",
            "awarded to"
        ]

        certificate_score = sum(
            1
            for keyword in certificate_keywords
            if keyword in normalized_text
        )

        # --------------------------------------------------
        # Academic document detection
        # --------------------------------------------------

        academic_keywords = [
            "semester",
            "mark sheet",
            "marksheet",
            "grade",
            "grades",
            "cgpa",
            "gpa",
            "course",
            "academic year",
            "examination",
            "university"
        ]

        academic_score = sum(
            1
            for keyword in academic_keywords
            if keyword in normalized_text
        )

        scores = {
            "RESUME": resume_score,
            "OFFER_LETTER": offer_score,
            "INVOICE": invoice_score,
            "CERTIFICATE": certificate_score,
            "ACADEMIC_DOCUMENT": academic_score
        }

        document_type = max(
            scores,
            key=scores.get
        )

        # No meaningful evidence
        if scores[document_type] == 0:
            document_type = "GENERAL_DOCUMENT"

        return document_type


document_type_service = DocumentTypeService()