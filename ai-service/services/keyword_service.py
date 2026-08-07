from keybert import KeyBERT
import time


class KeywordService:

    def __init__(self):

        print("Loading KeyBERT model...")

        self.model = KeyBERT("all-MiniLM-L6-v2")

        print("KeyBERT model loaded successfully.")

    def extract_keywords(self, text: str):

        if not text or not text.strip():
            return []

        # Limit OCR text for better performance
        text = text[:1000]

        start = time.time()

        print("Starting KeyBERT extraction...")

        keywords = self.model.extract_keywords(
            text,
            keyphrase_ngram_range=(1, 2),
            stop_words="english",
            top_n=10
        )

        print(f"KeyBERT completed in {time.time() - start:.2f} sec")

        return [keyword for keyword, score in keywords]


keyword_service = KeywordService()