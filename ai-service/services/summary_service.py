from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch
import time


class SummaryService:

    def __init__(self):

        print("Loading FLAN-T5 Base summarization model...")

        self.model_name = "google/flan-t5-base"

        self.tokenizer = AutoTokenizer.from_pretrained(
            self.model_name
        )

        self.model = AutoModelForSeq2SeqLM.from_pretrained(
            self.model_name
        )

        # Use CPU for compatibility with the current environment
        self.device = torch.device("cpu")

        self.model.to(self.device)
        self.model.eval()

        print("FLAN-T5 Base loaded successfully.")

    def generate_summary(self, text: str):

        if not text or not text.strip():
            return "No text extracted."

        # Clean OCR/PDF text
        text = " ".join(text.split())

        # Keep input manageable for CPU processing
        text = text[:4000]

        prompt = (
            "Summarize the following document clearly and concisely. "
            "Include the main purpose, important people or organizations, "
            "important dates, and key information.\n\n"
            f"Document:\n{text}\n\n"
            "Summary:"
        )

        start = time.time()

        print("Generating FLAN-T5 summary...")

        inputs = self.tokenizer(
            prompt,
            return_tensors="pt",
            truncation=True,
            max_length=512
        )

        inputs = {
            key: value.to(self.device)
            for key, value in inputs.items()
        }

        with torch.no_grad():

            output = self.model.generate(
                **inputs,
                max_new_tokens=150,
                min_new_tokens=30,
                num_beams=4,
                early_stopping=True
            )

        summary = self.tokenizer.decode(
            output[0],
            skip_special_tokens=True
        )

        print(
            f"FLAN-T5 summary completed in "
            f"{time.time() - start:.2f} sec"
        )

        return summary.strip()


summary_service = SummaryService()