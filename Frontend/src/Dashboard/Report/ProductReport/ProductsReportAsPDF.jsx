import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { array, string } from "prop-types";

const ProductsReportAsPDF = ({ data, startDate, endDate }) => {
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
      width: "20%",
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
            Products Report
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
            <Text style={styles.rowTwo}>Product Name</Text>
            <Text style={styles.rowTwo}>Sold Price</Text>
            <Text style={styles.rowTwo}>Quantity</Text>
            <Text style={styles.rowTwo}>VAT</Text>
            <Text style={styles.rowTwo}>Total</Text>
            <Text style={styles.rowTwo}>Last Sale Date</Text>
          </View>

          {/* table row View layout-------you can call map function here */}
          {data &&
            data?.map((item) => (
              <View key={item?.id} style={styles.tableBody}>
                <Text style={styles.rowTwo}>{item?.product_name}</Text>
                <Text style={styles.rowTwo}>
                  {parseFloat(item?.price).toFixed(2)}
                </Text>
                <Text style={styles.rowTwo}>{item?.quantity}</Text>
                <Text style={styles.rowTwo}>{item?.average_vat}</Text>
                <Text style={styles.rowTwo}>
                  {parseFloat(item?.average_vat).toFixed(2)}
                </Text>
                <Text style={styles.rowTwo}>
                  {(
                    parseFloat(item?.total_sold_price_without_vat) +
                    (parseFloat(item?.total_sold_price_without_vat) *
                      parseFloat(item?.average_vat)) /
                      100
                  ).toFixed(2)}
                </Text>
                <Text style={styles.rowTwo}>{item?.last_sale_date}</Text>
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};

ProductsReportAsPDF.propTypes = {
  data: array,
  startDate: string,
  endDate: string,
};

export default ProductsReportAsPDF;
