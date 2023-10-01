from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import bcrypt

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
    print("connected")

    #Get credential details
    userName = uName 
    password = get_bytes(password) 

    print("Checking credentials")
    #Get the document associated with the user's email
    document = user_col.find_one({"email" : userName})

    #Check that the password inputted matches up with the hashed password
    result = bcrypt.checkpw(password, document.get("password"))
 
    #Check if what was inputted by the user
    if userName == document.get("email") and result == True:
      print("Success")
      return LOGIN_SUCCCESS
    else:
      print("Failed")
      return  LOGIN_FAILED

def get_bytes(password: str) -> str:
  #Encodes the password so that it can be checked with what's in the DB
  bytes = password.encode('utf-8')
  return bytes 
