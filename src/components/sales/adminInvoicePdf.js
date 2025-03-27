import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 8,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
    color: '#333',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  companyDetails: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  companyAddress: {
    fontSize: 9,
    lineHeight: 1.3,
  },
  invoiceInfoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  invoiceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  invoiceDetails: {
    flexDirection: 'row',
    marginBottom: 1,
    fontSize: 9,
  },
  invoiceLabel: {
    width: 65,
    textAlign: 'right',
    marginRight: 5,
  },
  invoiceValue: {
     width: 110,
     textAlign: 'left',
     fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  // --- Styles for combined address/shipping blocks ---
  addressColumnsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15, // Space after the entire address/shipping section
  },
  addressColumn: {
      width: '50%',
  },
  addressBlock: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    minHeight: 64, // Keep this for consistency within a column
},
  // Style for the dummy padding view
  addressPadding: {
    height: 7, // Approx height of one line in AddressDetail
  },
  addressColumn: {
    width: '50%',
    // Add minHeight to prevent columns from becoming too short if content is removed
  },
  shippingPairBlock: {
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    minHeight: 15,
},
shippingPairItem: {
  width: '50%',
  padding: 3,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
},
shippingPairItemLeft: {
  width: '50%',
  padding: 3,
  borderRightWidth: 1,
  borderRightColor: '#000',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
},
shippingLabelStyle: {
  // width: 80, // Remove fixed width, let flexbox handle it
  lineHeight: 1.3,
  // Ensure the AddressDetail component handles label wrapping correctly if needed
},
 // --- End of new shipping styles ---

   addressBlockTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 9,
  },
   addressRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  addressLabel: {
    width: 45,
  },
  // Specific label style for potentially longer/multi-line shipping labels
  shippingLabelStyle: {
      width: 65, // Wider label
      height: 20, // Allow space for two lines
      lineHeight: 1.3,
  },
  addressColon: {
      width: 10,
      textAlign: 'center',
  },
  addressValue: {
    flex: 1,
  },
  // --- End of address/shipping styles ---

  importantNotice: {
    backgroundColor: 'red',
    color: 'white',
    padding: 8,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 10,
    fontWeight: 'bold',
  },
  importantNumber: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bankInfoContainer: {
     borderWidth: 1,
     borderColor: '#000',
     marginBottom: 15,
  },
  bankHeader: {
      padding: 3,
      fontWeight: 'bold',
      fontSize: 9,
      backgroundColor: '#f2f2f2',
      borderBottomWidth: 1,
      borderBottomColor: '#000'
  },
  bankRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  bankRowLast: {
    flexDirection: 'row',
  },
  bankCellLabel: {
    width: '25%',
    padding: 3,
    borderRightWidth: 1,
    borderRightColor: '#000',
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
   bankCellValuePair: {
     width: '35%',
     padding: 3,
     borderRightWidth: 1,
     borderRightColor: '#000',
   },
   bankCellLabelPair: {
     width: '15%',
     padding: 3,
     borderRightWidth: 1,
     borderRightColor: '#000',
     fontWeight: 'bold',
     backgroundColor: '#f2f2f2',
  },
   bankCellValuePairLast: {
     width: '35%',
     padding: 3,
   },
  noteAndAmountContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 15,
      marginTop: 10,
  },
  noteContainer: {
    backgroundColor: 'red',
    color: 'white',
    padding: 8,
    width: '55%',
  },
  noteText: {
    marginBottom: 2,
    fontSize: 7,
    lineHeight: 1.3,
  },
  noteTitle: {
      fontWeight: 'bold',
      fontSize: 8,
      marginBottom: 4,
  },
  amountAndConfirmationContainer: {
       width: '40%',
       flexDirection: 'column',
       alignItems: 'flex-end',
  },
  amountBox: {
     flexDirection: 'column',
     alignItems: 'flex-end',
     marginBottom: 10,
  },
  amountLabel: {
     fontSize: 9,
     marginBottom: 2,
  },
  amountValueBox: {
     borderWidth: 1,
     borderColor: '#000',
     paddingHorizontal: 15,
     paddingVertical: 4,
     marginBottom: 3,
  },
  amountValue: {
     fontSize: 12,
     fontWeight: 'bold',
  },
  bankChargeText: {
     fontSize: 7,
     color: 'red',
     textAlign: 'right',
  },
  confirmationSection: {
     flexDirection: 'column',
     alignItems: 'center',
     marginTop: 10,
     width: '90%',
     alignSelf: 'center',
  },
  confirmationText: {
     fontSize: 7,
     marginBottom: 15,
     textAlign: 'center',
  },
  signatureArea: {
      borderTopWidth: 0.5,
      borderTopColor: '#555',
      width: 150,
      paddingTop: 2,
      marginTop: 10,
      textAlign: 'center',
  },
  signatureName: {
      fontSize: 8,
      fontWeight: 'bold',
  },
  signatureTitle: {
      fontSize: 7,
  },
  // --- Table Styles Refined ---
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 30,
  },
  tableHeader: {
     backgroundColor: '#f2f2f2',
     borderBottomWidth: 1,
     borderBottomColor: '#000',
     minHeight: 25,
     alignItems: 'center',
  },
  tableColHeader: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    paddingVertical: 3,
    paddingHorizontal: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 7,
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    fontSize: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  colNo: { width: '5%' },
  colRef: { width: '15%' },
  colMaker: { width: '20%' },
  colDesc: { width: '30%' },
  colUnit: { width: '10%', textAlign: 'right', justifyContent: 'center' },
  colFreight: {
      width: '10%',
      textAlign: 'center',
      justifyContent: 'center',
  },
  colAmount: { width: '10%', textAlign: 'right', justifyContent: 'center'},

  // --- Footer Totals Refined ---
  footerTotals: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 4,
    justifyContent: 'space-between',
    fontSize: 9,
    alignItems: 'center',
  },
   footerLeft: {
     flexDirection: 'row',
     width: '30%',
     justifyContent: 'space-between',
     alignItems: 'center',
   },
   footerRight: {
     flexDirection: 'row',
     width: '55%',
     justifyContent: 'flex-end',
     alignItems: 'center',
   },
    totalLabel: {
     fontWeight: 'bold',
   },
   totalValue: {
     fontWeight: 'bold',
     textAlign: 'right',
     minWidth: 50,
   },
   footerItem: {
     fontWeight: 'bold',
     marginHorizontal: 15,
   },
});

