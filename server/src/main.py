import os

from constants import DATA_DIR
from process import process_video
from gen_graph import generate_graph
from slide import Slide

# TODO(rahul): make these filepaths work on all systems no matter where the main file is run from
VIDEO_FILE = f"{DATA_DIR}/4 Cellular respiration slides 19-30-tUVjJ8ak3LU.mp4"

PROCESS=False

if PROCESS:
    process_video(VIDEO_FILE)
else:
    SERIAL_DIR = f"{DATA_DIR}/4 Cellular respiration slides 19-30-tUVjJ8ak3LU/serialized_slides"

    serialized_slides = os.listdir(SERIAL_DIR)
    slides = []
    for slide_file_name in serialized_slides:
        slide_path = f"{SERIAL_DIR}/{slide_file_name}"
        print(slide_path)
        slides.append(Slide.deserialize(slide_path))
        print(slides[-1])

        
    # generate_graph(None)

