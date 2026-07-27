from services.pdf_service import PDFService
from services.ocr_service import ocr_service
from services.summary_service import summary_service
from services.keyword_service import keyword_service
from services.ner_service import ner_service


class DocumentAIService:

    @staticmethod
    def process_document(file_path: str, content_type: str):

        # Step 1 - Extract text
        if content_type == "application/pdf":
            extracted_text = PDFService.extract_text(file_path)

        elif content_type in ["image/jpeg", "image/png"]:
            extracted_text = ocr_service.extract_text(file_path)

        else:
            raise ValueError(f"Unsupported file type: {content_type}")

        # Step 2 - Generate Summary
        summary = summary_service.generate_summary(extracted_text)

        # Step 3 - Extract Keywords
        keywords = keyword_service.extract_keywords(extracted_text)

        # Step 4 - Extract Named Entities
        entities = ner_service.extract_entities(extracted_text)

        # Step 5 - Return AI Results
        return {
            "text": extracted_text,
            "summary": summary,
            "keywords": keywords,
            "entities": entities
        }


document_ai_service = DocumentAIService()