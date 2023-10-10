"""
Contains the backend API endpoints

- Runs on localhost:5000 as default
- Change the directory to 'flask-server' and run command 'py server.py' to get started
"""
import base64
import io
from flask import Flask, request, jsonify

from models.ml_model import make_prediction
from register_user import register_user, USER_ADDED, EMAIL_EXISTS

from const import OUTPUT_IMAGE_FORMAT

app = Flask(__name__)


@app.route("/api/register-user", methods=["POST"])
def handle_register_user():
    """
    Registers the user

    :return: 201 if the user was added, 200 if the input email already exists
    """
    print("Uploading user")

    data = request.get_json()
    register_result = register_user(
        password=data["password"],
        first_name=data["firstName"],
        last_name=data["lastName"],
        email=data["email"],
    )
    res = {"result": register_result}
    print(register_result)

    if register_result == USER_ADDED:
        return res, 201
    elif register_result == EMAIL_EXISTS:
        return res, 200


# TODO: Return the classification in the response
@app.route("/api/upload", methods=["POST"])
def handle_upload():
    """
    Classifies the symbol in the uploaded image using the recycling model.

    :return: The image with its classification
    """
    with open("output.txt", "w") as f:
        print(request.data, file=f)

    decoded = base64.b64decode(request.data)
    buf = io.BytesIO(decoded)

    results = make_prediction(input_image=buf, output_img_format=OUTPUT_IMAGE_FORMAT)
    results_image = results.get("results_image")
    image_format = results.get("image_format")
    classification = results.get("classification")

    return jsonify(
        {
            "success": True,
            "file": "Received",
            "image": results_image,
            "encoding": image_format.lower(),
            # "classification": classification
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
