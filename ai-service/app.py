from fastapi import FastAPI, UploadFile, File
import tempfile
import os

from services.document_ai_service import document_ai_service

app = FastAPI(
    title="DocMind AI Service",
    version="1.0"
)


@app.get("/")
def home():
    return {
        "service": "DocMind AI Service",
        "status": "Running"
    }


@app.post("/process")
async def process_document(file: UploadFile = File(...)):

    temp_path = None

    try:

        # Preserve the uploaded file extension
        extension = os.path.splitext(file.filename)[1]

        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(
                delete=False,
                suffix=extension
        ) as temp_file:

            temp_file.write(await file.read())
            temp_path = temp_file.name

        # Delegate all AI processing
        result = document_ai_service.process_document(
            temp_path,
            file.content_type
        )

        return {
            "status": "SUCCESS",
            "receivedFile": file.filename,
            **result
        }

    except Exception as e:

        return {
            "status": "FAILED",
            "receivedFile": file.filename,
            "text": "",
            "summary": "",
            "keywords": [],
            "entities": [],
            "error": str(e)
        }

    finally:

        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)