import time

from services.pdf_service import PDFService
from services.ocr_service import ocr_service
from services.summary_service import summary_service
from services.keyword_service import keyword_service
from services.ner_service import ner_service
from services.document_type_service import document_type_service

class DocumentAIService:

    @staticmethod
    def process_document(file_path: str, content_type: str):

        total_start = time.time()

        # OCR / PDF
        start = time.time()

        if content_type == "application/pdf":
            extracted_text = PDFService.extract_text(file_path)

        elif content_type in ["image/jpeg", "image/png"]:
            extracted_text = ocr_service.extract_text(file_path)

        else:
            raise ValueError(f"Unsupported file type: {content_type}")

        print(f"OCR/PDF Extraction : {time.time()-start:.2f} sec")

        # Summary
        start = time.time()

        summary = summary_service.generate_summary(extracted_text)

        print(f"Summary : {time.time()-start:.2f} sec")

        # Keywords
        start = time.time()

        keywords = keyword_service.extract_keywords(extracted_text)

        print(f"Keywords : {time.time()-start:.2f} sec")

        # NER
        start = time.time()

        entities = ner_service.extract_entities(extracted_text)

        print(f"NER : {time.time()-start:.2f} sec")

        print(f"TOTAL : {time.time()-total_start:.2f} sec")

        document_type = document_type_service.classify(
            extracted_text
        )

        print(
            f"Detected document type: {document_type}"
        )


        return {
            "text": extracted_text,
            "summary": summary,
            "keywords": keywords,
            "entities": entities,
            "document_type": document_type
        }


document_ai_service = DocumentAIService()