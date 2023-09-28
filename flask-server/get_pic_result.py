from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

def get_pic_result(picNum):
  #Connect to the database,
  print("Setting up DB connection")
  uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"
  client = MongoClient(uri, server_api=ServerApi('1'))
  db = client["Hamlet-DB"]
  pics = db.PICs

  print("Looking for PICs")
  pic_doc = pics.find_one({"PIC Number" : picNum})

  if pic_doc != "None":
    pic_name = pic_doc.get("Name")
    desc = pic_doc.get("Short Desc")
    result = pic_doc.get("Result")
    Applications = pic_doc.get("Application")
    print("Returning result")
    print(pic_name)
    print(desc)
    print(result)
    print(Applications)
    return {
      'Pic Name' : pic_name,
      "Short Description" : desc,
      "Bin to use" : result,
      "Applications of PIC" : Applications
    }
  else:
    return "Error, requested failed. Check your IP Address, collection name and types"