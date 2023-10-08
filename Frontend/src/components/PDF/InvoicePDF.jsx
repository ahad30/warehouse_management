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
});

const InvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* main view layout  */}
      <View style={{ padding: "20px", position: "relative" }}>
        {/* head information */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "space-between",
            justifyContent: "space-between",
          }}
        >
          {/* head information left */}
          <View style={{ width: "50%" }}>
            <Text style={{ fontSize: "20px", fontWeight: "400" }}>Invoice</Text>
            <Text style={{ fontSize: "20px", fontWeight: "600" }}>
              Date: 14/4/2003
            </Text>
            <Text style={{ fontSize: "20px", fontWeight: "600" }}>
              Invoice #00003
            </Text>
          </View>

          {/* head information right */}

          <View style={{ width: "25%", textAlign: "right" }}>
            {/* <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(<QRCode value={invoiceData} size={100} />)}`} /> */}
            {/* <QRCodeCanvas value="hello" size={100}></QRCodeCanvas> */}
          </View>

          {/* head information right */}
          <View style={{ width: "25%", textAlign: "right" }}>
            <Text>Z-TECH</Text>
          </View>
        </View>

        {/* bill and pay address view layout */}
        <View
          style={{
            display: "flex",
            marginTop: "50px",
            flexDirection: "row",
            alignContent: "space-between",
            justifyContent: "space-between",
          }}
        >
          {/* bill Address  */}
          <View style={{ width: "50%" }}>
            <Text>Bill Two</Text>
            <Text>Ontik Technology</Text>
            <Text>
              House No. 6B, Road No. 32, 1st Floor, Gulshan Ave, Dhaka 1212
            </Text>
          </View>

          {/* pay Address  */}
          <View style={{ width: "50%" }}>
            <Text>Pay To</Text>
            <Text>Team HashCode</Text>
            <Text>
              House No. 6B, Road No. 32, 1st Floor, Gulshan Ave, Dhaka 1212
            </Text>
          </View>
        </View>

        {/* added product table view layout */}
        <View>
          {/* table head View layout */}
          <View
            style={{
              display: "flex",
              marginTop: "50px",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ width: "40%" }}>Item name</Text>
            <Text style={{ width: "20%" }}>Price</Text>
            <Text style={{ width: "20%" }}>Qty</Text>
            <Text style={{ width: "20%" }}>Total Price</Text>
          </View>

          {/* table row View layout-------you can call map function here */}
          <View
            style={{
              display: "flex",
              textAlign: "left",
              marginTop: "10px",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ width: "40%" }}>MackBook pro 14</Text>
            <Text style={{ width: "20%" }}>1000</Text>
            <Text style={{ width: "20%" }}>25</Text>
            <Text style={{ width: "20%" }}>25000</Text>
          </View>
          <View
            style={{
              display: "flex",
              textAlign: "left",
              marginTop: "10px",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ width: "40%" }}>MackBook pro 14</Text>
            <Text style={{ width: "20%" }}>1000</Text>
            <Text style={{ width: "20%" }}>25</Text>
            <Text style={{ width: "20%" }}>25000</Text>
          </View>
          <View
            style={{
              display: "flex",
              textAlign: "left",
              marginTop: "10px",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ width: "40%" }}>MackBook pro 14</Text>
            <Text style={{ width: "20%" }}>1000</Text>
            <Text style={{ width: "20%" }}>25</Text>
            <Text style={{ width: "20%" }}>25000</Text>
          </View>
        </View>

        {/* total ,subtotal , tax view layout */}
        <View
          style={{
            width: "100%",
            paddingHorizontal: "20px",
            position: "absolute",
            bottom: "10px",
          }}
        >
          {/* subtotal */}
          <View
            style={{
              display: "flex",
              borderBottom: "1px solid black",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Text>SubTotal</Text>
            <Text>25000</Text>
          </View>
          {/* tax */}
          <View
            style={{
              display: "flex",
              borderBottom: "1px solid black",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Text>Tax</Text>
            <Text>20</Text>
          </View>
          {/* subtotal */}
          <View
            style={{
              display: "flex",
              fontWeight: "bold",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Text>Total</Text>
            <Text>250100</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

InvoicePDF.propTypes = {
  invoiceData: string,
};

export default InvoicePDF;
