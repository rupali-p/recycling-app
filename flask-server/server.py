"""
Contains the backend API endpoints

- Runs on localhost:5000 as default
- Change the directory to 'flask-server' and run command 'py server.py' to get started
"""
import base64
import io
from flask import Flask, request, jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from models.ml_model import make_prediction
from register_user import register_user, USER_ADDED, EMAIL_EXISTS
from login import login_user, LOGIN_FAILED, LOGIN_SUCCCESS
import json

from const import OUTPUT_IMAGE_FORMAT

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Supposed to change this but leaving it in
jwt = JWTManager(app)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@app.route("/api/register-user", methods=["POST"])
def handle_register_user():
    """
    Registers the user

    :return: 201 if the user was added, 200 if the input email already exists
    """
    print("Uploading user")

    data = request.get_json()
    register_result = register_user(
        password=data["password"],
        first_name=data["firstName"],
        last_name=data["lastName"],
        email=data["email"],
    )
    res = {"result": register_result}
    print(register_result)

    if register_result == USER_ADDED:
        return res, 201
    elif register_result == EMAIL_EXISTS:
        return res, 200


# TODO: Return the classification in the response
@app.route("/api/upload", methods=["POST"])
def handle_upload():
    """
    Classifies the symbol in the uploaded image using the recycling model.

    :return: The image with its classification
    """
    with open("output.txt", "w") as f:
        print(request.data, file=f)

    decoded = base64.b64decode(request.data)
    buf = io.BytesIO(decoded)

    results = make_prediction(input_image=buf, output_img_format=OUTPUT_IMAGE_FORMAT)
    results_image = results.get("results_image")
    image_format = results.get("image_format")
    classification = results.get("classification")

    return jsonify(
        {
            "success": True,
            "file": "Received",
            "image": results_image,
            "encoding": image_format.lower(),
            # "classification": classification
        }
    )

# @app.route("/Login", methods=["POST"])
# def handle_login():
#     #Get the data from the api
#     data = request.get_json()

#     #Call the function to log the user in
#     print("In backend")
#     login_result = login_user(uName = data["Usernane"],
#     password = data["password"])
#     result = {"result": login_result}

#     #Send the appropriate message
#     if login_result == LOGIN_SUCCCESS:
#         print("Logged in, sending results")
#         return result, 200
#     elif login_result == LOGIN_FAILED:
#         return result, 401


@app.route("/login", methods=["POST"])
def handle_login():
    # Get the data from the API
    data = request.get_json()

    # Call the function to log the user in
    login_result = login_user(username=data["Usernane"], password=data["password"])

    # Send the appropriate message
    if login_result == LOGIN_SUCCCESS:
        # Create an access token
        access_token = create_access_token(identity=data["Username"])

        # Return the token along with the result
        result = {"result": login_result, "access_token": access_token}
        return jsonify(result), 200
    elif login_result == LOGIN_FAILED:
        result = {"result": login_result}
        return jsonify(result), 401

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route("/members")
def members():
    return {"members": ["test1", "test2", "test3"]}

# Runs on localhost:5000 as default
# Change the directory to 'flask-server' and run command 'py server.py' to get started
# Type localhost:5000/members to see

if __name__ == "__main__":
    app.run(debug=True)
