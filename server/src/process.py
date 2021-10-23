# Paths
import os
from os import path
import json

# Image/Video
import numpy as np
from cv2 import cv2

# Audio
import moviepy.editor as mp
import speech_recognition as sr

# Local
from slide import Slide, serialize_slides
from constants import FRAME_DISTANCE_THRESHOLD, DATA_DIR

def extract_audio_file(video_file):
    video_data_dir = path.splitext(video_file)[0]
    if not path.exists(video_data_dir):
        os.mkdir(video_data_dir)
    audio_file_name = f"{video_data_dir}/{os.path.basename(video_data_dir)}.wav"
    if not path.exists(audio_file_name):
        clip = mp.VideoFileClip(video_file)
        clip.audio.write_audiofile(audio_file_name)

    return audio_file_name

def init_audio_transcripter(audio_file_name):
    r = sr.Recognizer()
    audio = sr.AudioFile(audio_file_name)
    with audio as source:
        audio_file = r.record(source)
    return r, audio_file

def transcribe_audio(audio_file, r, start_msec, end_msec):
    try:
        seg = audio_file.get_segment(start_msec, end_msec)
        return r.recognize_google(seg)
    except (sr.UnknownValueError, sr.RequestError) as _:
        print("Could not transcribe audio")
        return  ""

def process_video(video_file_name, serialize_slides=False, transcribe_audio=False, draw_window=False):

    video_file = f"{DATA_DIR}/{video_file_name}"
    if not path.exists(video_file):
        print("Video file provided does not exist")
        quit()


    audio_file_name = extract_audio_file(video_file)
    r, audio_file = None, None
    if transcribe_audio:
        r, audio_file = init_audio_transcripter(audio_file_name)

    cap = cv2.VideoCapture(video_file)
    num_frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    fps = cap.get(cv2.CAP_PROP_FPS)

    if (not cap.isOpened()):
        print("Video file does not exist")
        quit()

    ret, frame = cap.read() # do error handling here
    if not ret:
        print("Could not receive frame")
        quit()

    height, width, num_channels = frame.shape[:3]
    num_pixels = height * width * num_channels

    slides = [Slide(frame, index=0, time_start=0, time_end=None)]

    current_frame = 1
    while(current_frame < num_frames):
        ret, frame = cap.read()

        if not ret:
            print("Could not receive frame")
            break
        
        diff = np.square(slides[-1].image - frame)
        norm_diff = np.sum(diff) / num_pixels

        if norm_diff > FRAME_DISTANCE_THRESHOLD: # 10 is measured off of one example
            print(norm_diff)
            time_in_msec = cap.get(cv2.CAP_PROP_POS_MSEC)
            slides[-1].time_end = time_in_msec
            if transcribe_audio:
                slides[-1].audio_transcript = transcribe_audio(audio_file, r, slides[-1].time_start, slides[-1].time_end)
            slides.append(Slide(frame, len(slides), time_start=time_in_msec, time_end=None))

        current_frame += 1

        # Display the resulting frame
        if draw_window:
            cv2.imshow('frame', frame)
            if cv2.waitKey(1) == ord('q'):
                break

    slides[-1].time_end = num_frames * 1000 / fps
    if transcribe_audio:
        # purposely don't specify end so we automatically get end
        slides[-1].audio_transcript = transcribe_audio(audio_file, r, slides[-1].time_start, None)

    cap.release()

    if serialize_slides:
        serialize_slides(video_file_name, slides)

    return slides


