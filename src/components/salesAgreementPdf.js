import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register the Roboto font
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf' },
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 700, lineHeight: 1.2 }
  ]
});

// Create styles for the PDF document
const styles = StyleSheet.create({
  container: {
    fontFamily: 'Roboto',
    padding: 20,
    width: '100%',  // Add this
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 1.2,  // Add line height
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,  // Reduced from 25
    borderBottom: '1 solid #000',
    paddingBottom: 5,
    lineHeight: 1.3,  // Add this
    width: '100%',    // Add this
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1.6,  // Keep this but ensure parent width
    marginTop: 10,    // Reduced from 15
    marginBottom: 12, // Adjusted
    width: '100%',    // Changed from 200px
    paddingHorizontal: 15,  // Add this
  },
  listItem: {
    fontSize: 12,
    marginLeft: 15,
    marginBottom: 8,  // Reduced from 10
    width: '100%',    // Changed from 200px
    lineHeight: 1.6,  // Add this
  },
  subListItem: {
    fontSize: 12,
    marginLeft: 25,
    marginBottom: 6,  // Reduced from 10
    width: '100%',    // Changed from 200px
    lineHeight: 1.6,  // Add this
  },
});

// Create the SalesAgreementPDF document on a single page
const SalesAgreementPDF = () => (

  <View wrap={false}>
        <Text style={styles.title}>Purchase Agreement</Text>
        <Text style={styles.paragraph}>This agreement is entered into by:</Text>
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>Artisbay Inc.</Text>, referred to as the “Seller.”
          </Text>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>Customer</Text>, referred to as the “Buyer.”
          </Text>
        </View>

        <Text style={styles.sectionHeader}>Notice for Vehicle Pickup</Text>
        <Text style={styles.paragraph}>
          Upon receiving the unit(s) at the port of arrival:
        </Text>
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            • The customer must refill oil, fuel, and radiator coolant as these are not included.
          </Text>
          <Text style={styles.listItem}>
            • Due to long-distance shipping, it may also be necessary to:
          </Text>
          <View style={styles.paragraph}>
            <Text style={styles.subListItem}>– Recharge the car battery.</Text>
            <Text style={styles.subListItem}>– Adjust tire air pressure.</Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Terms and Conditions</Text>

        {/* 1. Roll-on Roll-off (RORO) Shipping */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>1. Roll-on Roll-off (RORO) Shipping:</Text> The primary method of shipment is RORO unless otherwise specified.
          </Text>
        </View>

        {/* 2. Inspection and Payment Contingency */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>2. Inspection and Payment Contingency:</Text> If the Buyer is unable to complete the balance payment due to unforeseen circumstances (e.g., health issues or demise), a nominated representative may settle the balance, subject to proper documentation and approval by Artisbay Inc.
          </Text>
        </View>

        {/* 3. Shipment Arrangements */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>3. Shipment Arrangements:</Text> Upon confirmation of payment, Artisbay Inc. will arrange for shipment. Shipping schedules, routes, and arrival times are subject to change without prior notice. Artisbay Inc. is not liable for delays or losses caused by external factors.
          </Text>
        </View>

        {/* 4. Container Shipping */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>4. Container Shipping:</Text> Units may also be shipped in containers, depending on the port and destination country.
          </Text>
        </View>

        {/* 5. Copyright and Trademark Protection */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>5. Copyright and Trademark Protection:</Text> All materials, including website content and documentation, are the exclusive property of Artisbay Inc. Unauthorized use, reproduction, or modification is prohibited.
          </Text>
        </View>

        {/* 6. Claims and Liability */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>6. Claims and Liability:</Text> Claims related to mechanical issues must be supported by evidence (e.g., photos, videos, or port inspection reports). Artisbay Inc. will respond to valid claims within 21 business days.
          </Text>
        </View>

        {/* 7. Time Limit for Claims */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>7. Time Limit for Claims:</Text> Claims must be submitted within 5 business days of collecting the unit(s). Late claims will not be accepted.
          </Text>
        </View>

        {/* 8. Internet Services */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>8. Internet Services:</Text> Artisbay Inc. is not responsible for any delays caused by internet service interruptions or failures.
          </Text>
        </View>

        {/* 9. Loss or Damage During Shipment */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>9. Loss or Damage During Shipment:</Text> Artisbay Inc. is not liable for any damage, theft, or loss of items during transportation.
          </Text>
        </View>

        {/* 10. Clearing and Forwarding Services */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>10. Clearing and Forwarding Services:</Text> Artisbay Inc. may introduce clearing and forwarding agents upon request but does not undertake responsibility for these services.
          </Text>
        </View>

        {/* 11. Invoices */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>11. Invoices:</Text> Payments for purchases must be made via telegraphic transfer (T/T) to the official bank account. Customers should verify account details with their sales representative.
          </Text>
        </View>

        {/* 12. Partial Payments and Balance Due */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>12. Partial Payments and Balance Due:</Text> Outstanding balances must be cleared within 15 calendar days of the vessel's departure. Failure to pay may result in resale of the unit(s) without notice. Partial payments will be retained as a cancellation fee.
          </Text>
        </View>

        {/* 13. Fees and Additional Costs */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>13. Fees and Additional Costs:</Text> The Buyer is responsible for any fees, such as demurrage, consignee name amendments, or local handling charges.
          </Text>
        </View>

        {/* 14. Severability */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>14. Severability:</Text> If any provision of this agreement is deemed invalid, the remaining terms shall remain in effect.
          </Text>
        </View>

        {/* 15. Governing Law */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>15. Governing Law:</Text> Any disputes arising from this agreement are subject to the laws and jurisdiction of Japan.
          </Text>
        </View>

        {/* 16. Indemnity */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>16. Indemnity:</Text> The Buyer agrees to indemnify Artisbay Inc. against any claims resulting from non-compliance with local regulations or third-party agreements.
          </Text>
        </View>

        {/* 17. Validity of Agreement */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>17. Validity of Agreement:</Text> This agreement remains valid until the completion of the transaction, including full payment.
          </Text>
        </View>

        {/* 18. Amendments */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>18. Amendments:</Text> Artisbay Inc. reserves the right to amend these terms as necessary. Buyers will be bound by the revised terms once implemented.
          </Text>
        </View>

        {/* 19. Import Regulations and Tariffs */}
        <View style={styles.paragraph}>
          <Text style={styles.listItem}>
            <Text style={{ fontWeight: 'bold' }}>19. Import Regulations and Tariffs:</Text> Artisbay Inc. is not responsible for any issues or fees arising from import tariffs or regulations.
          </Text>
        </View>
      </View>
   
);

export default SalesAgreementPDF;
