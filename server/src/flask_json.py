from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from process import download, process_video
from gen_graph import generate_graph
from slide import serialize_slides
import os
from flask_sqlalchemy import SQLAlchemy
project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "slidedatabase.db"))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)

#class Slide(db.Model):
    #title = db.Column(db.String(80), unique=True, nullable=False, primary_key=True) #replace with actual
    #index = [] get list of indices
    #def __repr__(self):
    #    return "<Title: {}>".format(self.title)

@app.route("/", methods=["GET", "POST"])
def createJSON():
    # if request.form:
    #     slide = Slide(title=request.form.get("title"))
    #     db.session.add(slide)
    #     db.session.commit()
    # slides = Slide.query.all()
    # return render_template("home.html", slides=slides)

    # return {
    #     "asd": 0,
    #     "temp": 123,
    #     "example": 3
    # }
    if request.method == "GET":
        vidURL = request.headers["videoURL"]
        transcribe_audio = int(request.headers["transcribe_audio"])
        draw_window = int(request.headers["draw_window"])
        
        outFile = download(vidURL)
        slides = process_video(outFile, transcribe_audio=transcribe_audio, draw_window=draw_window)
        generate_graph(slides)
        retVal = serialize_slides(outFile, slides)
        
        return retVal
        #return ret
    #if request.method == "POST":
    #   urlName = request.form[url]
    #   return urlName
    #   update specified area with data

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