// Helper Component for Address Row
const AddressDetail = ({ label, value, labelStyle }) => (
    <View style={styles.addressRow}>
        <Text style={[styles.addressLabel, labelStyle]}>{label}</Text>
        <Text style={styles.addressColon}>:</Text>
        <Text style={styles.addressValue}>{value || ''}</Text>
    </View>
);


// Invoice Component
const AdminInvoicePdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <View style={styles.headerContainer}>
        {/* ... (Header content remains the same) ... */}
         <View style={styles.companyDetails}>
           <Text style={styles.companyName}>Autocom Japan Inc.</Text>
           <Text style={styles.companyAddress}>2-14 DAIDO SEIMEI YOKOHAMA BUILDING 6F</Text>
           <Text style={styles.companyAddress}>HONCHO, NAKA-KU, YOKOHAMA, KANAGAWA JAPAN</Text>
           <Text style={styles.companyAddress}>TEL:+81-45-227-7095 FAX:+81-45-227-7093</Text>
         </View>
         <View style={styles.invoiceInfoContainer}>
           <Text style={styles.invoiceTitle}>INVOICE / SALES CONTRACT</Text>
           <View style={styles.invoiceDetails}>
             <Text style={styles.invoiceLabel}>Invoice No:</Text>
             <Text style={styles.invoiceValue}>S5-964857-364996</Text>
           </View>
           <View style={styles.invoiceDetails}>
             <Text style={styles.invoiceLabel}>Invoice Date:</Text>
             <Text style={styles.invoiceValue}>24 March 2025</Text>
           </View>
         </View>
      </View>

      {/* Customer / Consignee / Importer / Shipping Blocks */}
      <View style={styles.addressColumnsContainer}>
           {/* Left Column */}
           <View style={styles.addressColumn}>
               {/* Customer */}
               <View style={styles.addressBlock}>
                   <Text style={styles.addressBlockTitle}>CUSTOMER</Text>
                   <AddressDetail label="Name" value="Badibanga Belinda" />
                   <AddressDetail label="Address" value="DR-Congo" />
                   <AddressDetail label="Phone" value="243243823893656" />
                   {/* Remove Padding View */}
                   {/* <View style={styles.addressPadding} /> */}
               </View>
               {/* Bill To */}
               <View style={styles.addressBlock}>
                   <Text style={styles.addressBlockTitle}>BILL TO</Text>
                   <AddressDetail label="Name" value="" />
                   <AddressDetail label="Address" value="" />
                   <AddressDetail label="Phone" value="" />
                   {/* Remove Padding View */}
                   {/* <View style={styles.addressPadding} /> */}
               </View>
                    {/* --- Shipping Info Blocks INSIDE Right Column --- */}
               {/* Pair 1: Ship Name / Port of Loading */}
               <View style={styles.shippingPairBlock}>
                   <View style={styles.shippingPairItemLeft}>

                      <Text> <AddressDetail label="SHIP NAME /" value="OCEAN VESSEL" labelStyle={styles.shippingLabelStyle} /></Text>
                   </View>
                   <View style={styles.shippingPairItem}>
                   <Text> <AddressDetail label="PORT OF LOADING" value="" labelStyle={styles.shippingLabelStyle} /> </Text>
                   </View>
               </View>

               {/* Pair 2: Booking Ref / Port of Discharge */}
               <View style={styles.shippingPairBlock}>
                   <View style={styles.shippingPairItemLeft}>
                       <Text><AddressDetail label="BOOKING REF" value="" labelStyle={styles.shippingLabelStyle} /></Text>
                   </View>
                   <View style={styles.shippingPairItem}>
                       <Text><AddressDetail label="PORT OF DISCHARGE" value="DAR ES SALAAM" labelStyle={styles.shippingLabelStyle} /></Text>
                   </View>
               </View>
               {/* --- End Shipping Info Blocks --- */}
           </View>

           {/* Right Column */}
           <View style={styles.addressColumn}>
               {/* Consignee */}
               <View style={styles.addressBlock}>
                   <Text style={styles.addressBlockTitle}>CONSIGNEE</Text>
                   <AddressDetail label="Name" value="" />
                   <AddressDetail label="Address" value="" />
                   <AddressDetail label="Phone" value="" />
                   <AddressDetail label="Email" value="" />
               </View>
               {/* Notify Parties */}
               <View style={styles.addressBlock}>
                   <Text style={styles.addressBlockTitle}>NOTIFY PARTIES</Text>
                   <AddressDetail label="Name" value="" />
                   <AddressDetail label="Address" value="" />
                   <AddressDetail label="Phone" value="" />
                   <AddressDetail label="Email" value="" />
               </View>
               {/* Importer */}
               <View style={styles.addressBlock}>
                   <Text style={styles.addressBlockTitle}>IMPORTER - IF OTHER THAN CONSIGNEE</Text>
                   <AddressDetail label="Name" value="" />
                   <AddressDetail label="Address" value="" />
                   <AddressDetail label="Phone" value="" />
                   <AddressDetail label="Email" value="" />
                  {<View style={styles.addressPadding} />}
               </View>

          

           </View>
           {/* End Right Column */}
       </View>
       {/* End addressColumnsContainer */}
    
      

      {/* Important Notice */}
      <View style={styles.importantNotice}>
        {/* ... (Notice content remains the same) ... */}
         <Text>IMPORTANT NOTICE</Text>
         <Text>Your invoice Number <Text style={styles.importantNumber}>'S5-964857-364996'</Text> must be on the TT-slip!</Text>
         <Text>Without your invoice number, shipping will be delayed!!</Text>
      </View>

      {/* Bank Information */}
       <View style={styles.bankInfoContainer}>
        {/* ... (Bank info content remains the same) ... */}
          <Text style={styles.bankHeader}>BANK INFORMATION</Text>
          <View style={styles.bankRow}>
            <Text style={styles.bankCellLabel}>Bank Name:</Text>
            <Text style={styles.bankCellValuePair}>The Shizuoka Bank, Ltd.</Text>
            <Text style={styles.bankCellLabelPair}>Swift Code:</Text>
            <Text style={styles.bankCellValuePairLast}>SHIZJPJT</Text>
          </View>
          <View style={styles.bankRow}>
            <Text style={styles.bankCellLabel}>Bank Address:</Text>
            <Text style={[styles.bankCellValuePair]}>2-19-12 Takashima, Nishi-ku,Yokohama{"\n"}City, JAPAN</Text>
            <Text style={styles.bankCellLabelPair}>Bank Account No:</Text>
            <Text style={styles.bankCellValuePairLast}>511 - 0361606</Text>
          </View>
          <View style={styles.bankRowLast}>
             <Text style={styles.bankCellLabel}>Beneficiary's Name:</Text>
            <Text style={styles.bankCellValuePair}>Autocom Japan Inc.</Text>
            <Text style={styles.bankCellLabelPair}>Branch Name:</Text>
            <Text style={styles.bankCellValuePairLast}>Yokohama Branch</Text>
          </View>
       </View>

       {/* Note and Amount/Confirmation */}
       <View style={styles.noteAndAmountContainer}>
        {/* ... (Note/Amount/Confirmation content remains the same) ... */}
           <View style={styles.noteContainer}>
             <Text style={styles.noteTitle}>NOTE</Text>
             <Text style={styles.noteText}>1 Please indicate the purpose of money transfer as 'CAR' or 'CAR PAYMENT'.</Text>
             <Text style={styles.noteText}>2 This invoice is valid for 3 business days only from the date herein. The sale is conducted first come, first served basis and secured upon payment proof.</Text>
             <Text style={styles.noteText}>3 Customer needs to pay remaining balance payment within 15 days from shipment date. After 15 days, you will need to surrender a copy of PIN & ID of the consignee of the car.</Text>
             <Text style={styles.noteText}>4 Failure to meet payment terms instructed ( rule 1 above ), Autocom Japan Inc reserves the right to re-sell the car without any notice and no claim will be accepted.</Text>
           </View>
            <View style={styles.amountAndConfirmationContainer}>
                 <View style={styles.amountBox}>
                     <Text style={styles.amountLabel}>Amount:</Text>
                     <View style={styles.amountValueBox}>
                         <Text style={styles.amountValue}>$2,400</Text>
                     </View>
                     <Text style={styles.bankChargeText}>*Bank charge must be beared by remitter</Text>
                 </View>
                 <View style={styles.confirmationSection}>
                     <Text style={styles.confirmationText}>We, Autocom Japan Inc., hereby confirm your purchasing of goods.</Text>
                     <View style={styles.signatureArea}>
                         <Text style={styles.signatureName}>TSUBASA URATA</Text>
                         <Text style={styles.signatureTitle}>AUTOCOM JAPAN INC</Text>
                     </View>
                 </View>
            </View>
       </View>


      {/* Item Details Table */}
      <View style={styles.table}>
        {/* ... (Table content remains the same) ... */}
         {/* Table Header */}
         <View style={[styles.tableRow, styles.tableHeader]}>
           <Text style={[styles.tableColHeader, styles.colNo]}>No.</Text>
           <Text style={[styles.tableColHeader, styles.colRef]}>Ref No.</Text>
           <Text style={[styles.tableColHeader, styles.colMaker]}>Maker / Car name{"\n"}Chassis No</Text>
           <Text style={[styles.tableColHeader, styles.colDesc]}>Description of Goods</Text>
           <Text style={[styles.tableColHeader, styles.colUnit]}>Unit Price</Text>
           <Text style={[styles.tableColHeader, styles.colFreight]}>Freight</Text>
           <Text style={[styles.tableColHeader, styles.colAmount, { borderRightWidth: 0 }]}>Amount</Text>
         </View>
         {/* Table Body */}
         <View style={styles.tableRow}>
           <Text style={[styles.tableCol, styles.colNo]}>1</Text>
           <Text style={[styles.tableCol, styles.colRef]}>R00357951</Text>
           <Text style={[styles.tableCol, styles.colMaker]}>TOYOTA{"\n"}RAUM</Text>
           <Text style={[styles.tableCol, styles.colDesc, {lineHeight: 1.3}]}>R Year: 2003 Color: WHITE Fuel: Gasoline{"\n"}CC: 1490 Door: 5 Seat: 5 Shift: AT</Text>
           <Text style={[styles.tableCol, styles.colUnit]}>$2,400</Text>
           <Text style={[styles.tableCol, styles.colFreight, {lineHeight: 1.3}]}>(Included{"\n"}in{"\n"}unit price)</Text>
           <Text style={[styles.tableCol, styles.colAmount, { borderRightWidth: 0 }]}>$2,400</Text>
         </View>
      </View>

      {/* Footer Totals */}
       <View style={styles.footerTotals}>
        {/* ... (Footer content remains the same) ... */}
            <View style={styles.footerLeft}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>1</Text>
              <Text style={styles.totalLabel}>UNIT(S)</Text>
            </View>
            <View style={styles.footerRight}>
              <Text style={styles.totalLabel}>TOTAL PRICE</Text>
              <Text style={styles.footerItem}>C&F</Text>
              <Text style={styles.footerItem}>USD</Text>
              <Text style={styles.totalValue}>$2,400</Text>
            </View>
       </View>

    </Page>
  </Document>
);

export default AdminInvoicePdf;