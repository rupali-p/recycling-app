"""
Contains the backend API endpoints

- Runs on localhost:5000 as default
- Change the directory to 'flask-server' and run command 'py server.py' to get started
"""
import base64
import io
from flask import Flask, request, jsonify

from models.ml_model import make_prediction
from register_user import register_user, USER_ADDED, EMAIL_EXISTS
from get_pic_result import get_pic_result
from login import login_user, LOGIN_FAILED, LOGIN_SUCCCESS
import json

from const import OUTPUT_IMAGE_FORMAT

app = Flask(__name__)


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

@app.route("/Login", methods=["POST"])
def handle_login():
    #Get the data from the api
    data = request.get_json()
    #Call the function to log the user in
    print("In backend")
    login_result = login_user(uName = data["Usernane"],
    password = data["password"])
    result = {"result": login_result}

    #Send the appropriate message
    if login_result == LOGIN_SUCCCESS:
        print("Logged in, sending results")
        return result, 200
    elif login_result == LOGIN_FAILED:
        return result, 401





@app.route("/members")
def members():
    return {"members": ["test1", "test2", "test3"]}

@app.route("/api/view-PIC")
def view_PIC():
    print("Retrieving PIC result")
    #Call the function here
    result = get_pic_result("1")
    if(result != 'Error'):
        return result, 200
    return result, 500

# Runs on localhost:5000 as default
# Change the directory to 'flask-server' and run command 'py server.py' to get started
# Type localhost:5000/members to see

if __name__ == "__main__":
    app.run(debug=True)
