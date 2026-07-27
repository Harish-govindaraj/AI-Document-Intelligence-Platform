import yake


class KeywordService:

    def __init__(self):

        self.extractor = yake.KeywordExtractor(

            lan="en",

            n=2,

            dedupLim=0.9,

            top=10

        )

    def extract_keywords(self, text: str):

        if not text.strip():
            return []

        keywords = self.extractor.extract_keywords(text)

        return [keyword for keyword, score in keywords]


keyword_service = KeywordService()