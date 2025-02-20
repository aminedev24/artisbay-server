import os

def list_directories_in_current_location():
    current_directory = os.getcwd()
    print(f"Current directory: {current_directory}")
    
    print("Listing directories and subdirectories:")
    for foldername, subfolders, filenames in os.walk(current_directory):
        print(f"Directory: {foldername}")
        for subfolder in subfolders:
            print(f"  Subdirectory: {os.path.join(foldername, subfolder)}")

def search_in_files(directory, search_terms):
    if not os.path.exists(directory):
        print(f"Directory '{directory}' does not exist.")
        return
    
    for foldername, subfolders, filenames in os.walk(directory):
       # print(f"Searching in directory: {foldername}")
        for filename in filenames:
            filepath = os.path.join(foldername, filename)
            try:
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
                    try:
                        content = file.read()
                        for term in search_terms:
                            if term in content:
                                print(f"Found '{term}' in {filepath}")
                    except UnicodeDecodeError:
                        print(f"Could not read {filepath} due to encoding issues.")
            except Exception as e:
                print(f"Error opening {filepath}: {e}")

directory_to_search = os.getcwd()  # Using the current working directory
search_terms = ['#/invoice', "to='/invoice"]

# List directories first
#list_directories_in_current_location()
# Search for the terms in files
search_in_files(directory_to_search, search_terms)
