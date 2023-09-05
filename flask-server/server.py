from flask import Flask

app = Flask(__name__)

# Test API Route

@app.route("/apiTests")
def members():
    return {"tests": ["test1", "test2", "test3"]}


# Runs on localhost:5000 as default
# Change the directory to 'flask-server' and run command 'py server.py' to get started
# Type localhost:5000/apiTests to see

if __name__ == "__main__":
    app.run(debug=True) 
    
