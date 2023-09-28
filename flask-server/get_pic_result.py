from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

def get_pic_result(picNum):
  #Connect to the database,
  print("Setting up DB connection")
  uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"
  client = MongoClient(uri, server_api=ServerApi('1'))
  db = client["Hamlet-DB"]
  pics = db.PICs

  picNum = int(picNum)

  #Search the documents for the number being requested
  pic_doc = pics.find_one({"PIC Number" : picNum})

    #If the number is found, get the values and return them
  if pic_doc != "None":
    pic_name = pic_doc.get("Name")
    desc = pic_doc.get("Short Desc")
    result = pic_doc.get("Result")
    Applications = pic_doc.get("Application")
    return {
      'Pic Name' : pic_name,
      "Short Description" : desc,
      "Bin to use" : result,
      "Applications of PIC" : Applications
    }

  #Else, return an error message
  else:
    return "Error, requested failed due to number not existing"  