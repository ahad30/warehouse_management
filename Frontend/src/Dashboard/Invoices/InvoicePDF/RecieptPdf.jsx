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
    padding: "2px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  main: { padding: "2px", position: "relative" },
  head: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // border: "1px solid red",
  },

  headLeft: {
    
    fontSize: "4px",
    fontWeight: "300",
    // border: "1px solid red",
  },
  headLeftInvoice: {
    fontSize: "4px",
    fontWeight: "bold",
  },
  headMiddle: {
    // border: "1px solid red",
  },
  brImage: {
    width: "20px"
  },
  date: {
    marginVertical: "5px",
  },
  headRight: {  textAlign: "right",  
  // border: "1px solid red", 
},

  billAndPay: {
    display: "flex",
    marginTop: "10px",
    flexDirection: "row",
    // alignContent: "space-between",
    justifyContent: "space-between",
    
  },
  bill: {
    width: "50%",
    
  },
  billRight: {
    width: "50%",
    
    textAlign: "right",
  },

  billFrom: {
    color: "#5c5c5c",
    fontWeight: "600",
    fontSize: "4px",
  },
  billName: {
    fontWeight: "600",
    fontSize: "4px",
    marginVertical: "5px",
  },
  billAddress: {
    color: "#5c5c5c",
    fontWeight: "light",
    fontSize: "4px",
  },
  tableHead: {
    display: "flex",
    marginTop: "10px",
    padding: "2px",
    border: "1px solid #f3f4f6",

    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: "4px",
    fontWeight: "300",
  },
  rowOne: {
    width: "40%",
    fontSize: "4px",
    fontWeight: "300",
  },
  rowTwo: {
    width: "20%",
    fontSize: "4px",
    fontWeight: "300",
  },

  tableRow: {
    display: "flex",
    textAlign: "left",
    marginTop: "5px",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "2px",
  },

  totalSubTotalTax: {
    width: "100%",
    paddingHorizontal: "5px",
    position: "absolute",
    bottom: "5px",
  },

  subtotalAndTax: {
    display: "flex",
    borderBottom: "1px solid #f3f4f6",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5px",
    fontSize: "4px",
    fontWeight: "light",
    padding: "2px",
  },

  brCode: {
    width: "50px",
    height: "50px",
  },

  logoImage: {
    width: "20px",
    height: "auto",
  },

  // total: {
  //   display: "flex",
  //   fontWeight: "bold",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginTop: "10px",
  // },
});
const RecieptPDF = ({ invoice,companyDetails,defaultSettings,companyImg }) => (
  <Document>
    <Page size="A8" style={styles.page}>
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
            <Image style={styles.logoImage}
              source={companyImg}
            ></Image>
          </View>
        </View>

        <View style={styles?.billAndPay}>
          {/* bill Address  */}
          <View style={styles?.bill}>
            <Text style={styles.billFrom}>Bill From</Text>
            <Text style={styles.billName}>{companyDetails?.company_name}</Text>
            <Text style={styles.billAddress}>{companyDetails?.company_email}</Text>
            <Text style={styles.billAddress}>{companyDetails?.company_phone}</Text>
            <Text style={styles.billAddress}>{companyDetails?.company_address}</Text>
          </View>

          {/* pay Address  */}
          <View style={styles?.billRight}>
            <Text style={styles.billFrom}>Bill To</Text>
            <Text style={styles.billName}>{invoice?.customer?.name}</Text>
            <Text style={styles.billAddress}>{invoice?.customer?.email}</Text>
            <Text style={styles.billAddress}>{invoice?.customer?.phone}</Text>
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
            <Text style={styles?.rowTwo}>{defaultSettings?.taxation}</Text>
            <Text style={styles?.rowTwo}>Total Price</Text>
          </View>

          {/* table row View layout-------you can call map function here */}
          {invoice?.saleitems &&
            invoice?.saleitems?.map((item) => (
              <View key={item?.id} style={styles.tableRow}>
                <Text style={styles.rowOne}>{item?.name}</Text>
                <Text style={styles.rowTwo}>{item?.rate}</Text>
                <Text style={styles.rowTwo}>{item?.quantity}</Text>
                <Text style={styles.rowTwo}>{item?.tax}</Text>
                <Text style={styles.rowTwo}>
                  {item?.total_price_quantity_tax}
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
            <Text>discount</Text>
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

RecieptPDF.propTypes = {
  invoice: object,
  companyDetails: object,
  defaultSettings: object,
};
export default RecieptPDF;
