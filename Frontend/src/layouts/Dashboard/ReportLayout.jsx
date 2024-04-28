import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import InvoicesList from "../../Dashboard/Invoices/InvoicesList";
import ProductReport from "../../Dashboard/Report/ProductReport/ProductReport";
import ShiftProduct from "../../Dashboard/Report/ProductReport/ShiftProduct";
import SaleReport from "../../Dashboard/Report/ProductReport/SaleReport";
import HistoryList from "../../Dashboard/History/HistoryList";

const ReportLayout = () => {
  return (
    <div>
      <h2 className="text-2xl mt-5 text-center font-semibold">Reports</h2>
      <Tabs>
        <TabList className={`px-5`}>
          {/* <Tab>Product</Tab> */}
          <Tab>General Report</Tab>
          <Tab>Sold Report</Tab>
        </TabList>

        <TabPanel>
          <HistoryList></HistoryList>
        </TabPanel>
        <TabPanel>
          <HistoryList></HistoryList>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReportLayout;
