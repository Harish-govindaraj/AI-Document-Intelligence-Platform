from services.ocr_service import ocr_service

text = ocr_service.extract_text(r"C:\Users\HP\Downloads\download.jpg")

print(text)