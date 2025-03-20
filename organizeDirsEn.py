import os
import shutil
import re

# Mapping of target folder (relative to src/components) to list of component filenames (case-sensitive)
COMPONENT_MAPPING = {
    "user": [
        "profile.js",
        "profile2.js",
        "userHomepage.js",
        "userContext.js",
        "verifyEmail.js",
        "verifyUserEmail.js",
    ],
    "common": [
        "header.js",
        "footer.js",
        "sidebar.js",
        "topbar.js",
        "alertModal.js",
    ],
    "forms": [
        "accountancyForm.js",
        "accountancyForm2.js",
        "agreementForm.js",
        "invoiceForm.js",
        "registerForm.js",
        "registerForm2.js",
        "resetPassword.js",
    ],
    "pages": [
        "homepage.js",
        "login.js",
        "register.js",
    ],
    "vehicles": [
        "carCard.js",
        "carData.js",
        "carData copy.js",  # you may want to rename or merge duplicates
        "carDetails.js",
        "carDismantling.js",
        "carList.js",
        "vehicleData.js",
        "vehicleInformation.js",
        "vehicleSelector.js",
        "vehiculeEnquiry.js",  # consider renaming to "vehicleEnquiry.js"
        "tireSelection.js",
        "tireSizes.js",
        "usedTires.js",
        "usedTiresForm.js",
    ],
    "sales": [
        "invoice.js",
        "invoice2.js",
        "invoicePdf.js",
        "agreementPdf.js",
        "salesAgreement.js",
        "salesAgreementPdf.js",
        "submittedTireOrders.js",
    ],
    "agents": [
        "africaContainer.js",
        "africaRoroContainer.js",
        "congoAgent.js",
        "namibiaAgent.js",
        "tanzaniaAgent.js",
        "europeRoro.js",
    ],
    "dataFetch": [
        "fetchDeposits.js",
        "fetchInvoices.js",
        "fetchIquiries.js",   # consider renaming to "fetchInquiries.js"
        "fetchSavedCars.js",
        "getUsers.js",       # if this file is used to fetch user data
    ],
    "utilities": [
        "countries.js",
        "countryList.js",
        "cuttingCalculator.js",
        "cuttingCostList.js",
        "localServicesCountries.js",
        "screenSize.js",
        "toolTip.js",
        "toggletheme.js",
        "makestypes.js",
        "handleRevert.js",
    ],
    "misc": [
        "calander.js",
        "contact.js",
        "imageWithLoader.js",
        "ordersModal.js",
        "rightsidebar.js",
        "savedCarsPanel.js",
        "searchContainer.js",
        "SendEmailVerification.js",
        "settings.js",
        "shipping.js",
        "slider.js",
        "stockList.js",
        "temp.js",
    ],
    # Add other mappings or leave some folders untouched (like "api" or "help") if needed.
}

def organize_components(src_components_dir):
    """
    Moves files from src_components_dir into subfolders according to COMPONENT_MAPPING.
    Returns a dictionary mapping filename -> new absolute file path.
    """
    file_new_locations = {}  # key: filename, value: new absolute path

    # Create each target folder if it doesn't exist.
    for folder in COMPONENT_MAPPING:
        target_dir = os.path.join(src_components_dir, folder)
        os.makedirs(target_dir, exist_ok=True)

    # Move files based on the mapping.
    for folder, files in COMPONENT_MAPPING.items():
        target_dir = os.path.join(src_components_dir, folder)
        for file_name in files:
            src_file = os.path.join(src_components_dir, file_name)
            if os.path.exists(src_file):
                dest_file = os.path.join(target_dir, file_name)
                try:
                    shutil.move(src_file, dest_file)
                    print(f"Moved {file_name} to {target_dir}")
                    file_new_locations[file_name] = os.path.abspath(dest_file)
                except Exception as e:
                    print(f"Error moving {file_name}: {e}")
            else:
                print(f"File {file_name} not found in {src_components_dir}")
    return file_new_locations

def update_imports(project_root, file_locations, src_components_dir):
    """
    Recursively scans all .js files under project_root (excluding node_modules) and updates import statements.
    
    file_locations: dict mapping filename -> new absolute path.
    src_components_dir: absolute path of the src/components folder.
    """
    # Regular expression to match import statements.
    # It matches lines like: import Something from '...';
    # or: import '...';
    import_regex = re.compile(
        r"""(?P<prefix>import\s+(?:[^'"]+\s+from\s+)?)(?P<quote>['"])(?P<path>[^'"]+)(?P=quote)"""
    )

    for root, dirs, files in os.walk(project_root):
        # Skip node_modules or other irrelevant directories
        if "node_modules" in dirs:
            dirs.remove("node_modules")
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                updated_content = content

                # Find all import statements
                for match in import_regex.finditer(content):
                    original_import = match.group(0)
                    import_prefix = match.group("prefix")
                    import_quote = match.group("quote")
                    import_path = match.group("path")

                    # Check if the imported path seems to point to a file in src/components that we moved.
                    # We'll extract the basename from the import path.
                    imported_basename = os.path.basename(import_path)
                    # Add .js if not present (assume ES module extension might be omitted)
                    if not imported_basename.endswith(".js"):
                        imported_basename += ".js"

                    if imported_basename in file_locations:
                        # Compute the new absolute target and new relative path.
                        new_abs_target = file_locations[imported_basename]
                        current_dir = os.path.dirname(os.path.abspath(file_path))
                        new_rel_path = os.path.relpath(new_abs_target, start=current_dir)
                        # Replace Windows backslashes with forward slashes.
                        new_rel_path = new_rel_path.replace("\\", "/")
                        # For JS modules, ensure the relative path starts with './' or '../'
                        if not new_rel_path.startswith("."):
                            new_rel_path = "./" + new_rel_path
                        # Remove the .js extension if your project convention omits it
                        new_rel_path_no_ext, ext = os.path.splitext(new_rel_path)
                        
                        # Build the replacement import statement.
                        new_import = f"{import_prefix}{import_quote}{new_rel_path_no_ext}{import_quote}"
                        
                        if new_import != original_import:
                            print(f"In {file_path} replacing:\n  {original_import}\nwith:\n  {new_import}\n")
                            updated_content = updated_content.replace(original_import, new_import)
                
                # If changes were made, write the updated file.
                if updated_content != content:
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.write(updated_content)

if __name__ == "__main__":
    # Define your project paths.
    project_root = os.path.abspath("C:/xampp/htdocs/artisbay-server-clean/src")
    components_path = os.path.join(project_root, "components")
    
    # First, move the files according to the mapping.
    new_locations = organize_components(components_path)
    
    # Then, update the import statements in the project.
    update_imports(project_root, new_locations, components_path)
    
    print("Organization and import updates complete.")
