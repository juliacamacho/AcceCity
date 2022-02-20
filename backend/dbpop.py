import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from urllib.parse import urlencode
import json
import requests
import random

f = open("streetKey.json")
key = json.load(f)

def toLocation(point):
    return "{lat:.9f},{lng:.9f}".format(lat=point[0], lng=point[1])

# Use a service account
cred = credentials.Certificate('./gcp_privkey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
baseURL = "https://maps.googleapis.com/maps/api/streetview/metadata"
poor=[
    ["No guard rails on ramp", "The ramp into the building lacks guard rails. Recommend installing rails for health and safety of disabled peoples.",["Walkability", "Accessibility"],[1, 0.5]],
    ["Few reserved parking spaces", "The parking lot lacks reserved parking spaces. Recommend designating more handicap spaces.",["Parking"],[0.5]],
    ["No easy access to sidewalk", "The sidewalk lacks easy wheelchair access. Recommend installing a ramp somewhere within 50 meters",["Walkability", "Accessibility"],[0.5, 0.5]],
    ["No easy access to sidewalk and bus station", "The sidewalk and bus station lack easy wheelchair access. Recommend installing a ramp somewhere within 50 meters",["Walkability", "Accessibility"],[0.5, 0]],
]

good = [
    ["Great wheelchair accessibility", "This area has many instances of ramps, guardrails.", ["Walkability", "Accessibility"],[1, 1]],
    ["Great parking accessibility", "This area has a great ratio of reserved parking to regular parking.",["Parking"],[1]]
]


numPoints = 10

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

            r = requests.get(baseURL, params=params)
            # print(r.url)

            body = dict(r.json())
            if body["status"] == "OK":
                # print(body)
                # if "location" not in body:
                #     print("breaking")
                #     continue

                actualLat, actualLong = body["location"]["lat"], body["location"]["lng"]

                print(actualLat, actualLong)
                if random.random() < 0.2:
                    data={
                        "scanID": name,
                        "lat": body["location"]["lat"],
                        "lng": body["location"]["lng"]
                    }

                    if random.random() <0.7:
                        data["score"] = random.randint(8,50)
                        p = random.choice(poor)
                        data["title"] = p[0]
                        data["description"] = p[1]
                        data["tags"] = p[2]
                        data["scores"] = p[3]
                    else:
                        data["score"] = random.randint(50,80)
                        p = random.choice(good)
                        data["title"] = p[0]
                        data["description"] = p[1]
                        data["tags"] = p[2]
                        data["scores"] = p[3]
                    
                    db.collection(u'scans').add(data)

        s[0] += latIncr

if __name__ == "__main__":
    start = [42.360384325990466, -71.11476608519031]
    end = [42.37086174828694, -71.07914887983166]
    pop("MITScan", start, end)