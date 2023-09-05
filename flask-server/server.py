import base64
import io
from flask import Flask, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from models.ml_model import make_prediction
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
# Test API Route
@app.route("/api/upload", methods=["POST"])
def handle_upload():
    print("Requesting...")
    print(request.data)
    files = request.files
    file = files.get("file")

    results = make_prediction(
       input_image=file,
       output_img_format="PNG"
    )
    results_image = results.get("results_image")
    image_format = results.get("image_format")
    detections = results.get("detections")

    print("Receiving image...")
    print(type(file))

    return jsonify({
        "success": True,
        "file": "Received",
        "image": results_image,
        "encoding": image_format.lower()
    })


@app.route("/api/upload-captured-photo", methods=["POST"])
def handle_upload_2():
    print("Requesting...")
    print(request.data)
    print("done")

    decoded = base64.b64decode(request.data)
    # files = request.files
    # file = files.get("file")
    buf = io.BytesIO(decoded)

    results = make_prediction(
       input_image=buf,
       output_img_format="PNG"
    )
    results_image = results.get("results_image")
    image_format = results.get("image_format")
    detections = results.get("detections")

    # print("Receiving image...")
    # print(type(file))

    return jsonify({
        "success": True,
        "file": "Received",
        "image": results_image,
        "encoding": image_format.lower()
    })

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
