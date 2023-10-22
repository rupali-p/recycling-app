"""
Contains interactions with the ml_model
"""
import onnxruntime
import werkzeug.datastructures
from PIL import Image
import numpy as np
import cv2
import io
import base64

from const import CONFIDENCE_THRESHOLD, CLASS_LABELS, TARGET_IMAGE_SIZE, OUTPUT_IMAGE_FORMAT


def make_prediction(
    input_image: werkzeug.datastructures.file_storage.FileStorage | io.BytesIO,
    output_img_format: str = OUTPUT_IMAGE_FORMAT,
) -> dict:
    """
    Makes object detections of the given image

    :param input_image: The image to make detections on
    :param output_img_format: The output file format to use e.g. PNG, JPEG
    :return: The image with its classification on it, the output file format and the classification
    """

    image = _load_image_object(input_image)
    input_data = _convert_to_image_array(image)

    outputs = _perform_inference(input_data, model_path="best.onnx")
    detections = _get_output_detections(outputs, CONFIDENCE_THRESHOLD)

    print("Number of Detections:", len(detections))
    print("Detections:", detections)

    # highest_detection = (
    #     [_get_highest_detection(detections)] if len(detections) > 0 else []
    # )
    highest_detections = _get_highest_detections(detections)

    result_image = _visualise_results(np.array(image), highest_detections, CLASS_LABELS)
    encoded_image = _get_encoded_img(result_image, output_img_format)

    return {
        "results_image": encoded_image,
        "image_format": output_img_format,
        "detections": highest_detections
    }

def _load_image_object(
        input_image: werkzeug.datastructures.file_storage.FileStorage | io.BytesIO
) -> Image:
    """
    Loads the input image as an Image object with the target size and dimensions.

    :param input_image: The input image to load
    :return: The image object with the target size and dimensions
    """
    image = Image.open(input_image)
    image = image.resize(TARGET_IMAGE_SIZE)
    image = image.convert("RGB")

    return image

def _perform_inference(
    input_data: np.ndarray,
    model_path: str
) -> list:
    """
    Performs inference on the given input data using the onnx model.

    :param input_data: The input data to use the model on.
    :param model_path: The path to the onnx model to load.
    :return: The outputs from the model's inference.
    """

    ort_session = onnxruntime.InferenceSession(model_path)

    outputs = ort_session.run(None, {"images": input_data})
    output_info = ort_session.get_outputs()

    print(f"Number of output tensors: {len(output_info)}")

    for i, output in enumerate(output_info):
        print(f"Output {i} - Name: {output.name}, Shape: {output.shape}")

    return outputs


def _convert_to_image_array(
    image: Image,
) -> np.ndarray:
    """
    Convert the image to an array, so it can be used an input to the model.

    :param image: The image to process
    :return: The image as an array
    """
    # Ensure the data type is float
    image_array = np.array(image, dtype=np.float32)

    # Normalise array
    image_array = image_array / 255.0

    # Ensure image array has input form of (1, target_size, dimensions) e.g. (1, 640, 640, 3)
    image_array = image_array.transpose((2, 0, 1))
    image_array = np.expand_dims(image_array, axis=0)

    return image_array


def _get_output_detections(
    outputs: list, confidence_threshold: float = 0.5
) -> list[dict]:
    """
    Gets the detections from the model's output.

    :param outputs: The outputs from the model
    :param confidence_threshold: The threshold to determine whether it's a valid detection
    :return: The detections as a list
    """

    output_tensor = outputs[0]

    # The output tensor has shape (1, 11, 8400)
    print(f"output tensor shape {output_tensor.shape}")
    print(f"outputs[0]: {output_tensor}")

    detections = output_tensor[0]
    detections = detections.transpose()

    threshold_detections = []

    for detection in detections:
        class_predictions = detection[4:]
        class_label = class_predictions.argmax()
        confidence = class_predictions.max()

        if confidence >= confidence_threshold:
            x, y, w, h = detection[:4]
            x1, y1 = int(x - w / 2), int(y - h / 2)
            x2, y2 = int(x + w / 2), int(y + h / 2)

            threshold_detections.append(
                {
                    "class_label": class_label,
                    "confidence": confidence,
                    "bounding_box": (x1, y1, x2, y2),
                }
            )

    return threshold_detections

def _get_highest_detections(detections: list[dict]) -> list:
    class_detections = [None]*len(CLASS_LABELS)

    for detection in detections:
        class_number = detection["class_label"]
        highest_detection = class_detections[class_number]
        if highest_detection is None or detection["confidence"] > highest_detection["confidence"]:
            class_detections[class_number] = detection

    highest_detections = [detection for detection in class_detections if detection is not None]
    for detection in highest_detections:
        detection["class_label"] = CLASS_LABELS[detection["class_label"]]

    return highest_detections

def _get_highest_detection(detections: list[dict]) -> dict:
    """
    Gets the detection with the highest confidence score.

    :param detections: The list of detections to examine.
    :return: The detection with the highest confidence score.
    """

    confidences = np.array([detection["confidence"] for detection in detections])
    i = np.argmax(confidences)
    highest_detection = detections[i]

    print(f"Highest detection {highest_detection}")

    return highest_detection


def _visualise_results(image_array: np.ndarray, detections, class_labels) -> np.ndarray:
    """
    Create an output image that shows the identified objects on it.

    :param image_array: The image that was used as the model input
    :param detections: The detections from the model
    :param class_labels: The class labels that correspond to the detections
    :return: A new image with the detections labelled with the corresponding classes
    """

    result_image = image_array.copy()
    for detection in detections:
        x1, y1, x2, y2 = detection["bounding_box"]
        class_label = detection["class_label"]
        confidence = detection["confidence"]

        color = (0, 255, 0)
        thickness = 2
        cv2.rectangle(result_image, (x1, y1), (x2, y2), color, thickness)

        label = f"{class_label} ({confidence:.2f})"
        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale = 0.5
        font_thickness = 1

        text_size, _ = cv2.getTextSize(label, font, font_scale, font_thickness)
        text_x = x1
        text_y = y1 - 5 if y1 >= 5 else y1 + 15

        cv2.putText(
            result_image,
            label,
            (text_x, text_y),
            font,
            font_scale,
            color,
            font_thickness,
        )
    return result_image


def _get_encoded_img(image_array, encoding_format: str) -> str:
    """
    Gets the image array as a base64 string

    :param image_array: The image as an array
    :param encoding_format: The file extension e.g. PNG, JPEG
    :return: The image as a base64 string
    """

    image = Image.fromarray(image_array)
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format=encoding_format)
    encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode("ascii")

    return encoded_img
