import os
import json

from constants import DATA_DIR
from process import process_video, download
from gen_graph import generate_graph
from slide import Slide, serialize_slides

# TODO(rahul): make these filepaths work on all systems no matter where the main file is run from
VIDEO_FILE = "4 Cellular respiration slides 19-30-tUVjJ8ak3LU2.mp4"
URL="https://www.youtube.com/watch?v=tUVjJ8ak3LU"

PROCESS=True

if PROCESS:
    video_file_name = download(URL)
    # slides = process_video(video_file_name)
    # generate_graph(slides)
    # serialize_slides(VIDEO_FILE, slides, write_to_file=True)
else:
    SERIALIZED_SLIDES = f"{DATA_DIR}/4 Cellular respiration slides 19-30-tUVjJ8ak3LU/serialized_slides.json"

    slides = []
    with open(SERIALIZED_SLIDES) as f:
        data_raw = f.read()
        data = json.loads(data_raw)
    
        for d in data:
            slides.append(Slide.deserialize(d))

    generate_graph(slides)

