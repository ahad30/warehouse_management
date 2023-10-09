import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { array } from "prop-types";

const InvoicesAsPDF = ({ data }) => {
  const styles = StyleSheet.create({
    tableHead: {
      display: "flex",
      border: "1px 0px solid black",
      // borderBottom: "1px solid black",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    tableBody: {
      display: "flex",
      // border: "1px 0px solid black",
      borderBottom: "1px solid black",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    rowOne: {
      width: "10%",
    },
    rowTwo: {
      width: "20%",
      fontSize: "12px",
    },
  });

  return (
    <Document>
      <Page size={"A4"} orientation="landscape" style={{ padding: "15px" }}>
        <View>
          {/* table head View layout */}
          <View style={styles?.tableHead}>
            <Text style={styles?.rowTwo}>Invoice No</Text>
            <Text style={styles?.rowTwo}>Issue</Text>
            <Text style={styles?.rowTwo}>C. Name</Text>
            <Text style={styles?.rowTwo}>Sub Total</Text>
            <Text style={styles?.rowTwo}>Discount</Text>
            <Text style={styles?.rowTwo}>Shipping</Text>
            <Text style={styles?.rowTwo}>Total</Text>
            <Text style={styles?.rowTwo}>Paid</Text>
            <Text style={styles?.rowTwo}>Due</Text>
            <Text style={styles?.rowTwo}>Due Date</Text>
          </View>

          {/* table row View layout-------you can call map function here */}
          {data &&
            data?.map((item) => (
              <View key={item?.id} style={styles.tableHead}>
                <Text style={styles.rowTwo}>{item?.invoice_no}</Text>
                <Text style={styles.rowTwo}>{item?.issue_date}</Text>
                <Text style={styles.rowTwo}>{item?.customer?.name}</Text>
                <Text style={styles.rowTwo}>{item?.sub_total}</Text>
                <Text style={styles.rowTwo}>{`${item?.discount}%`}</Text>
                <Text style={styles.rowTwo}>{item?.shipping}</Text>
                <Text style={styles.rowTwo}>{item?.customer?.name}</Text>
                <Text style={styles.rowTwo}>{item?.total}</Text>
                <Text style={styles.rowTwo}>{item?.paid_amount}</Text>
                <Text style={styles.rowTwo}>{item?.due_amount}</Text>
                <Text style={styles.rowTwo}>{item?.due_date}</Text>
                <Text style={styles.rowTwo}>{item?.status}</Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};

InvoicesAsPDF.propTypess = {
  data: array,
};

export default InvoicesAsPDF;
