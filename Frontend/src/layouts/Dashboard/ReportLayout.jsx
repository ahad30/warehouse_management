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
          <Tab>Invoice Report</Tab>
          <Tab>Product Report</Tab>
        </TabList>

        <TabPanel>
          <InvoicesList />
        </TabPanel>
        <TabPanel>
          <ProductReport />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReportLayout;
