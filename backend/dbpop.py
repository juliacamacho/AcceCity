import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from urllib.parse import urlencode
import json
import requests
import random
from detect import objectDetect
# import time

f = open("streetKey.json")
key = json.load(f)

def toLocation(point):
    return "{lat:.9f},{lng:.9f}".format(lat=point[0], lng=point[1])

# Use a service account
cred = credentials.Certificate('./gcp_privkey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
baseURL = "https://maps.googleapis.com/maps/api/streetview"
poor={
    "ramp": ["No disability accessible ramp", "There is no ramp to access the sidewalk. Recommend installing a ramp somewhere within 50 meters.",["Walkability", "Accessibility"],[0.7, 0.5]],
    "parking": ["Few reserved parking spaces", "The parking lot lacks reserved parking spaces. Recommend designating more handicap spaces.",["Parking"],[0.4]],
}
# poor=[
#     ["No guard rails on ramp", "The ramp into the building lacks guard rails. Recommend installing rails for health and safety of disabled peoples.",["Walkability", "Accessibility"],[0.7, 0.5]],
#     ["Few reserved parking spaces", "The parking lot lacks reserved parking spaces. Recommend designating more handicap spaces.",["Parking"],[0.4]],
#     ["No easy access to sidewalk", "The sidewalk lacks easy wheelchair access. Recommend installing a ramp somewhere within 50 meters",["Walkability", "Accessibility"],[0.55, 0.65]],
#     ["No easy access to sidewalk and bus station", "The sidewalk and bus station lack easy wheelchair access. Recommend installing a ramp somewhere within 50 meters",["Walkability", "Accessibility"],[0.5, 0.2]],
# ]

good = {
    "ramp": ["Great wheelchair accessibility", "This area has instances of ramps and/or guardrails.", ["Walkability", "Accessibility"],[0.9, 1]],
    "parking": ["Great parking accessibility", "This area has a great ratio of reserved parking to regular parking.",["Parking"],[0.95]]
}


numPoints = 3


def pop(name, start, end):
    print("called pop with ", start, end)
    s = start.copy()

    latIncr = (end[0] - start[0]) / numPoints
    lngIncr = (end[1] - start[1]) / numPoints

    for _ in range(numPoints):
        s[1] = start[1]
        for _ in range(numPoints):
            s[1] += lngIncr

            params = {
                'size': '400x400', # max 640x640 pixels
                'location': toLocation(s),
                'key': key["GCP_MAPS_KEY"],
                'return_error_code': "true"
            }

            r = requests.get(baseURL+"/metadata", params=params)
            # print(r.url)

            body = dict(r.json())
            if body["status"] == "OK":

                actualLat, actualLong = body["location"]["lat"], body["location"]["lng"]

                for i in range(4): 
                    img_params = {
                        'size': '400x400', # max 640x640 pixels
                        'location': toLocation([actualLat, actualLong]),
                        'key': key["GCP_MAPS_KEY"],
                        'return_error_code': "true",
                        'heading': i*90,
                        'radius': 5,
                        'source': 'outdoor'
                    }

                    img_req = requests.get(baseURL, params=img_params)
                    if img_req.status_code != 200:
                        print("getting image returned ", img_req.status_code, " skipping...")
                        continue
                    img = img_req.content
                    analysis = objectDetect(img)
                    # analysis = {
                    #     "crosswalk": "crosswalk",
                    #     "parking": "handicapped parking",
                    #     "ramp": "no disability accessible ramp",
                    #     "sidewalk": "no sidewalk"
                    # }
                    isGood = False
                    item = None

                    print("analysis is", analysis)

                    if analysis["sidewalk"] == "sidewalk" and "no " in analysis["ramp"]:
                        item = poor["ramp"]
                    elif "no " not in analysis["ramp"]:
                        item = good["ramp"]
                    elif analysis["parking"] == "parking":
                        item = poor["parking"]
                        isGood = True
                    elif analysis["parking"] == "handicapped parking": # "no parking", "handicapped parking","regular parking"
                        item = good["parking"] 
                        isGood = True
                    
                    if isGood:
                        score = random.randint(50,80)
                    else:
                        score = random.randint(10,50)
                    
                    if item != None:
                        data={
                            "scanID": name,
                            "lat": actualLat,
                            "lng": actualLong,
                            "title": item[0],
                            "description": item[1],
                            "tags": item[2],
                            "scores": item[3],
                            "score": score
                        }
                        print("adding data", data, " to firestore")

                        db.collection(u'scans').add(data)
                        break

                # if random.random() < 0.2:
                #     data={
                #         "scanID": name,
                #         "lat": body["location"]["lat"],
                #         "lng": body["location"]["lng"]
                #     }

                #     if random.random() <0.7:
                #         data["score"] = random.randint(8,50)
                #         p = random.choice(poor)
                #         data["title"] = p[0]
                #         data["description"] = p[1]
                #         data["tags"] = p[2]
                #         data["scores"] = p[3]
                #     else:
                #         data["score"] = random.randint(50,80)
                #         p = random.choice(good)
                #         data["title"] = p[0]
                #         data["description"] = p[1]
                #         data["tags"] = p[2]
                #         data["scores"] = p[3]
                    
                #     db.collection(u'scans').add(data)
                    # time.sleep(0.2)

        s[0] += latIncr

if __name__ == "__main__":
    start = [42.360384325990466, -71.11476608519031]
    end = [42.37086174828694, -71.07914887983166]
    pop("MITScan", start, end)