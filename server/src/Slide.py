import numpy as np
import cv2
import pytesseract as tesseract
from rake_nltk import Rake
import json

def cleanup(text):
   print(text.strip().split('\n')) 

def generate_paragraphs(data):
    paragraphs = []
    n = len(data['text'])
    for i in range(n):
        if int(data['conf'][i]) > 40:
            print("hello")

class Slide:

    def __init__(self, image, index, audio_start, audio_end=None):
        self.image = image
        self.drawn = image.copy()
        self.index = index
        self.audio_start = audio_start
        self.audio_end = audio_end
        self.data = tesseract.image_to_data(image, output_type=tesseract.Output.DICT)
        # self.paragraphs = generate_paragraphs(self.data)

    def serialize(self):
        to_json = {}
        to_json['index'] = self.index
        to_json['audio_timestamp'] = (self.audio_start, self.audio_end)
        to_json['data'] = self.data

        return json.dumps(to_json, default=lambda o:o.__dict__, sort_keys=True, indent=2)

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

    

