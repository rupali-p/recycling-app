from flask import Flask, request
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from get_pic_result import get_pic_result

app = Flask(__name__)


@app.route("/members")
def members():
    return {"members": ["test1", "test2", "test3"]}

@app.route("/api/view-PIC")
def view_PIC():
    result = get_pic_result("1")
    if(result != 'Error'):
        return result, 200
    else:
        return result, 500

# Runs on localhost:5000 as default
# Change the directory to 'flask-server' and run command 'py server.py' to get started
# Type localhost:5000/members to see

if __name__ == "__main__":
    
    app.run(debug=True)
