from flask import Flask, request, jsonify
import dbpop
# import traceback
# import logging
# from detect import ObjectDetector
# from PIL import Image
# from invoiceDetect import predict
# from flask import Flask, jsonify,
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/healthz")
def healthz():
    return "<p>Hello, World!</p>"


def toArr(d):
    return [d["lat"], d["lng"]]

@app.route("/scan")
def scan():
    args = request.args
    print("got args ", args)

    dbpop.pop(args["name"], [float(args["southWestLat"]),float(args["southWestLng"])], [float(args["northEastLat"]),float(args["northEastLng"])])

    return "ok"


# @app.route("/objectDetect",methods = ['POST'])
# def objectDetect():
#     try:
#         file = request.files['image']
#         print("File uploaded")
#         #expected = request.form['expected']
#         ret1 = det.runDetect(file)
#         print("Ret1: ",ret1)
#         ret=""
#         if ret1=="sidewalk":
#             ret = det.runDetectSidewalk(file)
#         if ret1=="parking":
#             ret = det.runDetectPark(file)
#         if ret=="parking":
#             ret = "normal parking"
#         if ret=="sidewalk":
#             ret = "normal sidewalk"
#         if ret=="handicap":
#             ret = "handicapped parking"
#         return jsonify({'msg': 'success', 'mlres':ret})
#     except Exception as e:
#         logging.error(traceback.format_exc())
#         return jsonify({'msg': '500 error'})