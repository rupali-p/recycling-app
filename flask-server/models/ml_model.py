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


def make_prediction(
    input_image: werkzeug.datastructures.file_storage.FileStorage | io.BytesIO,
    output_img_format: str = "PNG",
) -> dict:
    """
    Makes object detections of the given image

    :param input_image: The image to make detections on
    :param output_img_format: The output file format to use e.g. PNG, JPEG
    :return: The image with the detections on it, the output file format and the detections
    """

    # Check if an image is uploaded and display it
    image = Image.open(input_image)
    # image = image.convert("RGB")
    target_size = (640, 640)
    image = image.resize(target_size)

    # Load the ONNX model
    model_path = "best.onnx"
    ort_session = onnxruntime.InferenceSession(model_path)

    # Preprocess your input image
    input_data = _preprocess_image(image)

    # Perform inference
    outputs = ort_session.run(None, {"images": input_data})
    output_info = ort_session.get_outputs()
    print(f"Number of output tensors: {len(output_info)}")

    # Print information about each output tensor
    for i, output in enumerate(output_info):
        print(f"Output {i} - Name: {output.name}, Shape: {output.shape}")

    # Access the output tensor(s) by index
    output = outputs[0]  # Access the first output tensor

    # Define a confidence threshold
    confidence_threshold = 0.25

    # Post-process the results
    detections = _postprocess_results(outputs, confidence_threshold)
    class_labels = [
        "Acral Lentiginous Melanoma",
        "Beaus Line",
        "Blue Finger",
        "Clubbing",
        "Healthy Nail",
        "Koilonychia",
        "Lindsay-s Nail",
        "Muehrckes Lines",
        "Onychogryphosis",
        "Pitting",
        "Terry-s Nail",
    ]

    print("Number of Detections:", len(detections))  # Print the number of detections
    print("Detections:", detections)  # Print the list of detections

    # Visualize the results
    result_image = _visualize_results(np.array(image), detections, class_labels)
    encoded_image = _get_encoded_img(result_image, output_img_format)

    return {
        "results_image": encoded_image,
        "image_format": output_img_format,
        "detections": detections,
    }


def _preprocess_image(
    image: Image, input_size: tuple[int, int] = (640, 640)
) -> np.ndarray:
    """
    Preprocess the image, so it can be used an input to the model.

    :param image: The image to process
    :param input_size: The input size to resize the image to
    :return: The image as an array
    """
    image = image.resize(input_size)
    image = image.convert("RGB")
    image_array = np.array(image, dtype=np.float32)  # Ensure the data type is float
    # if image_array.shape[-1] == 4:
    #     image_array = np.array(image, dtype=np.float32)
    image_array = image_array / 255.0
    image_array = image_array.transpose((2, 0, 1))
    image_array = np.expand_dims(image_array, axis=0)
    print("Image array")
    print(type(image_array))
    return image_array


def _postprocess_results(
    outputs: list, confidence_threshold: float = 0.5
) -> list[dict]:
    """
    Gets the detections from the model.

    :param outputs: The outputs from the model
    :param confidence_threshold: The threshold to determine whether it's a valid detection
    :return: The detections as a list
    """
    # The output tensor has shape [1, 25200, 16]
    output = outputs[0]
    print(f"outputs[0]: {outputs[0]}")
    # print(f"output[0]: {output[0]}")
    # print(f"outputs shape: {outputs.shape}")
    # print(f"output[1]: {output[1]}")
    # print(f"outputs[1]: {outputs[1]}")
    # print(f"outputs[2]: {outputs[2]}")
    # The output tensor has shape [1, 25200, 16]
    output = outputs[0]

    # Access the shape of the output tensor
    output_shape = output.shape

    # Access the first dimension, which contains the value 25200
    value_25200 = output_shape[1]
    print(f"The 1st value is obtained from the shape: {output_shape[0]}")
    print(f"The 1st value is obtained: {output[0]}")
    print(f"The 1st1st value is obtained: {output[0][0]}")
    print(f"The value 25200 is obtained from the shape: {value_25200}")
    print(f"The 3rd value is obtained from the shape: {output_shape[2]}")

    # The output tensor has shape [1, 25200, 16]
    output = outputs[0]
    print(output)

    # Iterate through the tensor elements
    # for i in range(output.shape[0]):
    #     for j in range(output.shape[1]):
    #         for k in range(output.shape[2]):
    #             value = output[i, j, k]
    #             print(f"Value at index ({i}, {j}, {k}): {value}")

    detections = []
    i = 0
    for detection in output[0]:
        print(f"detection{i}: {detection}")
        i = i + 1

    for detection in output[0]:
        class_label = int(detection[5])
        confidence = detection[4]

        if confidence >= confidence_threshold:
            x, y, w, h = map(int, detection[:4])
            x1, y1, x2, y2 = x, y, x + w, y + h

            detections.append(
                {
                    "class_label": class_label,
                    "confidence": confidence,
                    "bounding_box": (x1, y1, x2, y2),
                }
            )

    return detections


def _visualize_results(image_array: np.ndarray, detections, class_labels) -> np.ndarray:
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
        # class_label = class_labels[detection["class_label"]]
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
