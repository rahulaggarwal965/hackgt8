import os
import json

VIDEO_FILE = "../../data/4 Cellular respiration slides 19-30-tUVjJ8ak3LU2.mp4"
from constants import DATA_DIR
from process import process_video
from gen_graph import generate_graph
from slide import Slide

# TODO(rahul): make these filepaths work on all systems no matter where the main file is run from
VIDEO_FILE = "4 Cellular respiration slides 19-30-tUVjJ8ak3LU.mp4"

PROCESS=False

if PROCESS:
    process_video(VIDEO_FILE)
else:
    SERIALIZED_SLIDES = f"{DATA_DIR}/4 Cellular respiration slides 19-30-tUVjJ8ak3LU/serialized_slides.json"

    slides = []
    with open(SERIALIZED_SLIDES) as f:
        data_raw = f.read()
        data = json.loads(data_raw)
    
        for d in data:
            slides.append(Slide.deserialize(d))
            print(slides[-1])

        
    graph = generate_graph(slides)
    print(graph)

