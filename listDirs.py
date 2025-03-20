import os

def list_files_and_directories(directories, ignore_list=None, output_file="directory_list.txt"):
    if ignore_list is None:
        ignore_list = []
    
    # Normalize the ignore list paths for consistent comparison
    ignore_list = [os.path.normcase(os.path.normpath(path)) for path in ignore_list]
    
    with open(output_file, "w") as file:
        for directory in directories:
            file.write(f"\nScanning Directory: {directory}\n")
            print(f"\nScanning Directory: {directory}")

            if not os.path.isdir(directory):
                file.write(" Invalid directory path.\n")
                print(" Invalid directory path.")
                continue
            
            # Walk through the directory tree
            for root, dirs, files in os.walk(directory):
                # Normalize the root for comparison
                norm_root = os.path.normcase(os.path.normpath(root))
                # Remove ignored directories in-place
                dirs[:] = [d for d in dirs 
                           if os.path.normcase(os.path.normpath(os.path.join(root, d))) not in ignore_list]

                # Print current directory
                file.write(f"\nDirectory: {root}\n")
                print(f"\nDirectory: {root}")
                
                # List subdirectories
                if dirs:
                    file.write(" Subdirectories:\n")
                    print(" Subdirectories:")
                    for d in dirs:
                        file.write(f"  - {d}\n")
                        print(f"  - {d}")
                else:
                    file.write(" No subdirectories found.\n")
                    print(" No subdirectories found.")

                # Filter files with normalization
                filtered_files = [f for f in files 
                                  if os.path.normcase(os.path.normpath(os.path.join(root, f))) not in ignore_list]
                if filtered_files:
                    file.write(" Files:\n")
                    print(" Files:")
                    for f in filtered_files:
                        file.write(f"  - {f}\n")
                        print(f"  - {f}")
                else:
                    file.write(" No files found.\n")
                    print(" No files found.")

    print(f"\nResults written to {output_file}")

if __name__ == "__main__":
    # Predefined list of directory paths
    directories = [
        "C:/xampp/htdocs/artisbay-server/server",
        "C:/xampp/htdocs/artisbay-server/src",
    ]

    # List of files and directories to ignore (absolute paths)
    ignore_list = [
        "C:/xampp/htdocs/artisbay-server/server/vendor",
    ]

    list_files_and_directories(directories, ignore_list)
