// Invoice.js
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { object, string } from "prop-types";

import { QRCodeCanvas } from "qrcode.react";
import QRCode from "qrcode.react"; // Import QRCode component

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
  main: { padding: "20px", position: "relative" },
  head: {
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
  },

  headLeft: {
    width: "50%",
    fontSize: "20px",
    fontWeight: "400",
  },
  headRight: { width: "25%", textAlign: "right" },

  billAndPay: {
    display: "flex",
    marginTop: "50px",
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  bill: {
    width: "50%",
  },
  tableHead: {
    display: "flex",
    marginTop: "50px",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rowOne: {
    width: "40%",
  },
  rowTwo: {
    width: "20%",
  },

  tableRow: {
    display: "flex",
    textAlign: "left",
    marginTop: "10px",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  totalSubTotalTax: {
    width: "100%",
    paddingHorizontal: "20px",
    position: "absolute",
    bottom: "10px",
  },
  subtotalAndTax: {
    display: "flex",
    borderBottom: "1px solid black",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  total: {
    display: "flex",
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px",
  },
});

const InvoicePDF = ({ invoice }) => (
  // console.log(invoiceData)
  <Document>
    <Page size="A4" style={styles.page}>
      {/* main view layout  */}
      <View style={styles.main}>
        {/* head information */}
        <View style={styles.head}>
          {/* head information left */}
          <View style={styles.headLeft}>
            <Text>Invoice</Text>
            <Text>{invoice?.issue_date}</Text>
            <Text>{invoice?.invoice_no}</Text>
          </View>

          {/* head information right */}

          <View style={styles?.headRight}>
            <Image
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                <QRCode value={"sdf"} size={100} />
              )}`}
            />
            {/* <QRCodeCanvas value="hello" size={100}></QRCodeCanvas> */}
            {/* <QRCodeCanvas
              size={70}
              imageSettings={{
                src: "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png",
                width: 25,
                height: 25,
              }}
              value={"d"}
            /> */}
          </View>

          {/* head information right */}
          <View style={styles?.headRight}>
            <Text>Z-TECH</Text>
          </View>
        </View>

       
        <View style={styles?.billAndPay}>
          {/* bill Address  */}
          <View style={styles?.bill}>
            <Text>Bill From</Text>
            <Text>Z-Eight-Tech</Text>
            <Text>Buhaddarhat , Chittagong</Text>
          </View>

          {/* pay Address  */}
          <View style={styles?.bill}>
            <Text>Bill To</Text>
            <Text>{invoice?.customer?.name}</Text>
            <Text>{invoice?.customer?.address}</Text>
          </View>
        </View>

        {/* added product table view layout */}
        <View>
          {/* table head View layout */}
          <View style={styles?.tableHead}>
            <Text style={styles?.rowOne}>Item name</Text>
            <Text style={styles?.rowTwo}>Price</Text>
            <Text style={styles?.rowTwo}>Qty</Text>
            <Text style={styles?.rowTwo}>Total Price</Text>
          </View>

          {/* table row View layout-------you can call map function here */}
          {invoice?.saleitems &&
            invoice?.saleitems?.map((item) => (
              <View key={item?.id} style={styles.tableRow}>
                <Text style={styles.rowOne}>{item?.name}</Text>
                <Text style={styles.rowTwo}>{item?.rate}</Text>
                <Text style={styles.rowTwo}>{item?.quantity}</Text>
                <Text style={styles.rowTwo}>{item.rate * parseInt(item?.quantity)}</Text>
              </View>
            ))}
        </View>

        {/* total ,subtotal , tax view layout */}
        <View style={styles.totalSubTotalTax}>
          {/* subtotal */}
          <View style={styles.subtotalAndTax}>
            <Text>SubTotal</Text>
            <Text>25000</Text>
          </View>
          {/* tax */}
          <View style={styles.subtotalAndTax}>
            <Text>Tax</Text>
            <Text>20</Text>
          </View>
          {/* total */}
          <View style={styles.total}>
            <Text>Total</Text>
            <Text>250100</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

InvoicePDF.propTypes = {
  invoice: object,
};

export default InvoicePDF;
