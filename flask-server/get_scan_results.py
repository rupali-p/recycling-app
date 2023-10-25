from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


def get_recycling_result(articleNum):
    # Connect to the database,
    print("Setting up DB connection")
    uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(uri, server_api=ServerApi("1"))
    db = client["Hamlet-DB"]
    pics = db.PICs

    print("Article number")
    print(articleNum)

    articleNum = int(articleNum)

    # Search the documents for the number being requested

    # If the number is found, get the values and return them
    if articleNum >= 1 and articleNum <= 7:
        article_val = pics.find_one({"ArticleNum": articleNum})
        pic_name = article_val.get("Name")
        desc = article_val.get("Short Desc")
        result = article_val.get("Result")
        Applications = article_val.get("Application")
        return {
            "Pic Name": pic_name,
            "Short Description": desc,
            "Bin to use": result,
            "Applications of PIC": Applications,
        }

    elif articleNum >= 8 and articleNum <= 11:
        article_val = pics.find_one({"ArticleNum": articleNum})
        arl_name = article_val.get("Name")
        symbol = article_val.get("Symbol")
        result = article_val.get("Result")
        return {"ARL Name": arl_name, "Symbol": symbol, "Result": result}

    # Else, return an error message
    else:
        return "Error, requested failed due to number not existing"


def get_recycling_results(article_numbers: list) -> list[dict]:
    """
    Gets the symbol records of the specified articles.

    The object ids of the articles are excluded.

    :param article_numbers: The article numbers of the records to retrieve
    :return: List of the symbol articles excluding their object ids.
    """

    # Connect to the database,
    print("Setting up DB connection")
    uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"
    client = MongoClient(uri, server_api=ServerApi("1"))
    db = client["Hamlet-DB"]
    pics = db.PICs

    article_nums = [int(num) for num in article_numbers]
    pics_results = pics.find({"ArticleNum": {"$in": article_nums}})
    results = [_remove_object_id(pic) for pic in pics_results]

    return results

def _remove_object_id(article: dict) -> dict:
    """
    Removes the object id from the article.
    """

    return {key: article[key] for key in article if key != "_id"}
