import flask
from flask import *

from flask_cors import CORS


from segmentation import imageProcessing

app = Flask(__name__)
CORS(app)

@app.route('/query')
def path():
    path = request.args.get('path')
    print(imageProcessing('./in/',path+'.png'))
    return '''<h1>The language value is: {}</h1>'''.format(path)
