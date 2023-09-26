// Invoice.js
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { object } from "prop-types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  akibRex: {
    fontSize: "70px",
  },
});

const InvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page size="A5" style={styles.page}>
      <View style={styles.section}>
        <Text>Invoice Number: {invoiceData.invoiceNumber}</Text>
        <Text>
          Amount <p className="text-2xl">Hello world</p>
        </Text>
        <Text color="red" style={styles.akibRex}>
          Hello world
        </Text>

        {/* Add more data as needed */}
      </View>
    </Page>
  </Document>
);

InvoicePDF.propTypes = {
  invoiceData: object,
};

export default InvoicePDF;
