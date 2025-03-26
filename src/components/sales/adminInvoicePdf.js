import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 20,
    lineHeight: 1.4,
  },
  // Title row (Company name left, Invoice Title right)
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  invoiceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  // Grouping boxes
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoBox: {
    width: '49%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  infoBoxHeader: {
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 4,
    padding: 2,
  },
  labelText: {
    fontWeight: 'bold',
  },
  // Red notice section
  redNoticeContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  redNoticeHeader: {
    backgroundColor: '#FF0000',
    color: '#fff',
    padding: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  redNoticeBody: {
    padding: 4,
    textAlign: 'center',
    fontSize: 10,
  },
  // Bank info table
  bankTable: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
  },
  bankTableRow: {
    flexDirection: 'row',
  },
  bankTableColHeader: {
    width: '30%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
    padding: 3,
    fontWeight: 'bold',
  },
  bankTableCol: {
    width: '70%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 3,
  },
});

const AdminInvoicePdf = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Top Row: Company Info + Invoice Title */}
      <View style={styles.titleRow}>
        <Text style={styles.companyInfo}>Autocom Japan Inc.</Text>
        <Text style={styles.invoiceTitle}>INVOICE / SALES CONTRACT</Text>
      </View>

      <Text>Address: 2-14 DAIDO SEIMEI YOKOHAMA BUILDING 6F, HONCHO, NAKA-KU, YOKOHAMA, KANAGAWA, JAPAN</Text>
      <Text>Tel: +81-45-227-7095 | Fax: +81-45-227-7093</Text>
      <Text style={{ marginBottom: 10 }}>Invoice No: S5-964857-364996 | Date: 24 March 2025</Text>

      {/* Customer and Consignee Boxes */}
      <View style={styles.infoRow}>
        {/* Customer Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxHeader}>CUSTOMER</Text>
          <Text>
            <Text style={styles.labelText}>Name: </Text>
            [Customer Name]
          </Text>
          <Text>
            <Text style={styles.labelText}>Address: </Text>
            [Customer Address]
          </Text>
          <Text>
            <Text style={styles.labelText}>Phone: </Text>
            [Customer Phone]
          </Text>
          <Text>
            <Text style={styles.labelText}>Email: </Text>
            [Customer Email]
          </Text>
        </View>

        {/* Consignee Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxHeader}>CONSIGNEE</Text>
          <Text>
            <Text style={styles.labelText}>Name: </Text>
            [Consignee Name]
          </Text>
          <Text>
            <Text style={styles.labelText}>Address: </Text>
            [Consignee Address]
          </Text>
          <Text>
            <Text style={styles.labelText}>Phone: </Text>
            [Consignee Phone]
          </Text>
          <Text>
            <Text style={styles.labelText}>Email: </Text>
            [Consignee Email]
          </Text>
        </View>
      </View>

      {/* Bill To and Notify Parties Boxes */}
      <View style={styles.infoRow}>
        {/* Bill To Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxHeader}>BILL TO</Text>
          <Text>
            <Text style={styles.labelText}>Name: </Text>
            [Bill To Name]
          </Text>
          <Text>
            <Text style={styles.labelText}>Address: </Text>
            [Bill To Address]
          </Text>
          <Text>
            <Text style={styles.labelText}>Phone: </Text>
            [Bill To Phone]
          </Text>
          <Text>
            <Text style={styles.labelText}>Email: </Text>
            [Bill To Email]
          </Text>
        </View>

        {/* Notify Parties Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxHeader}>NOTIFY PARTIES</Text>
          <Text>
            <Text style={styles.labelText}>Name: </Text>
            [Notify Name]
          </Text>
          <Text>
            <Text style={styles.labelText}>Address: </Text>
            [Notify Address]
          </Text>
          <Text>
            <Text style={styles.labelText}>Phone: </Text>
            [Notify Phone]
          </Text>
          <Text>
            <Text style={styles.labelText}>Email: </Text>
            [Notify Email]
          </Text>
        </View>
      </View>

      {/* Additional Info (Importer, Ship Name, etc.) */}
      <View style={styles.infoBox} wrap={false}>
        <Text style={styles.infoBoxHeader}>IMPORTER - IF OTHER THAN CONSIGNEE</Text>
        <Text>[Importer Name / Address / Phone / Email]</Text>
        <Text style={{ marginTop: 6 }}>
          <Text style={styles.labelText}>SHIP NAME / OCEAN VESSEL: </Text>
          [Ship Name]
        </Text>
        <Text>
          <Text style={styles.labelText}>BOOKING REF: </Text>
          [Booking Reference]
        </Text>
        <Text>
          <Text style={styles.labelText}>PORT OF LOADING: </Text>
          [Port of Loading]
        </Text>
        <Text>
          <Text style={styles.labelText}>PORT OF DISCHARGE: </Text>
          [Port of Discharge]
        </Text>
      </View>

      {/* Red Notice Box */}
      <View style={styles.redNoticeContainer}>
        <Text style={styles.redNoticeHeader}>IMPORTANT NOTICE</Text>
        <Text style={styles.redNoticeBody}>
          Your invoice number "S5-964857-364996" must be on the TT-slip!
          {'\n'}
          Without your invoice number, shipping will be delayed!!
        </Text>
      </View>

      {/* Bank Info Table */}
      <View style={styles.bankTable}>
        {/* Row 1 */}
        <View style={styles.bankTableRow}>
          <Text style={styles.bankTableColHeader}>Bank Name</Text>
          <Text style={styles.bankTableCol}>The Shizuoka Bank, Ltd.</Text>
        </View>
        {/* Row 2 */}
        <View style={styles.bankTableRow}>
          <Text style={styles.bankTableColHeader}>Bank Address</Text>
          <Text style={styles.bankTableCol}>
            2-19-12 Takashima, Nishi-ku, Yokohama City, JAPAN
          </Text>
        </View>
        {/* Row 3 */}
        <View style={styles.bankTableRow}>
          <Text style={styles.bankTableColHeader}>Swift Code</Text>
          <Text style={styles.bankTableCol}>SHIZJPJT</Text>
        </View>
        {/* Row 4 */}
        <View style={styles.bankTableRow}>
          <Text style={styles.bankTableColHeader}>Account No</Text>
          <Text style={styles.bankTableCol}>511 - 0361606</Text>
        </View>
        {/* Row 5 */}
        <View style={styles.bankTableRow}>
          <Text style={styles.bankTableColHeader}>Beneficiary’s Name</Text>
          <Text style={styles.bankTableCol}>Autocom Japan Inc.</Text>
        </View>
        {/* Row 6 */}
        <View style={styles.bankTableRow}>
          <Text style={styles.bankTableColHeader}>Branch Name</Text>
          <Text style={styles.bankTableCol}>Yokohama Branch</Text>
        </View>
        {/* Row 7 */}
        <View style={styles.bankTableRow}>
          <Text style={styles.bankTableColHeader}>Amount</Text>
          <Text style={styles.bankTableCol}>$2,400</Text>
        </View>
      </View>

      {/* Bank Fee Note */}
      <Text style={{ marginTop: 5, fontSize: 8 }}>
        *Bank charge must be borne by the remitter.
      </Text>

      {/* ... Add invoice table or Terms & Conditions here as needed ... */}
    </Page>
  </Document>
);

export default AdminInvoicePdf;
