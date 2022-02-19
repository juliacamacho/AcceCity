from flask import Flask

app = Flask(__name__)

@app.route("/healthz")
def healthz():
    return "<p>Hello, World!</p>"


@app.route("/healthz")
def healthz():
    return "<p>Hello, World!</p>"

