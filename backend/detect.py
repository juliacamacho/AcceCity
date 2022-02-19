import clip
import torch
from PIL import Image

class ObjectDetector:
    def __init__(self):
        # Load the model
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model, self.preprocess = clip.load('ViT-B/32', self.device)
    
    def runDetect(self,filename,options = ["handicap","parking"]):
        # Prepare the inputs
        image = self.preprocess(Image.open(filename)).unsqueeze(0).to(self.device)
        
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