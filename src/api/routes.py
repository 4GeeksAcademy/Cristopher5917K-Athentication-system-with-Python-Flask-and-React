"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException, send_mail
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
from base64 import b64encode
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import cloudinary.uploader as uploader 
from datetime import timedelta
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route("/register",methods=["POST"])
def add_new_user():
    try:
        body_forms=request.json


        name=body_forms.get("name", None)
        email=body_forms.get("email", None)
        password=body_forms.get("password", None)
        avatar=body_forms.get("avatar", None)

   

        if name is None or email is None or password is None:
            return jsonify("Credenciales incompletas"),400
        
        else:
            user=User()
            user_exist= user.query.filter_by(email=email).one_or_none()

            print(user_exist)

            if user_exist is not None:
                return jsonify ("Usuario existente"),400
            else:
                if avatar is not None:
                    avatar=uploader.upload(avatar)
                    avatar=avatar["secure_url"]
                
                salt=b64encode(os.urandom(32)).decode("utf-8")
                password=generate_password_hash(f'{password}{salt}')

                user.name=name
                user.email=email
                user.password=password
                user.salt=salt
                user.avatar=avatar


                db.session.add(user)
                try:
                    db.session.commit()
                    return jsonify("Usuario creado"),200
                except Exception as err:
                    return jsonify(f'Error {err.args}'),500
    except Exception as err:
        return jsonify(f'Error{err.args}')
    
@api.route("/login", methods=["POST"])
def login():
    try:
        body=request.json
        email=body.get("email", None)
        password=body.get("password", None)

        if email is None or password is None:
            return jsonify({"warning":"Credenciales incompletas"}),400
        else:
            user=User.query.filter_by(email=email).one_or_none()

            if user is None:
                return jsonify({"warning":"Credenciales invalidas"}),400
            else:
                if check_password_hash(user.password, f"{password}{user.salt}"):
                    token = create_access_token(identity=str(user.id))
                    return jsonify(token = token, user = user.serialize())
                else:
                    return jsonify({"warning":"Credenciales invalidas"}),400
                

    except Exception as err:
        print(err.args)
        return jsonify(err.args),500


@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    try:
        user_id = get_jwt_identity()
        print(user_id)
        user=User.query.get(user_id)

        if user is None:
            return jsonify({"warning":"Usuario no encontrado"}),404
        
        return jsonify(user.serialize()),200
                

    except Exception as err:
        print(err.args)
        return jsonify(err.args),500