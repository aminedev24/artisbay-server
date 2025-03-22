import os

def search_in_files(directory, search_terms):
    if not os.path.exists(directory):
        print(f"Directory '{directory}' does not exist.")
        return

    print(f"Searching in the directory: {directory}")
    
    # Recursively search through all files
    for root, _, files in os.walk(directory):
        for filename in files:
            filepath = os.path.join(root, filename)
            if os.path.isfile(filepath):
                try:
                    with open(filepath, 'r', encoding='utf-8-sig', errors='ignore') as file:
                        content = file.read()
                        for term in search_terms:
                            if term.lower() in content.lower():
                                print(f"Found '{term}' in {filepath}")
                except UnicodeDecodeError:
                    print(f"Could not read {filepath} due to encoding issues.")
                except Exception as e:
                    print(f"Error opening {filepath}: {e}")

# Get the current working directory
current_dir = os.getcwd()
print("Current Directory:", current_dir)

# Specify the exact directory to search
# Use forward slash for cross-platform compatibility
directory_to_search = os.path.join(current_dir, 'components')

# Search terms to look for (case insensitive)
search_terms = ['useHistory', '#/', 'hash', 'car-cost-calculator']

# Perform the search
search_in_files(directory_to_search, search_terms)