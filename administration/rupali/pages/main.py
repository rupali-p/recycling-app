
import streamlit as st
import onnxruntime
from PIL import Image
import numpy as np
import cv2
# Main Streamlit app
def main():
   # Add the top navigation bar
    st.markdown('<div class="topnav flex justify-start"><a href="app">About Us</a><span style="color:#1D7874;">|</span><a href="checks">Check Your Nails</a></div>', unsafe_allow_html=True)
    # Add the empty colored div
    st.markdown('<div class="empty-div"></div>', unsafe_allow_html=True)
    # Set the title of the app
    st.markdown('<h2 class="accent-font px-20-50">Check Your Nails</h2>', unsafe_allow_html=True)

    def preprocess_image(image, input_size=(640, 640)):
        image = image.resize(input_size)
        image_array = np.array(image, dtype=np.float32)  # Ensure the data type is float
        image_array = image_array / 255.0
        image_array = image_array.transpose((2, 0, 1))
        image_array = np.expand_dims(image_array, axis=0)
        return image_array

    def postprocess_results(outputs, confidence_threshold=0.5):
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

        # detections = []
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

                detections.append({
                    "class_label": class_label,
                    "confidence": confidence,
                    "bounding_box": (x1, y1, x2, y2)
                })

        return detections

    def visualize_results(image, detections, class_labels):
        result_image = image.copy()
        for detection in detections:
            x1, y1, x2, y2 = detection["bounding_box"]
            class_label = class_labels[detection["class_label"]]
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
            cv2.putText(result_image, label, (text_x, text_y), font, font_scale, color, font_thickness)
        return result_image

    # Create a custom file upload button
    uploaded_image = st.file_uploader("Upload an Image", type=["jpg", "jpeg", "png"])

    # Check if an image is uploaded and display it
    if uploaded_image is not None:
        image = Image.open(uploaded_image)
        target_size = (640, 640)
        image = image.resize(target_size)

        st.image(image, caption="Uploaded Image", use_column_width=True)

        # Load the ONNX model
        model_path = "./administration/rupali/models/nail_yolo/best.onnx"  # Change to your model path
        ort_session = onnxruntime.InferenceSession(model_path)

        # Preprocess your input image
        input_data = preprocess_image(image)

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
        detections = postprocess_results(outputs, confidence_threshold)
        class_labels = [
            'Acral Lentiginous Melanoma',
            'Beaus Line',
            'Blue Finger',
            'Clubbing',
            'Healthy Nail',
            'Koilonychia',
            'Lindsay-s Nail',
            'Muehrckes Lines',
            'Onychogryphosis',
            'Pitting',
            'Terry-s Nail'
        ]

        print("Number of Detections:", len(detections))  # Print the number of detections
        print("Detections:", detections)  # Print the list of detections

        # Visualize the results
        result_image = visualize_results(np.array(image), detections, class_labels)
        st.image(result_image, caption="Object Detection Result", use_column_width=True)


    #Add the context
    st.markdown('<p class="text-black px-00-50">Cupcake ipsum dolor sit amet chocolate oat cake pudding. Oat cake shortbread wafer dragée muffin. Toffee I love sweet roll pie jelly-o lollipop. Shortbread jelly-o I love cheesecake cookie ice cream jelly-o. Icing caramels danish cake I love I love <big>Ilove</big> cookie.Cupcake ipsum dolor sit amet chocolate oat cake pudding. Oat cake shortbread wafer dragée muffin. Toffee I love sweet roll pie jelly-o lollipop. Shortbread jelly-o I love cheesecake cookie ice cream jelly-o. Icing caramels danish cake I love I love <big>Ilove</big> cookie.Cupcake ipsum dolor sit amet chocolate oat cake pudding. Oat cake shortbread wafer dragée muffin. Toffee I love sweet roll pie jelly-o lollipop. Shortbread jelly-o I love cheesecake cookie ice cream jelly-o. Icing caramels danish cake I love I love <big>Ilove</big> cookie.Cupcake ipsum dolor sit amet chocolate oat cake pudding. Oat cake shortbread wafer dragée muffin. Toffee I love sweet roll pie jelly-o lollipop. Shortbread jelly-o I love cheesecake cookie ice cream jelly-o. Icing caramels danish cake I love I love <big>Ilove</big> cookie.Cupcake ipsum dolor sit amet chocolate oat cake pudding. Oat cake shortbread wafer dragée muffin. Toffee I love sweet roll pie jelly-o lollipop. Shortbread jelly-o I love cheesecake cookie ice cream jelly-o. Icing caramels danish cake I love I love <big>Ilove</big> cookie.</p>', unsafe_allow_html=True)
   
    # Add the footer
    st.markdown('<div class="empty-div text-white px-00-50 ">This is a footer</div>', unsafe_allow_html=True)




# Run the app
if __name__ == '__main__':
    main()


#style

st.markdown(
    """
    <style>
    .stApp {
        margin: 0;
        font-family: 'Roboto', sans-serif;
        background-color: lightblue;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-left: 1rem;
    }

    .stApp header {
        background-color: #1D7874;
        color: #ffffff;
    }

    .topnav {
        background-color: lightblue;
        overflow: hidden;
        font-size: 150%;
    }
    .topnav a {
        color: #1D7874;
        text-decoration: none;
        padding: 00px 50px;
    }
    .topnav a:hover {
        background-color: #ffffff;
    }

    .empty-div {
        background-color: #1D7874;
        height: 20px;
    }

    .css-1y4p8pa {
        max-width: none !important;
        padding: 45px 00px !important;
    }
    .css-z5fcl4{
        padding: 00px !important;
    }

    .bg-light-blue-100 {
        background-color: lightblue;
    }

    .accent {
        background-color: #1D7874;
    }

    .accent-font {
        color: #1D7874;
    }

    .p {
        color: #ffffff;
        padding: 45px 00px;
    }

    .text-white {
        color: white;
    }

    .text-black {
        color: black;
    }

    .block {
        display: block;
    }

    .inline-block {
        display: inline-block;
    }

    .inline {
        display: inline;
    }

    .hidden {
        display: none;
    }

    .flex {
        display: flex;
    }

    .justify-between {
        justify-content: space-between;
    }

    .justify-center {
        justify-content: center;
    }

    .justify-start {
        justify-content: start;
    }

    .item-center {
        align-items: center;
    }

    .px-00-50 {
        padding: 00px 50px;
    }

    .px-20-00 {
        padding: 20px 00px;
    }

    .px-20-50 {
        padding: 20px 50px;
    }

    .font-roboto {
        font-family: 'Roboto', sans-serif;
    }

    .body-padding-10-50 {
        padding: 05px 50px;
    }

    .btn {
        /* height: 175%; */
        width: 77%;
        background-color: #1D7874;
    }

    .column {
        float: left;
        width: 50%;
    }

    .column-3 {
        width: 33.3%;
    }

    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    .margin-10 {
        margin: 10px;
    }

    img {
        border: 5px solid #1D7874;
    }
    </style>
    """,
    unsafe_allow_html=True
)