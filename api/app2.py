import json
from flask_cors import CORS
from flask import Flask, request, jsonify, g, redirect, url_for, session, flash
from werkzeug.utils import secure_filename
import sqlite3
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
                               
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

DATABASE = 'app.db'
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


app.config["JWT_SECRET_KEY"] = "zizizozozaza12345"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
UPLOAD_FOLDER = 'uploadFile'
ALLOWED_EXTENSIONS = set(['jpeg', 'jpg', "png"])

    

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response


@app.route("/upload", methods=["GET", "POST"])
def upload():
    gender = request.json("gender")
    name = request.json("name")
    pseudo = request.json("pseudo")
    birthday = request.json("birthday")
    email = request.json("email")
    password = request.json("password")
    confpassword = request.json("confpassword")
    file = request.json("file")
    print(gender, name, pseudo, birthday, email, password, confpassword, file)
    response = jsonify()
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/")
def hello_world():
    return {"toto":"tata"}


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@app.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Jamel",
        "about" :"Toto"
    }
    return response_body


if __name__ == '__main__':
    app.run(debug=True)