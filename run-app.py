import os
import sys
import subprocess
import time


subprocess.check_call([sys.executable, "-m", "pip", "install", "pymongo"])
subprocess.check_call(["npm", "install"])
subprocess.check_call(["npm", "install", "react-scripts"])
subprocess.Popen([sys.executable, "flask-server/server.py"])
time.sleep(5) 
subprocess.Popen(f'osascript -e \'tell application "Terminal" to do script "cd {(os.path.join(os.getcwd(), "client"))} && npm start"\'', shell=True)

