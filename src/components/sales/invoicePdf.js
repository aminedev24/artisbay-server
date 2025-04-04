import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { StyleSheet, Document, Page, View, Text, Image, Font } from '@react-pdf/renderer';
import { FaEnvelope, FaGlobe } from "react-icons/fa";
import SalesAgreementPDF from './salesAgreementPdf';

// Register Arial font
Font.register({
    family: 'Roboto',
    fonts: [
      { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf' },
      { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 700, lineHeight: 1.2 }
    ]
  });

// Define styles for the PDF
const styles = StyleSheet.create({
    text: {
      hyphenationCallback: null, // Prevents hyphenation
      wordBreak: 'break-word', // Ensures words break naturally
    },
    invoiceContainer: {
      padding: '5px 10px',
      fontFamily: 'Roboto',
      minHeight: '100%',
      
    },
    headerText: {
      fontSize: '10px',
    },  
    description : {
        fontSize: '10px',
        maxWidth: '98%',
    },
    invoiceHeader: {
      display: 'flex',
      flexDirection: 'column',
      borderBottom: '2px solid #000',
    },
    headerFullWidth: {
      display: 'flex',
      justifyContent: 'flex-end',
      width:'100%',
    },
    headerFullWidthText: {
      margin: 0,
      fontSize: '10px',
      alignSelf: 'flex-end',
    },
    headers: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: '5px',
      alignItems: 'center', // Ensure vertical alignment
      width: '100%',
    },

    logo: {
      width: '160px',
    },
    contactInfo: {
      maxWidth: '32%',
    },
    contactInfoText: {
      margin: 0,
      fontSize: '12px',
      lineHeight: 1.5, // Adjust line height for better readability
      marginBottom: '5px',
    },
    iconParagraph: {
      display: 'flex',
      flexDirection: 'row',
      fontSize: '10px',
      alignItems: 'center',
    },
    icon: {
      color: '#1e3a8a',
      marginRight: '5px',
      display: 'inline-block',
    },
    companyName: {
      fontSize: '15px',
      fontWeight: 'bold',
      marginBottom: '5px',
      paddingBottom: '10px',
    },
    invoiceTitle: {
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    invoiceInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '5px',
      position: 'relative',
    },
    left: {
      width: '48%',
    },
    right: {
      width: '45%',
      textAlign: 'right',
    },
    rightImage: {
      position: 'absolute',
      top: 0,
      right: '5%',
      width: '100px',
    },
    invoiceBankInfo: {
      marginBottom: '5px',
    },
    bankInfoText: {
      margin: 0,
      fontSize: '12px',
      lineHeight: 1.5, // Consistent line height
    },
    important: {
      border: '1px solid #000',
      marginBottom: '5px',
      display: 'flex',
      flexDirection: 'row',
      gap: '4px',
    },
    notice: {
      backgroundColor: '#1da1f2',
      color: '#000',
      fontWeight: 'bold',
      padding: '10px',
      border: '1px solid #000',
      display: 'flex',
      alignItems: 'center',
      flex: 2,
      fontSize: '12px',
    },
    invoiceNumber: {
      alignSelf: 'center',
      flex: 3.5,
      fontWeight: 'bold',
      fontSize: '12px',
    },
    warning: {
      backgroundColor: 'transparent',
      border: 'none',
      marginLeft: 0,
      fontWeight: 'bold',
      flex: 6,
      fontSize: '11px',
      alignSelf: 'center',
    },
    red: {
      color: 'red',
    },
    itemsTable: {
      display: 'table',
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '5px',
    },
    tableRow: {
      display: 'table-row',
    },
    tableHeader: {
      display: 'table-cell',
      border: '1px solid #000',
      padding: '5px',
      textAlign: 'left',
      fontWeight: 'bold',
      backgroundColor: '#1da1f2',
      fontSize: '12px',
      color: '#fff',
    },
    tableCell: {
      display: 'table-cell',
      border: '1px solid #000',
      padding: '5px',
      textAlign: 'left',
      fontSize: '12px',
    },
    noteAmountContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px',
    },
    note: {
      width: '57%',
      border: '1px solid #000',
      hyphenationCallback: null, // Prevents hyphenation
      wordBreak: 'break-word', // Ensures words break naturally
      padding: '5px',
    },
    amountContainer: {
      width: '40%',
    },
    amountTable: {
      display: 'table',
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '5px',
    },
    amountTableRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      border: '1px solid #000',
    },
    amountTableHeader: {
      flex: 1,
      textAlign: 'left',
      padding: '8px',
      fontWeight: 'bold',
      backgroundColor: '#1da1f2',
      fontSize: '12px',
      color: '#fff',
    },
    amountTableCell: {
      flex: 1,
      textAlign: 'right',
      padding: '8px',
      fontSize: '12px',
    },
    instructions: {
      marginBottom: '5px',
      maxWidth: '57%',
      border: ' 1px solid #000',
      hyphenationCallback: null, // Prevents hyphenation
      wordBreak: 'break-word', // Ensures words break naturally
    },
    instructionsList: {
      margin: 0,
      paddingLeft: '10px',
      listStyleType: 'disc',
    },
    instructionsListItem: {
      fontSize: '12px',
      lineHeight: 1.5, // Consistent line height
      marginBottom: '5px',
    },
    invoiceFooterContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    invoiceFooter: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    signatureContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    signature: {
      width: '100px',
      position: 'relative',
      left: '25%',
    },
    stamp: {
      width: '50px',
    },
    rightText : {
      marginBottom: '5px',
      fontSize: '10px',
    },
    tableRows : {
      display : 'flex',
      flexDirection: 'row',
      width: "100%",
    },
    tableHeaders: {
      flex: '1',
      border: '1px solid #000',
      padding: '5px',
      textAlign: 'left',
      fontWeight: 'bold',
      backgroundColor: '#1da1f2',
      fontSize: '12px',
      color: '#fff',
    },
    tableCells: {
      flex: '1',
      border: '1px solid #000',
      padding: '5px',
      textAlign: 'left',
      fontSize: '12px',
    },
    noticeContainer: {
      padding: '10px',
      backgroundColor: '#f9f9f9',
      borderLeftWidth: '5px',
      borderLeftColor: '#1da1f2',
    },
    noticeText: {
      fontSize: '10px',
      color: '#333',
      textAlign: 'justify',
      lineHeight: '1.5',
      fontWeight: '600',
    },

    /* new table layout header top cell bottom */
    table: {
      borderWidth: 1,
      borderColor: '#000',
      marginTop:10 ,
      marginBottom:10 ,
    },
    row: {
      flexDirection: 'row', // This displays cells horizontally
    },
    cell: {
      flex: 1, // Each cell takes equal horizontal space
      borderRightWidth: 1,
      borderColor: '#000',
      textAlign: 'center',
      fontSize: '12px',
      padding: '5px',
    },
    headerCell: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: '12px',
      backgroundColor: '#1da1f2',
      padding: '5px',
    },

  });
  function formatStringWithNumber(input) {
    // Convert the input to a string (handles numbers or other types)
    const str = input != null ? input.toString() : "";
    return str.replace(/\d+/g, (match) => Number(match).toLocaleString());
  }

  const calculatePageHeight = (invoiceData) => {
    // Base A4 height (842 points for 11.69 inches)
    let baseHeight = 842; 
    // Add extra space based on content conditions
    if (invoiceData.depositPurpose === 'order vehicle') baseHeight += 20;
    if (invoiceData.bankNote) baseHeight += 10;
    return baseHeight;
  };



  const MyPdfDocument = ({ invoiceData }) => { 
    const invoiceNumber = invoiceData.invoiceNumber;
    const formattedInvoiceNumber = invoiceNumber.replace(/(\b\w+\b)-\1-/, "$1-");
    //console.log(formattedInvoiceNumber);
    return (
    <Document>
      <Page 
        style={styles.invoiceContainer}
        wrap={false}
    
      >
        <View style={styles.invoiceHeader}>
          <View style={styles.headerFullWidth}>
            <Text style={styles.headerFullWidthText}>{invoiceData.serialNumber}</Text>
          </View>
          <View style={styles.headers}>
            <View style={styles.headerLeft}>
              <Image style={styles.logo} src={`${process.env.PUBLIC_URL}/images/Signatureforemail.png`} />
              <View style={styles.contactInfo}>
                <Text style={styles.description}>
                  An online platform for the sale and export of used vehicles and auto parts
                </Text>
                <Text style={styles.headerText}>Registered in Japan | under the Yokohama Legal Affairs Bureau</Text>
                <Text style={styles.iconParagraph}>
                  <Text style={styles.icon}><FaEnvelope /></Text>
                  <Text>Email: contact@artisbay.com</Text>
                </Text>
                <Text style={styles.iconParagraph}>
                  <Text style={styles.icon}><FaGlobe /></Text>
                  <Text>Website: www.artisbay.com</Text>
                </Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.companyName}>Artisbay Inc</Text>
              <Text style={styles.rightText}><Text style={{ fontWeight: 'bold' }}>Date:</Text> {invoiceData.invoiceDate}</Text>
              <Text style={styles.rightText}><Text style={{ fontWeight: 'bold' }}>Invoice Number:</Text> {formattedInvoiceNumber}</Text>
              <Text style={styles.rightText}><Text style={{ fontWeight: 'bold' }}>Expiry Date:</Text> {invoiceData.expiryDate}</Text>
              <Text style={styles.rightText}><Text style={{ fontWeight: 'bold' }}>Purpose:</Text> {invoiceData.depositPurpose}</Text>
            </View>
          </View>
        </View>
  
        {/* Title */}
        <Text style={styles.invoiceTitle}>{invoiceData.depositPurpose == 'order vehicle' ? '' : 'Deposit'} Invoice</Text>
  
        {/* Invoice Info */}
        <View style={styles.invoiceInfo}>
          <View style={styles.left}>
            <Text style={styles.contactInfoText}><Text style={{ fontWeight: '600' }}>Full name:</Text> {invoiceData.customerFullName}</Text>
            <Text style={styles.contactInfoText}><Text style={{ fontWeight: '600' }}>Company:</Text> {invoiceData.customerCompany ? invoiceData.customerCompany : 'not specified'}</Text>
            <Text style={styles.contactInfoText}><Text style={{ fontWeight: '600' }}>Address:</Text> {invoiceData.customerAddress}</Text>
            <Text style={styles.contactInfoText}><Text style={{ fontWeight: '600' }}>Phone Number:</Text> {invoiceData.customerPhone}</Text>
            <Text style={styles.contactInfoText}><Text style={{ fontWeight: '600' }}>Email:</Text> {invoiceData.customerEmail}</Text>
          </View>
          <View style={styles.right}>
            <Image style={styles.rightImage} src={`${process.env.PUBLIC_URL}/images/qr.jpeg`} />
          </View>
        </View>
  
        <View style={styles.invoiceBankInfo}>
          {invoiceData.depositCurrency === "USD" ? (
            <>
              <Text style={styles.contactInfoText}>
                <Text style={{ fontWeight: 'bold' }}>Beneficiary Name:</Text> {invoiceData.beneficiaryName}
              </Text>
              <Text style={styles.contactInfoText}>
                <Text style={{ fontWeight: 'bold' }}>Bank Name:</Text> {invoiceData.bankName}
              </Text>
              <Text style={styles.contactInfoText}>
                <Text style={{ fontWeight: 'bold' }}>Branch Name:</Text> {invoiceData.branchName}
              </Text>
              <Text style={styles.contactInfoText}>
                <Text style={{ fontWeight: 'bold' }}>Bank Address:</Text> {invoiceData.bankAddress}
              </Text>
              <Text style={styles.contactInfoText}>
                <Text style={{ fontWeight: 'bold' }}>Swift Code:</Text> {invoiceData.swiftCode}
              </Text>
              <Text style={styles.contactInfoText}>
                <Text style={{ fontWeight: 'bold' }}>Account Number:</Text> {invoiceData.accountNumber}
              </Text>
              <Text style={styles.contactInfoText}>
                <Text style={{ fontWeight: 'bold' }}>Beneficiary Address:</Text> {invoiceData.beneficiaryAddress}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.contactInfoText}>
                <Text style={{ fontWeight: 'bold' }}>Beneficiary Name:</Text> {invoiceData.beneficiaryName}
              </Text>
              <Text style={styles.contactInfoText}>
                <Text style={{ fontWeight: 'bold' }}>IBAN:</Text> {invoiceData.iban}
              </Text>
              <Text style={styles.contactInfoText}>
                <Text style={{ fontWeight: 'bold' }}>SWIFT/BIC:</Text> {invoiceData['swift/bic']}
              </Text>
              <Text 
                style={[
                  styles.contactInfoText, 
                  { maxWidth: invoiceData.depositCurrency !== 'USD' ? '65%' : '' }
                ]}
              >
                <Text style={{ fontWeight: 'bold' }}>Bank Name and Address:</Text> {invoiceData['bank name and address']}
              </Text>

            </>
          )}
        </View>

  
        {/* Important Section */}
        <View style={styles.important}>
          <View style={styles.notice}>
            <Text>Important</Text>
          </View>
          <View style={styles.invoiceNumber}>
            <Text>Invoice number: {formattedInvoiceNumber}</Text>
          </View>
          <View style={styles.warning}>
            <Text><Text style={styles.red}>Be careful</Text>, avoid being scammed! Confirm our correct bank account before you send your money!</Text>
          </View>
        </View>
  
        {/* Description Table */}
        <View style={styles.itemsTable}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Payment Description</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{invoiceData.depositDescription}</Text>
          </View>
        </View>

   

        {
          invoiceData.depositPurpose === 'order vehicle' && (
            <View style={styles.table}>
            {/* Header Row */}
            <View style={styles.row}>
              <Text style={[styles.cell, styles.headerCell]}>Make</Text>
              <Text style={[styles.cell, styles.headerCell]}>Model</Text>
              <Text style={[styles.cell, styles.headerCell]}>Engine Capacity</Text>
              <Text style={[styles.cell, styles.headerCell]}>Mileage</Text>
              <Text style={[styles.cell, styles.headerCell]}>Chassis Number</Text>
            </View>
            {/* Data Row */}
            <View style={styles.row}>
              <Text style={styles.cell}>{invoiceData.make}</Text>
              <Text style={styles.cell}>{invoiceData.model}</Text>
              <Text style={styles.cell}>
                {invoiceData.engineCapacity || 'not specified'} cc
              </Text>
              <Text style={styles.cell}>
               odo  {invoiceData.mileage || 'not specified'} km
              </Text>
              <Text style={styles.cell}>
                {invoiceData.chasisNumber || 'not specified'}
              </Text>
            </View>
          </View>
         
          )
        
        }
  
   
  
        {/* Note and Amount Section */}
        <View style={[
            styles.noteAmountContainer,
        ]}>
            {invoiceData.bankNote ? (
                <View style={styles.note}>
                    <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Note (By the Remitter):</Text></Text>
                    <Text style={styles.contactInfoText}>{invoiceData.bankNote}</Text>
                </View>
            ) : (
                <View style={styles.instructions}>
                    <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Instructions:</Text></Text>
                    <View style={styles.instructionsList}>
                        <Text style={styles.instructionsListItem}>•Please ensure all transfer fees are covered by the sender to avoid any shortfall.</Text>
                        <Text style={styles.instructionsListItem}>•Include the invoice number in the payment reference for accurate processing.</Text>
                        <Text style={styles.instructionsListItem}>•Funds will be applied upon receipt in full.Kindly notify us once the payment is completed.</Text>
                        <Text style={styles.instructionsListItem}>•Please note that our bank is located in Japan and</Text>
                        <Text style={styles.instructionsListItem}>international transfers may take 3-5 business days to reflect.</Text>
                    </View>
                </View>
            )}
            <View style={styles.amountContainer}>
                <View style={styles.amountTable}>
                    {/* Deposit Amount Row */}
                    <View style={styles.amountTableRow}>
                        <Text style={styles.amountTableHeader}>Deposit amount</Text>
                        <Text style={styles.amountTableCell}>{invoiceData.depositAmount.toLocaleString()} {invoiceData.depositCurrency}</Text>
                    </View>
                    {/* Grand Total Row */}
                    <View style={styles.amountTableRow}>
                        <Text style={styles.amountTableHeader}>Grand Total</Text>
                        <Text style={styles.amountTableCell}>{invoiceData.depositAmount.toLocaleString()} {invoiceData.depositCurrency}</Text>
                    </View>
                </View>
            </View>
        </View>
  
        {/* Footer Section */}
        <View style={[
            styles.invoiceFooterContainer,
            !invoiceData.bankNote && styles.footerRowContainer // Apply row layout when instructions are in place of the note
        ]}>
            {/* Render instructions in the footer only if bankNote is present */}
            {invoiceData.bankNote && (
                <View style={styles.instructions}>
                    <Text style={styles.contactInfoText}><Text style={{ fontWeight: 'bold' }}>Instructions:</Text></Text>
                    <View style={styles.instructionsList}>
                        <Text style={styles.instructionsListItem}>•Please ensure all transfer fees are covered by the sender to avoid any shortfall.</Text>
                        <Text style={styles.instructionsListItem}>•Include the invoice number in the payment reference for accurate processing.</Text>
                        <Text style={styles.instructionsListItem}>•Funds will be applied upon receipt in full.Kindly notify us once the payment is completed.</Text>
                        <Text style={styles.instructionsListItem}>•Please note that our bank is located in Japan and</Text>
                        <Text style={styles.instructionsListItem}>international transfers may take 3-5 business days to reflect.</Text>
                    </View>
                </View>
            )}
            <View style={[!invoiceData.bankNote && styles.invoiceFooterContainer]}>

               {/* Notice Container */}
                {!invoiceData.bankNote && (
                    <View
                    style={[
                      styles.noticeContainer,
                      !invoiceData.bankNote ? { maxWidth: '57%' } : {} // Conditional style
                    ]}
                  >
                    <Text style={styles.noticeText}>
                      This invoice is intended solely for legal and official purposes. Any unauthorized use, modification, or misrepresentation of its content is strictly prohibited and may result in legal action.
                    </Text>
                  </View>
                )}
                <View
                  style={[
                    styles.invoiceFooter,
                  ]}
