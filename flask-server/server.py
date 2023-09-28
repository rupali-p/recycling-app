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
    
    ##Set up the mongoDB database connection
    # uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"
    # # Create a new client and connect to the server
    # client = MongoClient(uri, server_api=ServerApi('1'))
    # # Send a ping to confirm a successful connection. This will print in the console. 
    # try:
    #     client.admin.command('ping')
    #     print("Pinged your deployment. You successfully connected to MongoDB!")
    # except Exception as e:
    #     print(e)
    
    #Then run the app
    app.run(debug=True)
