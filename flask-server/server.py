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
from get_scan_results import get_recycling_result, get_recycling_results
from login import login_user, LOGIN_FAILED, LOGIN_SUCCCESS
from account_details import get_all_account_details, get_account_name_details, get_account_password_details, get_account_postcode_details
import json
import numpy as np

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

def np_encoder(object):
    if isinstance(object, np.generic):
        return object.item()

# TODO: Return the classification in the response
@app.route("/api/upload", methods=["POST"])
def handle_upload():
    """
    Classifies the symbol in the uploaded image using the recycling model.

    :return: The image with its classification
    """
    data = request.get_json()
    image_data = data["image_data"]

    with open("output.txt", "w") as f:
        print(image_data, file=f)

    decoded = base64.b64decode(image_data)
    buf = io.BytesIO(decoded)

    results, model_used = make_prediction(input_image=buf, output_img_format=OUTPUT_IMAGE_FORMAT)
    results_image = results.get("results_image")
    image_format = results.get("image_format")
    detections = results.get("detections")

    return jsonify(
        {
            "success": True,
            "file": "Received",
            "image": results_image,
            "encoding": image_format.lower(),
            "detections": json.dumps(detections, default=np_encoder),
            "model_used": model_used
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


@app.route("/api/get-accountdetails/<email>")
def get_account_email(email):
    account_details = get_all_account_details(email)
    return account_details, 200

@app.route("/api/get-accountdetails-name/<email>")
def get_account_name(email):
    account_name = get_account_name_details(email)
    return account_name, 200

@app.route("/api/get-accountdetails-postcode/<email>")
def get_account_postcode(email):
    account_postcode = get_account_postcode_details(email)
    return account_postcode

@app.route("/api/get-accountdetails-password/<email>")
def get_account_password(email):
    account_password = get_account_password_details(email)
    return account_password


@app.route("/members")
def members():
    return {"members": ["test1", "test2", "test3"]}

@app.route("/api/view-result/<articleNum>")
def view_result(articleNum):
    result = get_recycling_result(articleNum) #This number should be changed to an input passed from the machine when need be
    if(result != 'Error'):
        return result, 200
    else:
        return result, 500

@app.route("/api/view-results", methods=["POST"])
def view_results():
    data = request.get_json()
    article_numbers = data["article_numbers"]
    print(article_numbers)
    arl_results = get_recycling_results(article_numbers)
    print(arl_results)
    return jsonify(
        {
            "success": True,
            "arl_results": json.dumps(arl_results)
        }
    )




# Runs on localhost:5000 as default
# Change the directory to 'flask-server' and run command 'py server.py' to get started
# Type localhost:5000/members to see

if __name__ == "__main__":

    app.run(debug=True)
