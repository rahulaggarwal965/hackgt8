import pytesseract as tesseract
from rake_nltk import Rake
import json

def cleanup(text):
   print(text.strip().split('\n')) 

def generate_paragraphs(data):
    paragraphs = []
    n = len(data['text'])
    prev_hash = 0
    for i in range(n):
        if int(data['conf'][i]) > 50:
            # TODO(rahul): can improve this by using the bottom and top height of subsequent lines to determine if two lines should be connected
            hash = data['block_num'][i] * 100 + data['par_num'][i] * 10 + data['line_num'][i]
            if hash != prev_hash:
                paragraphs.append([])
                prev_hash = hash
            paragraphs[-1].append(data['text'][i]) 

    for i, paragraph in enumerate(paragraphs):
       paragraphs[i] = ' '.join(paragraph)
    return paragraphs


class Slide:

    def __init__(self, image, index, audio_start, audio_end=None):
        self.image = image
        self.drawn = image.copy()
        self.index = index
        self.audio_start = audio_start
        self.audio_end = audio_end
        self.audio_transcript = None
        self.data = tesseract.image_to_data(image, output_type=tesseract.Output.DICT)
        self.paragraphs = generate_paragraphs(self.data)
        r = Rake(include_repeated_phrases=False)
        r.extract_keywords_from_sentences(self.paragraphs)
        self.keywords = r.get_ranked_phrases()

    def serialize(self):
        to_json = {}
        to_json['index'] = self.index
        to_json['audio_timestamp'] = (self.audio_start / 1000, self.audio_end / 1000) # convert to seconds
        # to_json['data'] = self.data
        to_json['audio_transcript'] = self.audio_transcript
        to_json['paragraphs'] = self.paragraphs
        to_json['keywords'] = self.keywords

        return json.dumps(to_json, default=lambda o:o.__dict__, indent=2)

        # n = len(self.data['text'])
        # for i in range(n):
        #     if int(self.data['conf'][i]) > 40:
        #         (x, y, w, h) = (self.data['left'][i], self.data['top'][i], self.data['width'][i], self.data['height'][i])
        #         self.drawn = cv2.rectangle(self.drawn, (x, y), (x + w, y + h), (0, 255, 0), 2)
        # cleanup(self.data)
        # r = Rake()
        # r.extract_keywords_from_text(self.data)
        # self.keywords = r.get_ranked_phrases()
        # print("text: \n", self.data)
        # print("keywords: \n", self.keywords)
        # print("---------")

    

