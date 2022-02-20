import clip
import torch
from PIL import Image
import io

class ObjectDetector:
    def __init__(self):
        # Load the model
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model, self.preprocess = clip.load('ViT-B/32', self.device)
    
    def detect(self,im,options):#["sidewalk","parking"]
        # Prepare the inputs
        image = self.preprocess(im).unsqueeze(0).to(self.device)
        
        text = clip.tokenize(options).to(self.device)

        with torch.no_grad():
            image_features = self.model.encode_image(image)
            text_features = self.model.encode_text(text)
            
            logits_per_image, logits_per_text = self.model(image, text)
            probs = logits_per_image.softmax(dim=-1).cpu().numpy()
        
        index_max = max(range(len(probs[0])), key=probs[0].__getitem__)
        print(options)
        print(probs)
        print(probs[0][index_max])

        return options[index_max]

det = ObjectDetector()
def objectDetect(im):
    try:
        image = Image.open(io.BytesIO(im))
        #expected = request.form['expected']
        ret1 = det.detect(image, ["sidewalk","no sidewalk"])
        print("Ret1: ",ret1)
        ret2 = det.detect(image, ["parking lot","no parking lot"])
        print("Ret2: ",ret2)
        ret3 = "no parking"
        if ret2=="parking lot":
            ret3 = det.detect(image, ["handicapped parking","regular parking"])
            print("Ret3: ",ret3)
        ret4= "no disability accessible ramp"
        if ret1=="sidewalk":
            ret4 = det.detect(image, ["ramp","no ramp"])
            print("Ret4: ",ret4)
            
        ret5 = det.detect(image, ["traffic lights","no traffic lights"])
        print("Ret5: ",ret5)
        ret6 = "no crosswalk"
        if ret5=="traffic lights":
            ret6 = det.detect(image, ["crosswalk","no crosswalk"])
            print("Ret5: ",ret6)

        # if ret3 =="regular parking":
        #     ret3= "no handicap parking"

        return {'sidewalk':ret1,'parking':ret3, 'ramp': ret4, 'crosswalk': ret6}
    except Exception as e:
        logging.error(traceback.format_exc())
        return {'msg': '500 error'}