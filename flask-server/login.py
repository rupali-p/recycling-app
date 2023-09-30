from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

#Constants to declare user success
LOGIN_SUCCCESS = "Login successful"
LOGIN_FAILED = "Incorrect details, please try again"


def login_user(uName: str, password: str) -> str:
    #Create a connection to the mongoDB server
    uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(uri, server_api=ServerApi('1'))
    #Connect up to the user's collection. 
    db = client["Hamlet-DB"]
    user_col = db.Users
  
    #Get credential details
    userName = uName #testUser
    password = password #secret

    #Check credentials
    print("Checking credentials")
    document = user_col.find_one({"username" : userName})
    if userName == document.get("username") and password == document.get("password"):
      return LOGIN_SUCCCESS
    else:
      return  LOGIN_FAILED