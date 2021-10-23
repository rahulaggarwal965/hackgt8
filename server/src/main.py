from constants import DATA_DIR
from process import process_video

# TODO(rahul): make these filepaths work on all systems no matter where the main file is run from
VIDEO_FILE = f"{DATA_DIR}/4 Cellular respiration slides 19-30-tUVjJ8ak3LU.mp4"
# AUDIO_OUT = "../../data/4 Cellular respiration slides 19-30-tUVjJ8ak3LU.wav"

# TRANSCRIBE_AUDIO=False
# DRAW_WINDOW=False
# 
# slides = [] # array of slides
# 
# # should be one time
# if not path.exists(AUDIO_OUT):
#     clip = mp.VideoFileClip(VIDEO_FILE)
#     clip.audio.write_audiofile(AUDIO_OUT)
# 
# 
# cap = cv2.VideoCapture(VIDEO_FILE)
# r = sr.Recognizer()
# audio = sr.AudioFile(AUDIO_OUT)
# with audio as source:
#     audio_file = r.record(source)
# 
# if (not cap.isOpened()):
#     print("Video file does not exist")
#     quit()
# 
# ret, frame = cap.read() # do error handling here
# if not ret:
#     print("Could not receive frame")
#     quit()
# 
# HEIGHT = frame.shape[0]
# WIDTH = frame.shape[1]
# NUM_CHANNELS = 3
# NUM_PIXELS = HEIGHT * WIDTH * NUM_CHANNELS
# slides.append(Slide(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB), index=0, audio_start=0))
# 
# while(cap.isOpened()):
#     ret, frame = cap.read()
# 
#     if not ret:
#         print("Could not receive frame")
#         break
#     
#     diff = None
#     norm_diff = 0
# 
#     curr_slide = slides[-1]
# 
#     frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     diff = np.square(curr_slide.image - frame)
#     norm_diff = np.sum(diff) / NUM_PIXELS
# 
#     if norm_diff > 10: # 10 is measured off of one example
#         print(norm_diff)
#         time_in_msec = cap.get(cv2.CAP_PROP_POS_MSEC)
#         slides[-1].audio_end = time_in_msec
#         try:
#             if TRANSCRIBE_AUDIO:
#                 seg = audio_file.get_segment(slides[-1].audio_start, slides[-1].audio_end)
#                 slides[-1].audio_transcript = r.recognize_google(seg)
#         except (sr.UnknownValueError, sr.RequestError) as e:
#             print("Could not transcribe audio")
#             slides[-1].audio_transcript = "" 
#         slides.append(Slide(frame, len(slides), audio_start=time_in_msec))
# 
#     # Display the resulting frame
#     if DRAW_WINDOW == True:
#         cv2.imshow('frame', frame)
#         if cv2.waitKey(1) == ord('q'):
#             break
# 
# slides[-1].audio_end = cap.get(cv2.CAP_PROP_POS_MSEC)
# 
# cap.release()
# 
# for slide in slides:
#     file = f"../../data/serialized_slides/slide_{slide.index}.json"
#     with open(file, "w") as f:
#         f.write(slide.serialize())
    # cv2.imshow('drawn', slide.drawn)
    # cv2.waitKey(0)

process_video(VIDEO_FILE)
