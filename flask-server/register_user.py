from enum import Enum

import bcrypt
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

USER_ADDED = "User registered."
EMAIL_EXISTS = "User with that email already exists."

def register_user(
        first_name: str,
        last_name: str,
        email: str,
        password: str
) -> str:
    """
    Adds the new user and their details to the database.

    The user's password is hashed.
    The user won't be added if the username already exists.

    :param username: The user's username
    :param first_name: The user's first name
    :param last_name: The user's last name
    :param email: The user's email
    :param password: The user's unencrypted password
    :return: The message of whether the user was added or not
    """
    hashed_password = _hash_password(password)
    user = {
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "password": hashed_password
    }

    uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"
    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))

    db = client["Hamlet-DB"]
    users = db.Users

    if users.count_documents({"email": email}, limit=1) == 0:
        users.insert_one(user)
        return USER_ADDED
    else:
        return EMAIL_EXISTS

def _hash_password(password: str) -> str:
    """Hashes the password"""
    bytes = password.encode('utf-8')

    # generating the salt
    salt = bcrypt.gensalt()

    # Hashing the password
    return bcrypt.hashpw(bytes, salt)