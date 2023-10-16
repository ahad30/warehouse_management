// Invoice.js
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { object } from "prop-types";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: "20px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  main: { padding: "20px", position: "relative" },
  head: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  brImage: {
    width: "70px",
    height: "70px",

    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  headLeft: {
    width: "30%",
    fontSize: "15px",
    fontWeight: "300",
    border: "1px solid red"
  },


  headRight: { width: "30%", textAlign: "right" , border: "1px solid red"},
  headMiddle: {
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: "5px",
    textAlign: "center",
    border: "1px solid red"
  }, 
  headLeftInvoice: {
    fontSize: "25px",
    fontWeight: "bold",
  },
  date: {
    marginVertical: "10px",
  },
  

  billAndPay: {
    display: "flex",
    marginTop: "40px",
    flexDirection: "row",
    alignContent: "space-between",
    justifyContent: "space-between",
  },
  bill: {
    width: "50%",
  },

  billFrom: {
    color: "#5c5c5c",
    fontWeight: "600",
    fontSize: "15px",
  },
  billName: {
    fontWeight: "600",
    fontSize: "18px",
    marginVertical: "10px",
  },
  billAddress: {
    color: "#5c5c5c",
    fontWeight: "light",
    fontSize: "15px",
  },
  tableHead: {
    display: "flex",
    marginTop: "40px",
    padding: "5px",
    border: "2px solid #f3f4f6",

    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: "15px",
    fontWeight: "300",
  },
  rowOne: {
    width: "40%",
    fontSize: "15px",
    fontWeight: "300",
  },
  rowTwo: {
    width: "20%",
    fontSize: "15px",
    fontWeight: "300",
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
    borderBottom: "1px solid #f3f4f6",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px",
    fontSize: "15px",
    fontWeight: "light",
    padding: "5px",
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
            <Text style={styles.headLeftInvoice}>Invoice</Text>
            <Text style={styles?.date}>{`Date: ${invoice?.issue_date}`}</Text>
            <Text>{`Invoice: ${invoice?.invoice_no}`}</Text>
          </View>

          {/* head information right */}

          <View style={styles.headMiddle}>
            <Image
              style={styles.brImage}
              source={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${invoice?.issue_date} at ${invoice?.invoice_no} for ${invoice?.customer?.name}`}
            ></Image>
          </View>

          {/* head information right */}
          <View style={styles?.headRight}>
            {/* <Text>Z-TECH</Text> */}
            <Image
              source={`https://cdn-icons-png.flaticon.com/512/5149/5149174.png`}
            ></Image>
          </View>
        </View>





        <View style={styles?.billAndPay}>
          {/* bill Address  */}
          <View style={styles?.bill}>
            <Text style={styles.billFrom}>Bill From</Text>
            <Text style={styles.billName}>Z-Eight-Tech</Text>
            <Text style={styles.billAddress}>Buhaddarhat , Chittagong</Text>
          </View>

          {/* pay Address  */}
          <View style={styles?.bill}>
            <Text style={styles.billFrom}>Bill To</Text>
            <Text style={styles.billName}>{invoice?.customer?.name}</Text>
            <Text style={styles.billAddress}>{invoice?.customer?.address}</Text>
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
                <Text style={styles.rowTwo}>
                  {item.rate * parseInt(item?.quantity)}
                </Text>
              </View>
            ))}
        </View>

        {/* total ,subtotal , tax view layout */}
        <View style={styles.totalSubTotalTax}>
          {/* subtotal */}
          <View style={styles.subtotalAndTax}>
            <Text>SubTotal</Text>
            <Text>{invoice?.sub_total}</Text>
          </View>
          {/* tax */}
          <View style={styles.subtotalAndTax}>
            <Text>Shipping</Text>
            <Text>{invoice?.shipping ? parseInt(invoice?.shipping) : 0}</Text>
          </View>

          {/* discount */}
          <View style={styles.subtotalAndTax}>
            <Text>Shipping</Text>
            <Text>{`${invoice?.discount}%`}</Text>
          </View>
          {/* total */}
          <View style={styles.subtotalAndTax}>
            <Text>Total</Text>
            <Text>{invoice?.total}</Text>
          </View>

          {/* due */}
          <View style={styles.subtotalAndTax}>
            <Text>Due</Text>
            <Text>{invoice?.due_amount}</Text>
          </View>
          {/* paid */}

          <View style={styles.subtotalAndTax}>
            <Text>Paid</Text>
            <Text>{invoice?.paid_amount}</Text>
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
