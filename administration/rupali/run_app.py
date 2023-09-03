import sys
import subprocess

# Check if Streamlit is installed
try:
    import streamlit
    print("Streamlit is already installed.")
except ImportError:
    # Streamlit is not installed, so install it using pip
    print("Installing Streamlit...")
    subprocess.check_call([sys.executable, "-m", "pip3", "install", "streamlit"])


# verify version
subprocess.check_call([sys.executable, "-m", "streamlit", "version"])
subprocess.check_call([sys.executable, "-m", "pip", "install", "opencv-python"])
subprocess.check_call([sys.executable, "-m", "pip", "install", "pyyaml"])
subprocess.check_call([sys.executable, "-m", "pip", "install", "onnxruntime"])
subprocess.check_call([sys.executable, "-m", "pip", "install", "opencv-python"])
# pip install opencv-python 
# subprocess.check_call([sys.executable, "-m", "pip", "install", "PIL"])
# subprocess.check_call([sys.executable, "-m", "pip", "install", "numpy"])

# Run the Streamlit app
print("Running Streamlit app...")
subprocess.check_call([sys.executable, "-m", "streamlit", "run", "administration/rupali/app.py"])
