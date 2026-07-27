import pytesseract
from PIL import Image

# Windows Tesseract executable
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


class OCRService:

    @staticmethod
    def extract_text(image_path: str):

        image = Image.open(image_path)

        text = pytesseract.image_to_string(
            image,
            lang="eng"
        )

        return text.strip()


ocr_service = OCRService()