# recycling-app

## Introduction

The recycling-app is a application (platform TBD) that allows a user to upload or scan a recycling code on an item and recieve instructions on how to best recycle it. The goal of this is to encourage people to correctly recycle their rubbish.

This project was done as a project for the Software Innovation Studio

### Git commit policy.

Branch names will be named as follows

- sprint-number/tribe name

  For example: 1/back-end, 1/ml

- When a feature from a tribe is complete, members should tag another member of their tribe to review and approve the changes before it is merged.
- A pull request name should match the name of the ticket on trello.
- When a sprint has been completed and all tribes branches for that sprint have been stablised (free of bugs or crashes), a member of that tribe will need to submit a PR for the branch changes to be merged with the 'dev' branch
- Once the dev branch has been stablished with all requests, that branch should be merged with the main branch.

### Run Instructions

To run the app (both backend and frontend), run the command in the root directory:

### `py run-app.py` OR `python3 run-app.py`

#### If you would like to run only the backend or frontend respectively, follow the prompts below

To run the backend on port 5000, cd into flask-server and run the command:

### `py server.py`

To run the front-end on port 3000, cd into client and run the command:

### `npm start`

### Tech Stacks

#### Frontend (React):

- **React**: Utilizing React to build the user interface of the web application.

- **React Router**: Implementing React Router for managing navigation and routing within the React application.

#### Backend (Flask):

- **Flask**: A micro web framework for Python; forming the backend of the web app. It sets up routes and controllers to handle HTTP requests, serving as the API for the frontend.

- **MongoDB**: A NoSQL database; managing data storage. Interaction with MongoDB occurs through the PyMongo library from the Flask app (which is required to be installed, and is done when running run-app.py).

- **YOLOv8**: For real-time object detection, YOLOv8 is integrated into the backend (via ONNX). This involves loading the YOLOv8 model, processing images or videos, and sending object detection results to the frontend.

- **ONNX**: ONNX proves valuable for representing and working with deep learning models like YOLOv8 in the Flask app.
