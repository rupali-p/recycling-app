import os
import random
import shutil

# Define paths for labels and images
labels_path = 'administration/rupali/data/arl-done/obj_train_data'
images_path = 'administration/rupali/data/arl-done/arl-images' 

# List all labels and images
labels = os.listdir(labels_path)
images = os.listdir(images_path)
print("len of label files: " + str(len(labels)))
print("len of images: " + str(len(images)))

# Compare file names and print any mismatches
for label_file in labels:
    if label_file.replace('.txt', '.jpg') not in images:
        print(f"File name mismatch: {label_file} (in labels folder)")
        
for image_file in images:
    if image_file.replace('.jpg', '.txt') not in labels:
        print(f"File name mismatch: {image_file} (in images folder)")

# Define paths for the output data split
output_labels_path = 'administration/rupali/data/arl-done/output-labels'
output_images_path = 'administration/rupali/data/arl-done/output-images'

# Create directories for the data split
for split_dir in [output_labels_path, output_images_path]:
    os.makedirs(os.path.join(split_dir, 'train'), exist_ok=True)
    os.makedirs(os.path.join(split_dir, 'valid'), exist_ok=True)
    os.makedirs(os.path.join(split_dir, 'test'), exist_ok=True)

# Function to copy files to the corresponding split
def copy_files(src_dir, dest_dir, file_list):
    for filename in file_list:
        src_file = os.path.join(src_dir, filename)
        dest_file = os.path.join(dest_dir, filename)
        shutil.copy(src_file, dest_file)



# Shuffle the data
random.shuffle(labels)

# Calculate the split sizes
total_samples = len(labels)
train_size = int(0.7 * total_samples)
valid_size = int(0.2 * total_samples)
test_size = total_samples - train_size - valid_size

# Split labels
train_labels = labels[:train_size]
valid_labels = labels[train_size:train_size + valid_size]
test_labels = labels[train_size + valid_size:]

# Copy label files to the corresponding split
copy_files(labels_path, os.path.join(output_labels_path, 'train'), train_labels)
copy_files(labels_path, os.path.join(output_labels_path, 'valid'), valid_labels)
copy_files(labels_path, os.path.join(output_labels_path, 'test'), test_labels)

# Split images
train_images = [f.replace('.txt', '.jpg') for f in train_labels]
valid_images = [f.replace('.txt', '.jpg') for f in valid_labels]
test_images = [f.replace('.txt', '.jpg') for f in test_labels]

# Copy image files to the corresponding split
copy_files(images_path, os.path.join(output_images_path, 'train'), train_images)
copy_files(images_path, os.path.join(output_images_path, 'valid'), valid_images)
copy_files(images_path, os.path.join(output_images_path, 'test'), test_images)

print("Data split completed.")
