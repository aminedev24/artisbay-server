import os
import shutil

def organize_components(src_components_dir):
    # Mapping of target folder to list of component filenames (case-sensitive)
    mapping = {
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
            "vehiculeEnquiry.js",  # consider renaming to "vehicleEnquiry.js" for consistency
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
            "fetchIquiries.js",   # consider renaming to "fetchInquiries.js" if needed
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
        # You may choose to leave these folders (or files) unchanged:
        # "api": [], "help": [], "data": [] etc.
    }
    
    # Create each target folder if it doesn't exist.
    for folder in mapping:
        target_dir = os.path.join(src_components_dir, folder)
        os.makedirs(target_dir, exist_ok=True)
    
    # Keep track of which files were moved.
    moved_files = []
    
    # Iterate over each mapping entry and move the files.
    for folder, files in mapping.items():
        target_dir = os.path.join(src_components_dir, folder)
        for file_name in files:
            src_file = os.path.join(src_components_dir, file_name)
            if os.path.exists(src_file):
                dest_file = os.path.join(target_dir, file_name)
                try:
                    shutil.move(src_file, dest_file)
                    print(f"Moved {file_name} to {target_dir}")
                    moved_files.append(file_name)
                except Exception as e:
                    print(f"Error moving {file_name}: {e}")
            else:
                print(f"File {file_name} not found in {src_components_dir}")
    
    print("\nOrganization complete.")
    print("Moved files:", moved_files)

if __name__ == "__main__":
    # Adjust this path if your src/components folder is elsewhere.
    components_path = os.path.join("C:/xampp/htdocs/artisbay-server-clean/src", "components")
    organize_components(components_path)
