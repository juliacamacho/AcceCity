import clip
import torch
from PIL import Image

def runDetect(self,filename,options = ["blue square","nothing"]):
        # Prepare the inputs
        image = self.preprocess(Image.open(filename)).unsqueeze(0).to(self.device)
        
        text = clip.tokenize(options).to(self.device)

        with torch.no_grad():
            image_features = self.model.encode_image(image)
            text_features = self.model.encode_text(text)
            
            logits_per_image, logits_per_text = self.model(image, text)
            probs = logits_per_image.softmax(dim=-1).cpu().numpy()
        
        index_max = max(range(len(probs[0])), key=probs[0].__getitem__)
        print(probs)
        print(probs[0][index_max])

        if probs[0][index_max]>0.7:
            return options[index_max]
        else:
            return "nothing"