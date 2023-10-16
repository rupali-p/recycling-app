import os
current_directory = os.getcwd()
print(f"Current Directory: {current_directory}")

# folder_path = 'administration/rupali/data/arl-done/obj_train_data'
folder_path = 'administration/rupali/data/new-arls/obj_train_data'
# Iterate over each file in the folder
# for filename in os.listdir(folder_path):
#     if filename.endswith(".txt"):
#         print(filename)

# print("List of .txt files in the folder.")

# Function to check if a file is empty
def is_empty(file_path):
    return os.path.getsize(file_path) == 0

# Function to replace the first character of each line
def replace_first_char(line):
    if line and line[0].isdigit():
        new_char = str(int(line[0]) + 8)
        return new_char + line[1:]
    return line

# Iterate over each file in the folder
for filename in os.listdir(folder_path):
    if filename.endswith(".txt"):
        file_path = os.path.join(folder_path, filename)

        # Check if the file is empty and delete if it is
        if is_empty(file_path):
            os.remove(file_path)
            print(f"Deleted empty file: {filename}")
        else:
            # Read the file, replace the first character, and write it back
            with open(file_path, 'r') as file:
                lines = file.readlines()
            
            modified_lines = [replace_first_char(line) for line in lines]

            with open(file_path, 'w') as file:
                file.writelines(modified_lines)
            print(f"Modified and saved: {filename}")

print("Task completed.")