>
                  <Text style={styles.contactInfoText}>Authorised Sales Signature</Text>
                  <View style={styles.signatureContainer}>
                      <Image style={styles.signature} src={`${process.env.PUBLIC_URL}/images/absignature.png`} />
                      <Image style={styles.stamp} src={`${process.env.PUBLIC_URL}/images/abstamp.png`} />
                  </View>
                  <Text style={styles.contactInfoText}>Thank you for your business!</Text>
                </View>
                
            </View>
  
           
        </View>
  
        {/* Render noticeContainer below the footer if bankNote is present */}
        {invoiceData.bankNote && (
            <View style={styles.noticeContainer}>
                <Text style={styles.noticeText}>
                    This invoice is intended solely for legal and official purposes. Any unauthorized use, modification, or misrepresentation of its content is strictly prohibited and may result in legal action.
                </Text>
            </View>
        )}
      </Page>
      <Page wrap={false}>
        <SalesAgreementPDF />
      </Page>
      

    </Document>
  );
}

// Function to generate the PDF as a Blob
export const generatePdfBlob = async (invoiceData) => {
  const blob = await pdf(<MyPdfDocument invoiceData={invoiceData} />).toBlob();
  return blob;
};


// Function to generate and save the PDF
const GeneratePdfButton = ({ invoiceData }) => {
  const handleGeneratePdf = async () => {
    const blob = await pdf(<MyPdfDocument invoiceData={invoiceData} />).toBlob();
    saveAs(blob, `invoice-${invoiceData.invoiceNumber.replace(/(\b\w+\b)-\1-/, "$1-")}.pdf`);
  };

  return (
    <button onClick={handleGeneratePdf}>Generate PDF</button>
  );
};

export default GeneratePdfButton;