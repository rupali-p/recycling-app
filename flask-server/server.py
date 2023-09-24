from flask import Flask, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from register_user import register_user, USER_ADDED, EMAIL_EXISTS


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

@app.route("/members")
def members():
    return {"members": ["test1", "test2", "test3"]}

# Runs on localhost:5000 as default
# Change the directory to 'flask-server' and run command 'py server.py' to get started
# Type localhost:5000/members to see

if __name__ == "__main__":
    
    ##Set up the mongoDB database connection
    uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"
    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    # Send a ping to confirm a successful connection. This will print in the console. 
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    
    #Then run the app
    app.run(debug=True)
