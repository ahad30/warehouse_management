import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import HistoryList from "../../Dashboard/History/HistoryList";
import SoldReport from "../../Dashboard/Report/ProductReport/SoldReport";

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
          <SoldReport/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ReportLayout;
