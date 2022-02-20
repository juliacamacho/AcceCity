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

# def objectDetect():
#     try:
#         file = request.files['image']
#         print("File uploaded")
#         #expected = request.form['expected']
#         ret1 = det.detect(file, ["sidewalk","no sidewalk"])
#         print("Ret1: ",ret1)
#         ret2 = det.detect(file, ["parking lot","no parking lot"])
#         print("Ret2: ",ret2)
#         ret3 = "no handicap parking"
#         if ret2=="parking lot":
#             ret3 = det.detect(file, ["handicapped parking","regular parking"])
#             print("Ret3: ",ret3)
#         ret4= "no disability accessible ramp"
#         if ret1=="sidewalk":
#             ret4 = det.detect(file, ["ramp","no ramp"])
#             print("Ret4: ",ret4)
            
#         ret5 = det.detect(file, ["traffic lights","no traffic lights"])
#         print("Ret5: ",ret5)
#         ret6 = "no crosswalk"
#         if ret5=="traffic lights":
#             ret6 = det.detect(file, ["crosswalk","no crosswalk"])
#             print("Ret5: ",ret6)

#         if ret3 =="regular parking":
#             ret3= "no handicap parking"

#         return jsonify({'sidewalk':ret1,'handicap parking':ret3, 'ramp': ret4, 'crosswalk': ret6})
#     except Exception as e:
#         logging.error(traceback.format_exc())
#         return jsonify({'msg': '500 error'})