import os
import shutil
import re

# Define a mapping for CSS files.
CSS_MAPPING = {
    "global": ["App.css", "theme.css"],
    "layout": ["header.css", "footer.css", "topbar.css", "RightSidebar.css"],
    "pages": ["homepage.css", "login.css", "register.css", "profile.css", "profilePage.css", "userHomepage.css"],
    "components": [
        "accountancyForm.css", "artisbayPromo.css", "bankInfo.css", "carCard.css", "carDetails.css",
        "carDismantling.css", "carList.css", "companyProfile.css", "congoAgent.css", "contact.css",
        "cuttingCost.css", "emailConfirmation.css", "fetchCars.css", "invoice.css", 
        "namibiaAgent copy.css", "namibiaAgent.css", "tireSelection.css", "usedTires.css", "usedTiresForm.css",
        "vehicleInfo.css", "vehiculeEquiry.css"
    ],
    "utilities": ["faq.css", "howToBuy.css", "searchForm.css", "slider.css", "stockList.css", "terms.css", "toolTip.css"],
    "agents": ["japanExports.css", "tanzaniaAgent.css"]
}

def organize_css(css_dir):
    """
    Moves CSS files in css_dir into subdirectories according to CSS_MAPPING.
    If a file is already in its destination, it skips the move.
    Returns a dictionary mapping filename -> new absolute file path.
    """
    file_new_locations = {}
    
    # Create subdirectories if they don't exist.
    for folder in CSS_MAPPING:
        target_dir = os.path.join(css_dir, folder)
        os.makedirs(target_dir, exist_ok=True)
    
    # Move each CSS file into its target folder.
    for folder, files in CSS_MAPPING.items():
        target_dir = os.path.join(css_dir, folder)
        for file_name in files:
            src_file = os.path.join(css_dir, file_name)
            dest_file = os.path.join(target_dir, file_name)
            
            # If the file already exists in the destination, skip moving.
            if os.path.exists(dest_file):
                print(f"Skipping {file_name}: already moved to {target_dir}")
                file_new_locations[file_name] = os.path.abspath(dest_file)
                continue
            
            if os.path.exists(src_file):
                try:
                    shutil.move(src_file, dest_file)
                    print(f"Moved {file_name} to {target_dir}")
                    file_new_locations[file_name] = os.path.abspath(dest_file)
                except Exception as e:
                    print(f"Error moving {file_name}: {e}")
            else:
                print(f"File {file_name} not found in {css_dir} (might have been already moved)")
    return file_new_locations

def update_css_imports(project_root, css_locations):
    """
    Recursively scans all .js and .jsx files under project_root (excluding node_modules)
    and updates import statements that refer to CSS files.
    """
    # Regex to match CSS import statements, e.g.:
    # import '../../css/file.css';
    import_regex = re.compile(
        r"""(?P<prefix>import\s+[^'"]*\s+from\s+)(?P<quote>['"])(?P<path>[^'"]+\.css)(?P=quote)"""
    )
    
    for root, dirs, files in os.walk(project_root):
        # Skip node_modules.
        if "node_modules" in dirs:
            dirs.remove("node_modules")
        for file in files:
            if file.endswith(".js") or file.endswith(".jsx"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                updated_content = content

                for match in import_regex.finditer(content):
                    original_import = match.group(0)
                    import_prefix = match.group("prefix")
                    import_quote = match.group("quote")
                    import_path = match.group("path")
                    
                    imported_basename = os.path.basename(import_path)
                    
                    if imported_basename in css_locations:
                        new_abs_target = css_locations[imported_basename]
                        current_dir = os.path.dirname(os.path.abspath(file_path))
                        new_rel_path = os.path.relpath(new_abs_target, start=current_dir)
                        new_rel_path = new_rel_path.replace("\\", "/")
                        if not new_rel_path.startswith("."):
                            new_rel_path = "./" + new_rel_path
                        new_import = f"{import_prefix}{import_quote}{new_rel_path}{import_quote}"
                        
                        if new_import != original_import:
                            print(f"In {file_path} replacing:\n  {original_import}\nwith:\n  {new_import}\n")
                            updated_content = updated_content.replace(original_import, new_import)
                
                if updated_content != content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(updated_content)

if __name__ == "__main__":
    # Set your project paths. Adjust if necessary.
    project_root = os.path.abspath("C:/xampp/htdocs/artisbay-server-clean/src")
    css_dir = os.path.join(project_root, "css")
    
    # Organize CSS files (if not already done).
    new_css_locations = organize_css(css_dir)
    
    # Update CSS import statements in JS/JSX files.
    update_css_imports(project_root, new_css_locations)
    
    print("CSS organization and import updates complete.")
