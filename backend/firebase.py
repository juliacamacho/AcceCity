import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('./gcp_privkey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

docs = [
    {
        "scanID": "MIT",
        "tags": ["Walkability", "Accessibility"],
        "lat": 42.36,
        "lng": -71.09,
        "score": 88,
        "title": "Great ramp up to various resources",
        "description": "The ramp leads to a sidewalk, a bus station, and to building access."
    },
    {
        "scanID": "MIT",
        "tags": ["Walkability", "Accessibility"],
        "lat": 42.365,
        "lng": -71.093,
        "score": 21,
        "title": "No guard rails on ramp",
        "description": "The ramp into the building lacks guard rails. "
    },
    {
        "scanID": "MIT",
        "tags": ["Parking"],
        "lat": 42.363,
        "lng": -71.098,
        "score": 25,
        "title": "Few reserved parking spaces",
        "description": "The parking lot lacks reserved parking spaces. "
    }
]

def delete_collection(coll_ref, batch_size):
    docs = coll_ref.limit(batch_size).stream()
    deleted = 0

    for doc in docs:
        print(f'Deleting doc {doc.id} => {doc.to_dict()}')
        doc.reference.delete()
        deleted = deleted + 1

    if deleted >= batch_size:
        return delete_collection(coll_ref, batch_size)

delete_collection(db.collection(u'scans'), 10)

for doc in docs:
    db.collection(u'scans').add(doc)
