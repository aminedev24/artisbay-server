import React, { useState, useEffect } from "react";
import { FaEnvelope, FaGlobe } from "react-icons/fa";
import "../../css/components/invoice.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";
import { useUser } from "../user/userContext"; // Importing the useUser hook to access user data
import Modal from "../common/alertModal";
import GeneratePdfButton from "./invoicePdf";
import MyPdfDocument from "./invoicePdf"; // Ensure the correct path to your component
import { pdf } from "@react-pdf/renderer";

import { generatePdfBlob } from "./invoicePdf"; // Import the generatePdfBlob function

// Function to calculate expiry date (5 business days later)
const calculateExpiryDate = (invoiceDate) => {
  const date = new Date(invoiceDate);
  let businessDaysAdded = 0;

  while (businessDaysAdded < 5) {
    date.setDate(date.getDate() + 1);
    // Check if the day is a weekday (Monday to Friday)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      businessDaysAdded++;
    }
  }

  return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

// Modal Component
const InvoiceModal = ({ isOpen, onClose, invoiceData, onEdit, setInvoiceState, regenerateParam , resetInvoiceState}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false); // Loading state
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // Could be 'alert', 'confirmation', or 'clear_all'
  const { user } = useUser(); // Accessing user data from the context

  if (!isOpen) return null;

  const expiryDate = calculateExpiryDate(invoiceData.invoiceDate);

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost/artisbay-server/server"
      : "/server";

  const handlePrint = () => {
    window.print();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const showAlert = (message, type = "alert") => {
    setIsGeneratingPdf(true); // Show spinner
    setTimeout(() => {
      setIsGeneratingPdf(false); // Hide spinner
      setModalMessage(message);
      setModalType(type);
      setShowModal(true);
    }, 1000); // Delay for 1 second
  };

  const handleSendEmail = async () => {
    if (!user) {
      showAlert("You must be logged in to submit the invoice.");
      return;
    }

    try {
      setIsGeneratingPdf(true);

      // Step 1: Generate the PDF as a Blob
      console.log("Generating PDF...");
      const pdfBlob = await generatePdfBlob(invoiceData);
      console.log(`PDF size: ${(pdfBlob.size / 1024 / 1024).toFixed(2)} MB`);

      if (pdfBlob.size === 0) {
        throw new Error("Generated PDF Blob is empty.");
      }

      // Step 2: Convert PDF Blob to Base64
      const convertBlobToBase64 = (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(",")[1]); // Get Base64 string without the "data:" prefix
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

      const base64Pdf = await convertBlobToBase64(pdfBlob);
      console.log("PDF converted to Base64 successfully.");

      // Step 3: Construct email body (HTML format)
      const emailBody = `
      <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #004080;">Dear ${invoiceData.customerFullName},</h2>
          <p>Thank you for placing your order with <strong>Artisbay Inc.</strong></p>
          <p>This is an automated email to provide you with the deposit invoice for your orders Below are the details of the invoice:</p>
          <h3 style="color: #004080;">Invoice Details:</h3>
          <ul>
              <li><strong>Invoice Number:</strong> ${invoiceData.invoiceNumber}</li>
              <li><strong>Invoice Date:</strong> ${invoiceData.invoiceDate}</li>
              <li><strong>Payment Description:</strong> ${invoiceData.depositDescription}</li>
              <li><strong>Payment Amount:</strong> ${invoiceData.depositAmount} ${invoiceData.depositCurrency}</li>
              <li><strong>Due Date:</strong> Due immediately</li>
              <li><strong>Expiry Date:</strong> ${invoiceData.expiryDate}</li>
              <li><strong>Serial Number:</strong> ${invoiceData.serialNumber}</li>
          </ul>
          <p>Please process the Payment by the due date to proceed with your order. Once the payment is confirmed, we will begin processing your request and keep you informed of the next steps.</p>
          <p>For any questions or concerns, feel free to contact us at: <a href="mailto:sales@artisbay.com">sales@artisbay.com</a>.</p>
          <p>Thank you for choosing <strong>Artisbay Inc.</strong>.</p>
          <p style="color: #004080;"><strong>Best regards,</strong><br>Artisbay Inc.</p>
      </div>
    `;

      // Step 4: Send the email with the PDF attachment
      const response = await fetch(`${apiUrl}/sendInvoice.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: invoiceData.customerEmail,
          bcc: "contact@artisbay.com",
          subject: `Automated Deposit Invoice from Artisbay Inc.`,
          body: emailBody,
          attachment: base64Pdf,
          invoiceNumber: formattedInvoiceNumber,
          customerFullName: invoiceData.customerFullName,
          depositAmount: invoiceData.depositAmount,
          depositPurpose: invoiceData.depositPurpose,
          depositCurrency: invoiceData.depositCurrency,
          depositDescription: invoiceData.depositDescription,
          serialNumber: invoiceData.serialNumber,
          invoiceDate: invoiceData.invoiceDate,
          // Conditionally add these properties if depositPurpose is 'order vehicle'
          ...(invoiceData.depositPurpose === "order vehicle"
            ? {
                vehicleDescription: invoiceData.vehicleDescription,
                mileage: invoiceData.mileage,
                chasisNumber: invoiceData.chasisNumber,
                engineCapacity: invoiceData.engineCapacity,
                make:invoiceData.make,
                model:invoiceData.model,
              }
            : {}),
        }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to send invoice");

      const data = await response.json();
      showAlert("Invoice sent successfully!");
        // Update the URL query to set regenerate=false
      // Update the URL query to set regenerate=false
      resetInvoiceState();

      
      // Reload the page after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error sending invoice:", error);
      showAlert("An error occurred while submitting the invoice.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const Spinner = () => (
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );

  const handleEditInvoice = () => {
    onClose(); // Close the modal
    onEdit(invoiceData); // Pass the invoice data to the parent component for editing
  };
  function formatStringWithNumber(input) {
    // Convert the input to a string (handles numbers or other types)
    const str = input != null ? input.toString() : "";
    return str.replace(/\d+/g, (match) => Number(match).toLocaleString());
  }

  const invoiceNumber = invoiceData.invoiceNumber;

  // Replace all repeated words separated by hyphens globally
  const formattedInvoiceNumber = invoiceNumber.replace(/(\b\w+\b)(-\1)+/, "$1");
  console.log(formattedInvoiceNumber); // Output: RE-AB-1002


  return (
    <div className="invoice-modal-overlay">
      {isGeneratingPdf && (
        <div className="spinner-overlay">
          <Spinner />
        </div>
      )}
      {!isGeneratingPdf && showModal && (
        <Modal
          message={modalMessage}
          onClose={handleCloseModal}
          type={modalType}
        />
      )}

      <div className="modal-content">
        <button className="modal-close-btn no-print" onClick={onClose}>
          ×
        </button>
        <div className="invoice-container">
          <div className="invoice-header">
            <div className="header-full-width">
              <p>{invoiceData.serialNumber}</p>
            </div>
            <div className="headers">
              <div className="header-left">
                <img
                  alt="Artisbay Inc. Logo"
                  src={`${process.env.PUBLIC_URL}/images/Signatureforemail.png`}
                  width="140"
                />
                <div className="contact-info">
                  <p>
                    An online platform for the sale and export of used vehicles
                    and auto parts
                  </p>
                  <p>
                    Registered in Japan | under the Yokohama Legal Affairs Bureau
                  </p>
                  <p className="icon-paragraph">
                    <FaEnvelope className="icon" />
                    Email: contact@artisbay.com
                  </p>
                  <p className="icon-paragraph ">
                    <FaGlobe className="icon" />
                    Website: www.artisbay.com
                  </p>
                </div>
              </div>
              <div className="header-right">
                <p className="company-name">
                  <strong>Artisbay Inc</strong>
                </p>
                <p>
                  <strong>Date:</strong> {invoiceData.invoiceDate}
                </p>
                <p>
                  <strong>Invoice:</strong> {formattedInvoiceNumber}
                </p>
                <p>
                  <strong>Expiry Date:</strong> {invoiceData.expiryDate}
                </p>
                <p>
                  <strong>Purpose:</strong> {invoiceData.depositPurpose}
                </p>
              </div>
            </div>
          </div>

          <div className="invoice-title">
            {invoiceData.depositPurpose == "order vehicle" ? "" : "Deposit"}{" "}
            Invoice
          </div>

          <div className="invoice-info">
            <div className="left">
              <p>
                <strong>Full name:</strong> {invoiceData.customerFullName}
              </p>
              <p>
                <strong>Company:</strong> {invoiceData.customerCompany}
              </p>
              <p>
                <strong>Address:</strong> {invoiceData.customerAddress}
              </p>
              <p>
                <strong>Phone Number:</strong> {invoiceData.customerPhone}
              </p>
              <p>
                <strong>Email:</strong> {invoiceData.customerEmail}
              </p>
            </div>

            <div className="right">
              <img
                alt="Artisbay QR code"
                src={`${process.env.PUBLIC_URL}/images/qr.jpeg`}
                width="130"
              />
            </div>
          </div>

          <div className="invoice-bank-info">
            {invoiceData.depositCurrency === "USD" ? (
              <>
                <p>
                  <strong>Beneficiary Name: </strong>
                  {invoiceData.beneficiaryName}
                </p>
                <p>
                  <strong>Bank Name:</strong> {invoiceData.bankName}
                </p>
                <p>
                  <strong>Branch Name:</strong> {invoiceData.branchName}
                </p>
                <p>
                  <strong>Bank Address:</strong> {invoiceData.bankAddress}
                </p>
                <p>
                  <strong>Swift Code:</strong> {invoiceData.swiftCode}
                </p>
                <p>
                  <strong>Account Number:</strong> {invoiceData.accountNumber}
                </p>
                <p>
                  <strong>Beneficiary Address:</strong>{" "}
                  {invoiceData.beneficiaryAddress}
                </p>
              </>
            ) : (
              <div className="invoice-bank-info">
                {/* Add EUR-specific details here */}
                <p>
                  <strong>Beneficiary Name:</strong>{" "}
                  {invoiceData.beneficiaryName}
                </p>
                <p>
                  <strong>IBAN: </strong> {invoiceData.iban}{" "}
                </p>
                <p>
                  <strong>SWift/BIC:</strong> {invoiceData["swift/bic"]}{" "}
                </p>
                <p style={{ maxWidth: "70%" }}>
                  <strong>Bank name and address</strong>{" "}
                  {invoiceData["bank name and address"]}{" "}
                </p>
              </div>
            )}
          </div>

          <div className="important">
            <span className="notice">Important</span>
            <span className="invoice-number">
              Invoice number: {formattedInvoiceNumber}
            </span>
            <span className="warning">
              <span className="red">Be careful</span>,avoid being scammed!
              Confirm our correct bank account before you send your money!
            </span>
          </div>
          {invoiceData.depositPurpose !== "order vehicle" && (
            <div className="items">
              <table>
                <thead>
                  <tr>
                    <th>Payment Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{invoiceData.depositDescription}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {invoiceData.depositPurpose == "order vehicle" && (
            <div className="items">
              <table>
                <thead>
                  <tr>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Engine Capacity</th>
                    <th>Mileage</th>
                    <th>Chassis Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{invoiceData.make}</td>
                    <td>{invoiceData.model}</td>
                    <td>
                      {formatStringWithNumber(invoiceData.engineCapacity) ||
                        "not specified"} cc
                    </td>
                    <td>
                      odo {formatStringWithNumber(invoiceData.mileage) ||
                        "not specified"} km
                    </td>
                    <td>{invoiceData.chasisNumber || "not specified"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="note-amount-container">
            {invoiceData.bankNote ? (
              <div className="note">
                <p>
                  <strong>Note (By the Remitter):</strong>
                </p>
                <p>{invoiceData.bankNote}</p>
              </div>
            ) : (
              <div className="instructions">
                <p>
                  <strong>Instructions:</strong>
                </p>
                <ul>
                  <li>
                    Please ensure all transfer fees are covered by the sender to
                    avoid any shortfall.
                  </li>
                  <li>
                    Include the invoice number in the payment reference for
                    accurate processing.
                  </li>
                  <li>
                    Funds will be applied upon receipt in full. Kindly notify us
                    once the payment is completed.
                  </li>
                  <li>
                    Please note that our bank is located in Japan and
                    international transfers may take 3-5 business days to
                    reflect.
                  </li>
                </ul>
              </div>
            )}

            <div className="amount-container">
              <table className="amount-table">
                <tbody>
                  <tr>
                    <th>Payment amount</th>
                    <td>
                      {invoiceData.depositAmount.toLocaleString()} {invoiceData.depositCurrency}
                    </td>
                  </tr>
                  <tr>
                    <th>Grand Total</th>
                    <td>
                      {invoiceData.depositAmount.toLocaleString()} {invoiceData.depositCurrency}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="invoice-footer-container">
            {
              // Render the instructions in their original place if bankNote is missing
              invoiceData.bankNote ? (
                <div className="instructions">
                  <p>
                    <strong>Instructions:</strong>
                  </p>
                  <ul>
                    <li>
                      Please ensure all transfer fees are covered by the sender
                      to avoid any shortfall.
                    </li>
                    <li>
                      Include the invoice number in the payment reference for
                      accurate processing.
                    </li>
                    <li>
                      Funds will be applied upon receipt in full. Kindly notify
                      us once the payment is completed.
                    </li>
                    <li>
                      Please note that our bank is located in Japan and
                      international transfers may take 3-5 business days to
                      reflect.
                    </li>
                  </ul>
                </div>
              ) : (
                <div
                  style={{ maxWidth: !invoiceData.bankNote && "50%" }}
                  className="warning-notice"
                >
                  <p>
                    <strong>Important</strong>
                  </p>
                  <p>
                    This invoice is intended solely for legal and official
                    purposes. Any unauthorized use, modification, or
                    misrepresentation of its content is strictly prohibited and
                    may result in legal action.
                  </p>
                </div>
              )
            }

            <div className="invoice-footer">
              <p>Authorised Sales Signature</p>
              <div className="signature-container">
                <img
                  className="signature"
                  alt="Artisbay signature"
                  src={`${process.env.PUBLIC_URL}/images/absignature.png`}
                  width="130"
                />

                <img
                  alt="Artisbay stamp"
                  src={`${process.env.PUBLIC_URL}/images/abstamp.png`}
                  width="70"
                />
              </div>

              <p>Thank you for your business!</p>
            </div>
          </div>
          {invoiceData.bankNote && (
            <div className="warning-notice">
              <p>
                <strong>Important</strong>
              </p>
              <p>
                This invoice is intended solely for legal and official purposes.
                Any unauthorized use, modification, or misrepresentation of its
                content is strictly prohibited and may result in legal action.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            {/*
              <button className='no-print' onClick={handlePrint}>Print</button>
              <button className='no-print' onClick={handleSaveAsPDF}>Save as PDF</button>
              <GeneratePdfButton invoiceData={invoiceData} />
            */}
            {user && user.role == "admin" && (
              <GeneratePdfButton invoiceData={invoiceData} />
            )}
            <button
              className="no-print"
              onClick={handleSendEmail}
              disabled={isGeneratingPdf}
            >
              {isGeneratingPdf ? "Generating PDF..." : "Request Invoice"}
            </button>
            <button className="no-print" onClick={handleEditInvoice}>
              Edit Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
