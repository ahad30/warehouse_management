import { NavLink, Outlet } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import InvoicesList from "../../Dashboard/Invoices/InvoicesList";
import ProductReport from "../../Dashboard/Report/ProductReport/ProductReport";

const ReportLayout = () => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Invoice</Tab>
          <Tab>Products</Tab>
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
