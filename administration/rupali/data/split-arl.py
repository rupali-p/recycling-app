import os
import random
import shutil

# Define paths for labels and images
labels_path = 'administration/rupali/data/arl-done/obj_train_data'
images_path = 'administration/rupali/data/arl-done/arl-images'

# Define paths for output directories
output_path = 'administration/rupali/data/arl-done/arl-131'

# Create 'train', 'valid', and 'test' directories
for split in ['train', 'valid', 'test']:
    split_path = os.path.join(output_path, split)
    os.makedirs(split_path, exist_ok=True)

    # Create 'labels' and 'images' directories inside each split
    os.makedirs(os.path.join(split_path, 'labels'), exist_ok=True)
    os.makedirs(os.path.join(split_path, 'images'), exist_ok=True)

# List all labels and images
labels = os.listdir(labels_path)
images = os.listdir(images_path)

# Shuffle the data for randomness
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
def copy_files(src_dir, dest_dir, file_list):
    for filename in file_list:
        src_file = os.path.join(src_dir, filename)
        dest_file = os.path.join(dest_dir, filename)
        shutil.copy(src_file, dest_file)

copy_files(labels_path, os.path.join(output_path, 'train', 'labels'), train_labels)
copy_files(labels_path, os.path.join(output_path, 'valid', 'labels'), valid_labels)
copy_files(labels_path, os.path.join(output_path, 'test', 'labels'), test_labels)

# Split images
train_images = [f.replace('.txt', '.jpg') for f in train_labels]
valid_images = [f.replace('.txt', '.jpg') for f in valid_labels]
test_images = [f.replace('.txt', '.jpg') for f in test_labels]

# Copy image files to the corresponding split
copy_files(images_path, os.path.join(output_path, 'train', 'images'), train_images)
copy_files(images_path, os.path.join(output_path, 'valid', 'images'), valid_images)
copy_files(images_path, os.path.join(output_path, 'test', 'images'), test_images)

print("Data split and directory structure created.")
