from flask import Flask, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from register_user import register_user, USER_ADDED, EMAIL_EXISTS
from login import login_user, LOGIN_FAILED, LOGIN_SUCCCESS
import json

app = Flask(__name__)

@app.route("/api/register-user", methods=["POST"])
def handle_register_user():
    print("Uploading user")
    data = request.get_json()
    print(data)
    register_result = register_user(
        password=data["password"],
        first_name=data["firstName"],
        last_name=data["lastName"],
        email=data["email"]
    )
    print(data)
    print(type(data))
    res = {"result": register_result}
    print(register_result)

    if register_result == USER_ADDED:
        return res, 201
    elif register_result == EMAIL_EXISTS:
        return res, 200

@app.route("/Login", methods=["GET"])
def handle_login():
    #Get the data from the api
    data = request.get_json()
    #Call the function to log the user in
    login_result = login_user(uName = data["username"],
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

# Runs on localhost:5000 as default
# Change the directory to 'flask-server' and run command 'py server.py' to get started
# Type localhost:5000/members to see

if __name__ == "__main__":
    
    
    #Then run the app
    app.run(debug=True)
