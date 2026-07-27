import re


class SummaryService:

    @staticmethod
    def generate_summary(text: str):

        if not text.strip():
            return "No text extracted."

        sentences = re.split(r'(?<=[.!?])\s+', text.strip())

        summary = " ".join(sentences[:5])

        return summary


summary_service = SummaryService()