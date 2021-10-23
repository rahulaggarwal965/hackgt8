import os
from os import path
from cv2 import cv2
import pytesseract as tesseract
from rake_nltk import Rake
import json
from constants import DATA_DIR

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

    def __init__(self, image, index, time_start, time_end, paragraphs=None, keywords=None, audio_transcript=None, references=None):
        self.index = index
        self.image = image
        self.time_start, self.time_end = time_start, time_end
        self.audio_transcript = audio_transcript
        self.references = references
        if not paragraphs and not keywords:
            self.data = tesseract.image_to_data(image, output_type=tesseract.Output.DICT)
            self.paragraphs = generate_paragraphs(self.data)
            r = Rake(include_repeated_phrases=False)
            r.extract_keywords_from_sentences(self.paragraphs)
            self.keywords = r.get_ranked_phrases()
        else:
            self.paragraphs = paragraphs
            self.keywords = keywords
            

    def to_json(self, video_file_name): # should be DATA_DIR/{video_name}/serialized_slides/slide_{i}.json
        to_json = {}
        to_json['index'] = self.index
        image_dir_rel = f"{video_file_name}/images"
        image_dir = f"{DATA_DIR}/{image_dir_rel}"
        if not path.exists(image_dir):
            os.mkdir(image_dir)
        image_path = f"{image_dir}/image_{self.index}.png"
        cv2.imwrite(image_path, self.image)
        to_json['image'] = image_dir_rel
        to_json['timestamp'] = (self.time_start / 1000, self.time_end/ 1000) # convert to seconds
        to_json['audio_transcript'] = self.audio_transcript
        to_json['paragraphs'] = self.paragraphs
        to_json['keywords'] = self.keywords
        to_json['references'] = self.references

        return to_json

    @staticmethod
    def deserialize(data):

        return Slide(
                data["image"],
                data["index"],
                data["timestamp"][0], data["timestamp"][1],
                data["paragraphs"],
                data["keywords"],
                data["audio_transcript"])
                # data["references"])

def serialize_slides(video_file_name, slides):
    video_file = f"{DATA_DIR}/{video_file_name}"
    video_data_dir = path.splitext(video_file)[0]
    if not path.exists(video_data_dir):
        os.mkdir(video_data_dir)
    serialized_slides = []
    for slide in slides:
        serialized_slides.append(slide.to_json(path.splitext(video_file_name)[0]))

    with open(f"{video_data_dir}/serialized_slides.json", "w") as f:
        f.write(json.dumps(serialized_slides))
