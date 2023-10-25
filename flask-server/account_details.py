from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

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
    return {"Name": name, "Email": email, "password": password, "postcode": postcode}

def get_name(email):
    user_account = get_connection(email)

    #Now get the account details
    #Name
    first_name = user_account.get("firstName")
    last_name = user_account.get("lastName")
    name = first_name + " " + last_name
    return {"Name": name}

def get_email(email):
    user_account = get_connection(email)
    email = user_account.get("email")
    return {"email": email}

def get_postcode(email):
    user_account = get_connection(email)
    postcode = user_account.get("postcode")
    return {"postcode": postcode}

def get_password(email):
    user_account = get_connection(email)
    password = user_account.get("password")
    return {"Password": password}


 