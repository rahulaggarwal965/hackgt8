import os
import shutil, os
from os.path import isfile, join
from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from process import download, process_video
from gen_graph import generate_graph
from slide import serialize_slides
project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "slidedatabase.db"))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)

@app.route("/", methods=["GET", "POST"])
def createJSON():
    if request.method == "GET":
        vidURL = request.headers["videoURL"]
        transcribe_audio = int(request.headers["transcribe_audio"])
        draw_window = int(request.headers["draw_window"])
        
        outFile = download(vidURL)
        mypath = "../../data/" + outFile + "/images"
        files = [f for f in listdir(mypath) if isfile(join(mypath, f))]
        print(files)
        for f in files:
            file = ""
            file += mypath + f
            shutil.copy(file, "../../public/my-app/public/images")
        slides = process_video(outFile, transcribe_audio=transcribe_audio, draw_window=draw_window)
        generate_graph(slides)
        retVal = serialize_slides(outFile, slides)
        
        return retVal

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
