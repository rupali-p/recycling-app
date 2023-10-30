from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json

def get_connection(email):
    print("Setting up DB connection")
    uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"

    client = MongoClient(uri, server_api=ServerApi("1"))
    db = client["Hamlet-DB"]
    user_col = db.Users
    user_account = user_col.find_one({"email" : email})
    return user_account

def get_all_account_details(email):
    # Connect to the database,
    user_account = get_connection(email)
    if(user_account != "NoneType"):
      #Now get the account details
      #Name
      first_name = user_account.get("firstName")
      last_name = user_account.get("lastName")
      name = first_name + " " + last_name
      #Email
      email = user_account.get("email")
      #Password
      password = user_account.get("password")
      #Postcode
      postcode = user_account.get("postcode")
      scan_count = user_account.get("scan count")

      details = {"Name": name, "Email": email, "password": password, "postcode": postcode, "scan_count": scan_count}
      #decode the data into a json format
      print("Details collected")
      json_data = decodeValues(details)
      print(type(json_data))
    else:
        json_data = "Error, this user doesn't exists"
    return json_data

def get_account_name_details(email):
    # Connect to the database,
    user_account = get_connection(email)
    if(user_account != "NoneType"):
      #Now get the account details
      #Name
      first_name = user_account.get("firstName")
      last_name = user_account.get("lastName")
      name = first_name + " " + last_name
      details = {"Name": name}
      #decode the data into a json format
      json_data = decodeValues(details)
    else:
        json_data = "Error, this user doesn't exists"
    return json_data

def get_account_password_details(email):
    # Connect to the database,
    user_account = get_connection(email)
    if(user_account != "NoneType"):
      #Now get the account details
      #Password
      password = user_account.get("password")
      details = {"Password": password}
      #decode the data into a json format
      json_data = decodeValues(details)
    else:
        json_data = "Error, this user doesn't exists"
    return json_data

def get_account_postcode_details(email):
    # Connect to the database,
    user_account = get_connection(email)
    if(user_account != "NoneType"):
      #Now get the account details
      #Postcode
      postcode = user_account.get("postcode")
      details = {"Postcode": postcode}
      #decode the data into a json format
      json_data = decodeValues(details)
    else:
        json_data = "Error, this user doesn't exists"
    return json_data

def get_account_scancount_details(email):
    # Connect to the database,
    user_account = get_connection(email)
    if(user_account != "NoneType"):
      #Now get the account details
      #Postcode
      scanCount = user_account.get("scan count")
      details = {"Scan Count": scanCount}
      #decode the data into a json format
      json_data = decodeValues(details)
    else:
        json_data = "Error, this user doesn't exists"
    return json_data

def decodeValues(details):
    for key, value in details.items():
        if isinstance(value, bytes):
            details[key] = value.decode('utf-8')  # Decode bytes to UTF-8
    # Now you can serialize the entire data structure to JSON
    json_data = json.dumps(details)
    return json_data
 