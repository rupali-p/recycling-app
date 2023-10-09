from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

def get_recycling_result(articleNum):
  #Connect to the database,
  print("Setting up DB connection")
  uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"
  client = MongoClient(uri, server_api=ServerApi('1'))
  db = client["Hamlet-DB"]
  pics = db.PICs

  articleNum = int(articleNum)

  #Search the documents for the number being requested

    #If the number is found, get the values and return them
  if articleNum >= 1 and articleNum <= 7:
    article_val = pics.find_one({"ArticleNum" : articleNum})
    pic_name = article_val.get("Name")
    desc = article_val.get("Short Desc")
    result = article_val.get("Result")
    Applications = article_val.get("Application")
    return {
      'Pic Name' : pic_name,
      "Short Description" : desc,
      "Bin to use" : result,
      "Applications of PIC" : Applications
    }

  elif articleNum >= 8 and articleNum <= 10:
    article_val = pics.find_one({"ArticleNum" : articleNum})
    arl_name = article_val.get("Name")
    symbol = article_val.get("Symbol")
    result = article_val.get("Result")
    return {
      'ARL Name': arl_name,
      'Symbol' : symbol,
      'Result' : result
    }


  #Else, return an error message
  else:
    return "Error, requested failed due to number not existing"  