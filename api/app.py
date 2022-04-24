import json
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify, g, Flask, abort, url_for, flash, send_from_directory
from werkzeug.utils import secure_filename 
from werkzeug.datastructures import FileStorage
import sqlite3
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import os
import hashlib
from uuid import UUID, uuid4



app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
UPLOAD_FOLDER = 'uploadFile'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
SECRET_KEY = 'ziyadG1990@'.encode('utf8')


DATABASE = '../app.db'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = SECRET_KEY

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def make_unique(string):
    ident = uuid4()
    my_tuple = string.partition(".")
    return f"{ident}" + f"{my_tuple[-2]}" + f"{my_tuple[-1]}"

# Setup the Flask-JWT-Extended extension
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'query_string']
app.config['JWT_SECRET_KEY'] = os.getenv("zodikaG1990###")
app.config['JWT_BLACKLIST_ENABLED'] = True
jwt = JWTManager(app)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route("/upload" , methods=["POST","GET"])
@cross_origin()
def inscription():
    db=get_db()
    myList = []
    cursor = db.execute("""SELECT email FROM user""")
    for element in cursor.fetchall():
        for elem in element:
            myList.append(elem)
    email = request.json.get("email")
    check = email in myList
    gender = request.json.get("gender")
    name = request.json.get("name")
    pseudo = request.json.get("pseudo")
    birthday = request.json.get("birthday")
    email = request.json.get("email")
    password = request.json.get("password")
    image = request.json.get('image')
    type = request.json.get('type')
    format = FileStorage(stream=None, 
                        filename=image, 
                        name=None, 
                        content_type=type,
                        content_length=None, 
                        headers=None)
    
    nfiles = make_unique(format.filename) 
    if (nfiles != ""
        and gender != ""
        and allowed_file(nfiles)
        and name != ""
        and pseudo != ""
        and birthday != ""
        and email != ""
        and check is False
        and password != ""):
        filename = secure_filename(nfiles)
        format.save(os.path.join(UPLOAD_FOLDER, filename))
        db=get_db()
        db.execute("PRAGMA foreign_keys=OFF")
        db.execute("""INSERT INTO user (email, password, profilePic,
                    gender, name, surname, birthdayDate) VALUES 
                    (?, ?, ?, ?, ?, ?, ?)""", 
                    [email, password, nfiles,
                        gender, name, pseudo, birthday])
        db.execute("PRAGMA foreign_keys=ON")
        db.commit()
        return {'status': 'Votre compte est créé', 'message': 'post added'}, 201
    else : 
        return {'status': 'il y a des erreurs', 'message': 'post error'}, 400

@app.route("/connexion", methods=["POST","GET"])
@cross_origin()
def connexion():
    mail = request.json.get('email')
    password = request.json.get('password')
    db = get_db()
    user = db.execute("""SELECT password, 
                      name FROM user WHERE 
                      email = ?""", [mail])
    alldb = user.fetchall()
    
    if password == alldb[0][0]:
        db.execute("""UPDATE user SET status = 'enligne' 
                   WHERE email = ?""", [mail])
        db.commit()
        return jsonify("accordé", alldb[0][1])
    else:
        db.execute("""UPDATE user SET status = 'horsligne' 
                   WHERE email = ?""", [mail])
        db.commit()
        return jsonify("rejeté", alldb[0][1])
   
@app.route("/mdpperdu", methods=["PUT", "GET"])
@cross_origin()
def mdpperdu():
    db = get_db()
    mail = request.json.get("confmail")
    birthday = request.json.get("confbirthday")
    password = request.json.get("confpasword")
    confpassword = request.json.get("confconfpassword")
    data = db.execute("""SELECT email, 
                      birthdayDate FROM user
                      WHERE email= ? and birthdayDate= ?""",
                      [mail, birthday])
    
    myData = data.fetchall()
    myList = []
    for element in myData:
        myList.append(element)
    if (password == confpassword 
        and myList[0] == mail 
        and myList[1] == birthday):
        db.execute("PRAGMA foreign_keys=OFF")
        db.execute("""UPDATE user SET password= ? 
                   WHERE email= ?""",[password, mail])
        db.execute("PRAGMA foreign_keys=ON")
        db.commit()
        return {'status': 'Votre password est modifié', 'message': 'post added'}, 201
    else: 
        return {'status': 'il y a des erreurs', 'message': 'post error'}, 400  
        
    
   
if __name__ == "__main__":
    app.run()