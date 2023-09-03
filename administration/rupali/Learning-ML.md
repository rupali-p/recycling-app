# Overview of the project

## Build a Machine Leaning Model
There are many types of ML models, but for something that we'd be adding into web/mobile, something small and light would be the way to go
The choice of model depends on various factors, including the available data, computational resources, and the specific requirements of the application. Here are some types of models commonly used for object detection and classification tasks:

- Convolutional Neural Networks (CNNs): CNNs are a popular choice for image-based tasks. They are designed to automatically and adaptively learn patterns and features from input images. CNNs have proven to be highly effective for image classification and object detection tasks.

- YOLO (You Only Look Once): YOLO is a real-time object detection system that can detect multiple objects in an image in a single pass. It's known for its speed and accuracy, making it suitable for applications where real-time detection is crucial. (My personal favourite)

- Faster R-CNN: Faster R-CNN is a popular framework for object detection that combines region proposal networks (RPNs) with CNNs. It provides accurate object localization and classification.

- MobileNet: MobileNet is a family of lightweight neural network architectures specifically designed for mobile and embedded vision applications. It offers a good balance between model size and accuracy, making it suitable for mobile applications.

- ResNet (Residual Networks): ResNet is known for its deep architecture, allowing the training of very deep neural networks. It's suitable when high accuracy is a priority, but it may require more computational resources.

- EfficientNet: EfficientNet is designed to provide state-of-the-art accuracy while being computationally efficient. It achieves a good balance between model size and performance, making it a promising choice for resource-constrained environments.



## Integrate model into a web/mobile app

Integrating a machine learning model into a web/mobile application involves several steps. Here's an overview of how to integrate a model into a web or mobile app:

### Step 1: Model Training and Export

Train your machine learning model using the appropriate dataset.
Once the model is trained and performs well, export it to a format compatible with your chosen development framework. Common formats include ONNX, TensorFlow SavedModel, or PyTorch JIT.
I've trained using YOLOv5 and exported to ONNX, then used https://netron.app/ to find information about the model

### Step 2: Choose a Development Framework / Loading it in

Decide on the development framework for our web or mobile app. Popular choices include:
For web apps: JavaScript (with libraries like TensorFlow.js or ONNX.js), Python (with web frameworks like Flask or Django for server-side integration).
For mobile apps: Swift for iOS development and Kotlin or Java for Android development.

In our web or mobile app, we can load the pre-trained machine learning model into memory using the framework-specific APIs. For example, in TensorFlow.js, we can use tf.loadGraphModel() to load a TensorFlow model.

#### Streamlit:

Overview: Streamlit is a Python library that simplifies the process of creating web applications for data science and machine learning. It is known for its simplicity and ease of use.
Advantages:
Quick prototyping: You can create interactive web apps with minimal code.
Ideal for data apps: Streamlit is great for building data-centric applications and dashboards.
Pythonic: If you're already comfortable with Python, Streamlit offers a familiar environment.
Use Case: Streamlit is well-suited for small to medium-sized projects, especially those involving data analysis, visualization, or ML model demos.

#### Flask:

Overview: Flask is a micro web framework for Python. It's lightweight and provides the basics needed to build web applications. Flask offers flexibility and can be combined with various libraries.
Advantages:
Customization: Flask allows you to build web apps tailored to your specific requirements.
Extensibility: You can integrate libraries like TensorFlow.js or ONNX.js for client-side machine learning.
Scalability: Flask is suitable for both small and large projects.
Use Case: Flask is a good choice when you need more control over your web application's structure and components. It's often used for building RESTful APIs to serve machine learning models.


#### Django:

Overview: Django is a high-level Python web framework that follows the "batteries-included" philosophy. It includes many built-in features for rapid development.
Advantages:
Comprehensive: Django provides everything you need, including an ORM, authentication, and admin panel.
Security: Django comes with security features by default, which can be crucial for applications handling sensitive data.
Scalability: Django is suitable for large-scale applications and can handle complex workflows.
Use Case: Django is often chosen for large, data-intensive web applications where security and scalability are top priorities. While it might be a bit heavier than Flask, it offers a robust development environment.

#### TensorFlow.js and ONNX.js:

Overview: These JavaScript libraries enable you to run machine learning models directly in the browser, making them suitable for web applications.
Advantages:
Client-side inference: You can perform inference on the client-side, reducing server load and enhancing user experience.
Compatibility: TensorFlow.js and ONNX.js support a wide range of machine learning frameworks, making it easy to integrate models.
Real-time predictions: These libraries are ideal for applications that require real-time predictions without server round-trips.
Use Case: Use TensorFlow.js and ONNX.js in combination with your chosen web framework (e.g., Streamlit, Flask, or Django) to incorporate machine learning models into your web applications.


# Example End To End App

The tech stack for the project I've working on, from the YOLO model to the Streamlit app, includes several components and technologies:

### YOLO (You Only Look Once):
YOLO is a deep learning model architecture for real-time object detection.
YOLO model training and inference may involve deep learning frameworks like PyTorch or TensorFlow.
Your YOLO model was converted to the ONNX format for inference.

### ONNX (Open Neural Network Exchange):
ONNX is an open standard for representing deep learning models that allows for interoperability between different deep learning frameworks.
The YOLO model was exported to the ONNX format to be used with ONNX Runtime.

### ONNX Runtime:
ONNX Runtime is a high-performance inference engine for ONNX models.
It allows you to run inference on ONNX models in various programming languages, including Python.

### Python:
Python is the primary programming language used for developing and scripting the entire project.

### NumPy:
NumPy is used for numerical operations and array handling in Python.

### OpenCV (Open Source Computer Vision Library):
OpenCV is a popular computer vision library used for image and video processing.

### Streamlit:
Streamlit is an open-source Python library used for creating web applications and dashboards for data science and machine learning projects.
It simplifies the process of creating interactive web-based interfaces.

### Web Development:
The Streamlit app serves as the user interface for interacting with the YOLO model.
Streamlit apps are typically run in a web browser, and users can upload images and view the object detection results.

### HTML/CSS
Streamlit allows for basic HTML/CSS customization of the app's appearance and layout if needed.


* some of these informantion have been copied and pasted from various resources but they all relate to our work