import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf' },
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 700 }
  ]
});

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Roboto',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 7,
    marginBottom: 5,
    borderBottom: '1 solid #000',
    paddingBottom: 5,
  },
  listItemContainer: {
    marginBottom: 5,
    width: '80%',
    marginHorizontal: 'auto',
  },
  listItemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    width: '100%',
  },
  paragraphContainer: {
    width: '100%',
    maxWidth: 500,
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1.6,
    marginBottom: 10,
    textAlign: 'justify',
  },
  listItemText:{
    paddingLeft: 5,
    marginLeft: 5,
    fontSize: 12,
    textAlign: 'justify',
    marginBottom: 10,
    lineHeight: 1.6,
  }
  
});

const SalesAgreementPDF = () => (

      <View style={styles.container}>
        <Text style={styles.title}>Purchase Agreement</Text>
        <Text style={styles.sectionHeader}>Terms and Conditions</Text>

        {/* List Items */}
        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>1. Roll-on Roll-off (RORO) Shipping</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              The primary method of shipment is RORO unless otherwise specified.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>2. Inspection and Payment Contingency</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              If the Buyer is unable to complete the balance payment due to unforeseen circumstances 
              (e.g., health issues or demise), a nominated representative may settle the balance, 
              subject to proper documentation and approval by Artisbay Inc.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>3. Shipment Arrangements</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Upon confirmation of payment, Artisbay Inc. will arrange for shipment.
            </Text>
            <Text style={styles.paragraph}>
              Shipping schedules, routes, and arrival times are subject to change without prior notice.
            </Text>
            <Text style={styles.paragraph}>
              Artisbay Inc. is not liable for delays or losses caused by external factors, including 
              natural disasters, government actions, or shipping company policies.
            </Text>
          </View>
        </View>

        {/* Continue with remaining items */}

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>4. Container Shipping</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Units may also be shipped in containers, depending on the port and destination country.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>5. Copyright and Trademark Protection</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              All materials, including website content and documentation, are the exclusive property of Artisbay Inc.
            </Text>
            <Text style={styles.paragraph}>
              Unauthorized use, reproduction, or modification is prohibited.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>6. Claims and Liability</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Claims related to mechanical issues must be supported by evidence 
              (e.g., photos, videos, or port inspection reports).
            </Text>
            <Text style={styles.paragraph}>
              Artisbay Inc. will respond to valid claims within 21 business days of submission.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>7. Time Limit for Claims</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Claims must be submitted within 5 business days of collecting the unit(s). 
              Late claims will not be accepted.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>8. Internet Services</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Artisbay Inc. is not responsible for any delays caused by internet service 
              interruptions or failures.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>9. Loss or Damage During Shipment</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Artisbay Inc. is not liable for any damage, theft, or loss of items during transportation.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>10. Clearing and Forwarding Services</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Artisbay Inc. may provide introductions to clearing and forwarding agents upon request, 
              but it does not undertake responsibility for these services.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>11. Invoices</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Payments for purchases must be made via telegraphic transfer (T/T) to the official 
              Artisbay Inc. bank account.
            </Text>
            <Text style={styles.paragraph}>
              Customers should verify account details with their designated sales representative 
              to avoid fraud.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>12. Partial Payments and Balance Due</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Outstanding balances must be cleared within 15 calendar days of the vessel's departure.
            </Text>
            <Text style={styles.paragraph}>
              Failure to pay the balance may result in the resale of the unit(s) without notice. 
              Partial payments will not be refunded but will be retained as a cancellation fee.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>13. Fees and Additional Costs</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              The Buyer is responsible for any fees, such as demurrage, consignee name amendments, 
              or local handling charges.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>14. Severability</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              If any provision of this agreement is deemed invalid, the remaining terms shall remain in effect.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>15. Governing Law</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Any disputes arising from this agreement are subject to the laws and jurisdiction of Japan.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>16. Indemnity</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              The Buyer agrees to indemnify Artisbay Inc. against any claims resulting from 
              non-compliance with local regulations or third-party agreements.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>17. Validity of Agreement</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              This agreement remains valid until the completion of the transaction, including full payment.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>18. Amendments</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Artisbay Inc. reserves the right to amend these terms as necessary. 
              Buyers will be bound by the revised terms once implemented.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>19. Import Regulations and Tariffs</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>
              Artisbay Inc. is not responsible for any issues or fees arising from 
              import tariffs or regulations.
            </Text>
          </View>
        </View>

        <View style={styles.listItemContainer}>
          <Text style={styles.listItemTitle}>Notice for Vehicle Pickup:</Text>
          <View style={styles.paragraphContainer}>
            <Text style={styles.listItemTitle}>
              Upon receiving the unit(s) at the port of arrival:
            </Text>
            <Text style={styles.listItemText}>•The customer must refill oil, fuel, and radiator coolant as these are not included.</Text>
            <Text style={styles.listItemTitle}>Due to long-distance shipping, it may also be necessary to:</Text>
            <Text style={styles.listItemText}>•Recharge the car battery.</Text>
            <Text style={styles.listItemText}>•Adjust tire air pressure.</Text>
          </View>
        </View>

      </View>
   
);

export default SalesAgreementPDF;