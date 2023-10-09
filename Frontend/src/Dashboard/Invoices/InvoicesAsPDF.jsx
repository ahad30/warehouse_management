import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { array, string } from "prop-types";

const InvoicesAsPDF = ({ data, startDate, endDate }) => {
  const styles = StyleSheet.create({
    dateStyle: { fontSize: "12px", marginBottom: "10px" },
    tableHead: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      fontSize: "13px",
      fontWeight: "bold",
    },
    tableBody: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      fontSize: "12px",
    },
    rowOne: {
      border: "1px solid black",
      width: "100px",
      textAlign: "center",
      fontWeight: "semibold",
      padding: "3px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    rowTwo: {
      border: "1px solid black",
      width: "130px",
      textAlign: "center",
      fontWeight: "semibold",
      padding: "3px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    rowThree: {
      border: "1px solid black",
      width: "160px",
      textAlign: "center",
      fontWeight: "semibold",
      padding: "3px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <Document>
      <Page size={"A4"} orientation="landscape" style={{ padding: "15px" }}>
        <View>
          <Text style={{ textAlign: "center", marginBottom: "20px" }}>
            Invoice Report
          </Text>
        </View>
        {startDate && endDate && (
          <View>
            <Text style={styles.dateStyle}>
              From: {startDate} - To {endDate}
            </Text>
          </View>
        )}
        <View>
          {/* table head View layout */}
          <View style={styles?.tableHead}>
            <Text style={styles.rowTwo}>Invoice No</Text>
            <Text style={styles.rowTwo}>Iss Date</Text>
            <Text style={styles.rowTwo}>C. Name</Text>
            <Text style={styles.rowOne}>Sub Total</Text>
            <Text style={styles.rowOne}>Discount</Text>
            <Text style={styles.rowOne}>Shipping</Text>
            <Text style={styles.rowOne}>Total</Text>
            <Text style={styles.rowOne}>Paid</Text>
            <Text style={styles.rowOne}>Status</Text>
            <Text style={styles.rowOne}>Due</Text>
            <Text style={styles.rowTwo}>Due Date</Text>
            <Text style={styles.rowThree}>Products</Text>
          </View>

          {/* table row View layout-------you can call map function here */}
          {data &&
            data?.map((item) => (
              <View key={item?.id} style={styles.tableBody}>
                <Text style={styles.rowTwo}>{item?.invoice_no}</Text>
                <Text style={styles.rowTwo}>{item?.issue_date}</Text>
                <Text style={styles.rowTwo}>
                  {item?.customer?.name.slice(0, 10)}...
                </Text>
                <Text style={styles.rowOne}>{item?.sub_total}</Text>
                <Text style={styles.rowOne}>{`${item?.discount}%`}</Text>
                <Text style={styles.rowOne}>{item?.shipping}</Text>
                <Text style={styles.rowOne}>{item?.total}</Text>
                <Text style={styles.rowOne}>{item?.paid_amount}</Text>
                <Text style={styles.rowOne}>
                  {item?.status === 0 ? "Due" : "Paid"}
                </Text>
                <Text style={styles.rowOne}>{item?.due_amount}</Text>
                <Text style={styles.rowTwo}>{item?.due_date}</Text>
                <Text style={styles.rowThree}>
                  {item?.saleitems?.map(
                    (product) =>
                      `${product?.name} [${product?.quantity} ${product?.unit}], `
                  )}
                </Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};

InvoicesAsPDF.propTypes = {
  data: array,
  startDate: string,
  endDate: string,
};

export default InvoicesAsPDF;
