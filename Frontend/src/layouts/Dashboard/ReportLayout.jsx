import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import InvoicesList from "../../Dashboard/Invoices/InvoicesList";
import ProductReport from "../../Dashboard/Report/ProductReport/ProductReport";
import ShiftProduct from "../../Dashboard/Report/ProductReport/ShiftProduct";
import SaleReport from "../../Dashboard/Report/ProductReport/SaleReport";

const ReportLayout = () => {
  return (
    <div>
      <h2 className="text-2xl mt-5 text-center font-semibold">Reports</h2>
      <Tabs>
        <TabList className={`px-5`}>
          {/* <Tab>Product</Tab> */}
          <Tab>Shift</Tab>
          <Tab>Sale</Tab>
        </TabList>

        {/* <TabPanel>
          <ProductReport />
        </TabPanel> */}
        <TabPanel>
          <ShiftProduct></ShiftProduct>
        </TabPanel>
        <TabPanel>
          <SaleReport></SaleReport>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReportLayout;
