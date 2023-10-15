import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import InvoicesList from "../../Dashboard/Invoices/InvoicesList";
import ProductReport from "../../Dashboard/Report/ProductReport/ProductReport";

const ReportLayout = () => {
  return (
    <div>
      <h2 className="text-2xl mt-5 text-center font-semibold">Reports</h2>
      <Tabs>
        <TabList className={`px-5`}>
          <Tab>Product</Tab>
          <Tab>Invoice</Tab>
        </TabList>

        <TabPanel>
          <ProductReport />
        </TabPanel>
        <TabPanel>
          <InvoicesList />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReportLayout;
