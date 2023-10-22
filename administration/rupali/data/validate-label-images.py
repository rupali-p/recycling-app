import os

# Define the paths to the label and image directories
labels_path = 'administration/rupali/data/new-arls/obj_train_data'
images_path = 'administration/rupali/data/new-arls-images'

# Get a list of all label file names (without extensions)
label_files = [filename.split('.')[0] for filename in os.listdir(labels_path) if filename.endswith('.txt')]

# Get a list of all image file names
image_files = [filename.split('.')[0] for filename in os.listdir(images_path)]

# Iterate over image files
for image_name in image_files:
    # Skip blank entries
    if not image_name:
        continue

    # Check if the image name is not in the set of label file names
    if image_name not in label_files:
        image_path = os.path.join(images_path, image_name + '.jpg')
        if os.path.exists(image_path):
            print(f"Label not found for image: {image_name}")

            # Remove the image file
            os.remove(image_path)

print("Task completed.")
