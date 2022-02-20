from flask import Flask, request, jsonify
import dbmock
# import traceback
# import logging
# from detect import ObjectDetector
# from PIL import Image
# from invoiceDetect import predict
# from flask import Flask, jsonify,
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/healthz")
@cross_origin(supports_credentials=True)
def healthz():
    return "<p>Hello, World!</p>"

def toArr(d):
    return [d["lat"], d["lng"]]

@app.route("/scan")
@cross_origin(supports_credentials=True)
def scan():
    args = request.args
    print("got args ", args)

    dbmock.pop(args["name"], [float(args["southWestLat"]),float(args["southWestLng"])], [float(args["northEastLat"]),float(args["northEastLng"])])

    return "ok"