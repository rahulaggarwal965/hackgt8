import numpy as np
from cv2 import cv2
from Slide import Slide

VIDEO_FILE = "../../data/4 Cellular respiration slides 19-30-tUVjJ8ak3LU.mp4"

slides = [] # array of slides

cap = cv2.VideoCapture(VIDEO_FILE)

if (not cap.isOpened()):
    print("Video file does not exist")
    quit()

ret, frame = cap.read() # do error handling here
if not ret:
    print("Could not receive frame")
    quit()

HEIGHT = frame.shape[0]
WIDTH = frame.shape[1]
NUM_CHANNELS = 3
NUM_PIXELS = HEIGHT * WIDTH * NUM_CHANNELS
slides.append(Slide(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB), index=0, audio_start=0))

while(cap.isOpened()):
    ret, frame = cap.read()

    if not ret:
        print("Could not receive frame")
        break
    
    diff = None
    norm_diff = 0

    curr_slide = slides[-1]

    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    diff = np.square(curr_slide.image - frame)
    norm_diff = np.sum(diff) / NUM_PIXELS

    if norm_diff > 10: # 40 is (sorta) arbitrary
        print(norm_diff)
        time_in_sec = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000
        slides[-1].audio_end = time_in_sec
        slides.append(Slide(frame, len(slides), audio_start=time_in_sec))

    # Display the resulting frame
    cv2.imshow('frame', frame)
    if cv2.waitKey(1) == ord('q'):
        break

slides[-1].audio_end = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000

cap.release()

for slide in slides:
    file = f"../../data/serialized_slides/slide_{slide.index}.json"
    with open(file, "w") as f:
        f.write(slide.serialize())
    # cv2.imshow('drawn', slide.drawn)
    # cv2.waitKey(0)
