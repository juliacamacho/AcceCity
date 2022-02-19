from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/objectDetect",methods = ['POST'])
@cross_origin(supports_credentials=True)
def objectDetect():