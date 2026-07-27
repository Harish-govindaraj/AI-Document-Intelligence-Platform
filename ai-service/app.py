from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="DocMind AI Service",
    version="1.0"
)

class ProcessRequest(BaseModel):
    filePath: str


@app.get("/")
def home():
    return {
        "service": "DocMind AI",
        "status": "Running"
    }


@app.post("/process")
def process_document(request: ProcessRequest):

    return {
        "status": "SUCCESS",
        "receivedFile": request.filePath,
        "summary": "This is a placeholder summary.",
        "keywords": [
            "AI",
            "Document",
            "Spring Boot"
        ],
        "entities": [
            "DocMind"
        ]
    }