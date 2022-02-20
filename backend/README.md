MAKE SURE TO GET PRIVATE KEY FROM STEVE

python3 -m venv env

source ./env/bin/activate

pip install -r flask_requirements.txt

export FLASK_APP=api

flask run


To install CLIP ML:
pip install torchvision ftfy regex tqdm
pip install git+https://github.com/openai/CLIP.git