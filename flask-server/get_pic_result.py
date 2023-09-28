from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

def get_pic_result():
  #Connect to the database,
  print("Setting up DB connection")
  uri = "mongodb+srv://SISTeam22:Torecycleornot7214@hamlet-db.kdfozrj.mongodb.net/?retryWrites=true&w=majority"
  client = MongoClient(uri, server_api=ServerApi('1'))
  db = client["Hamlet-DB"]
  pics = db.PICs
  #Get the result using the integer value
  #Based on that, get the required results and send it
  print("Looking for PICs")
  try:
    pic_doc = pics.find_one({"Name" : "Polyethylene Terephthalate (PET)"})

    #Create an object/dictionary or json that cnange be stored and sent to the front-end
    pic_name = pic_doc.get("Name")
    desc = pic_doc.get("Short Desc")
    result = pic_doc.get("Result")
    Applications = pic_doc.get("Applications")
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
  except Exception:
    return "Error"