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
      details = {"Name": name, "Email": email, "password": password, "postcode": postcode, "scan count": scan_count}
      #decode the data into a json format
      json_data = decodeValues(details)
    else:
        json_data = "Error, this user doesn't exists"
    return json_data

def get_account_name(email):
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


# def get_account_name(email):
#     user_account = get_connection(email)
#     #Now get the account details
#     #Name
#     first_name = user_account.get("firstName")
#     print(first_name)
#     # last_name = user_account.get("lastName")
#     # name = first_name + " " + last_name
#     account_name =  {"Name": first_name}
#     json_account_name = decodeValues(account_name)
#     return json_account_name

# def get_account_email(email):
#     user_account = get_connection(email)
#     email = user_account.get("email")
#     account_email =  {"email": email}
#     json_email_name = decodeValues(account_email)
#     return json_email_name

# def get_account_postcode(email):
#     user_account = get_connection(email)
#     postcode = user_account.get("postcode")
#     account_postcode = {"postcode": postcode}
#     json_postcode = decodeValues(account_postcode)
#     return json_postcode

# def get_account_password(email):
#     user_account = get_connection(email)
#     password = user_account.get("password")
#     account_password = {"Password": password}
#     json_password = decodeValues(account_password)
#     return json_password

def decodeValues(details):
    for key, value in details.items():
        if isinstance(value, bytes):
            details[key] = value.decode('utf-8')  # Decode bytes to UTF-8
    # Now you can serialize the entire data structure to JSON
    json_data = json.dumps(details)
    return json_data
 