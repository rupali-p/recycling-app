import os
import random
import shutil

# Define paths for arl and pic datasets
arl_path = 'administration/rupali/data/new-arl-images-done'
pic_path = 'administration/rupali/data/pic'

# arl_labels_train = os.listdir('administration/rupali/data/arl-done/arl-131/train/labels')
# arl_labels_valid = os.listdir('administration/rupali/data/arl-done/arl-131/valid/labels')
# arl_labels_test = os.listdir('administration/rupali/data/arl-done/arl-131/test/labels')
# print("len of arl train files: " + str(len(arl_labels_train))) ## 91
# print("len of arl valid files: " + str(len(arl_labels_valid))) ## 26
# print("len of arl test files: " + str(len(arl_labels_test)))   ## 14

# pic_labels_train = os.listdir('administration/rupali/data/pic/train/labels')
# pic_labels_valid = os.listdir('administration/rupali/data/pic/valid/labels')
# pic_labels_test = os.listdir('administration/rupali/data/pic/test/labels')
# print("len of pic train files: " + str(len(pic_labels_train))) ## 1093
# print("len of pic valid files: " + str(len(pic_labels_valid))) ## 108
# print("len of pic test files: " + str(len(pic_labels_test)))   ## 55


# Define paths for the combined dataset
combined_path = 'administration/rupali/data/combined-new'

# Copy 'train', 'valid', and 'test' data from arl dataset
for split in ['train', 'valid', 'test']:
    arl_split_path = os.path.join(arl_path, split)
    combined_split_path = os.path.join(combined_path, split)

    # Copy 'labels' and 'images' directories
    shutil.copytree(os.path.join(arl_split_path, 'labels'), os.path.join(combined_split_path, 'labels'), dirs_exist_ok=True)
    shutil.copytree(os.path.join(arl_split_path, 'images'), os.path.join(combined_split_path, 'images'), dirs_exist_ok=True)

# Copy 'train', 'valid', and 'test' data from pic dataset
for split in ['train', 'valid', 'test']:
    pic_split_path = os.path.join(pic_path, split)
    combined_split_path = os.path.join(combined_path, split)

    # Copy 'labels' and 'images' directories
    shutil.copytree(os.path.join(pic_split_path, 'labels'), os.path.join(combined_split_path, 'labels'), dirs_exist_ok=True)
    shutil.copytree(os.path.join(pic_split_path, 'images'), os.path.join(combined_split_path, 'images'), dirs_exist_ok=True)

print("Combined dataset and directory structure created.")
