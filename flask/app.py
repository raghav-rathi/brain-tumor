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
    if request.method == 'GET':
        return jsonify(isError= False,message= path,statusCode= 200,data= data), 200
    abort(404)