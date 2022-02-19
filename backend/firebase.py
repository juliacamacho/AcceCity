import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('./gcp_privkey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

doc_ref = db.collection(u'scans').add({
    u'scanID': u'1',
    u'score': 52,
    u'row': 0,
    u'col': 0,
    u'images': ["/path/to/img"]
})