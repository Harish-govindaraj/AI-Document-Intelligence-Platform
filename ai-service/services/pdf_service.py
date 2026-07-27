import fitz


class PDFService:

    @staticmethod
    def extract_text(file_path: str):

        try:

            document = fitz.open(file_path)

            extracted_text = ""

            for page in document:
                extracted_text += page.get_text()

            document.close()

            return extracted_text

        except Exception as e:

            print("PDF Extraction Error:", e)
            return ""