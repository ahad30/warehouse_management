import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import CompanyInfoUpdate from "./CompanyInfoUpdate";

import DefaultSetting from "./DefaultSetting";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DatabaseBackup from "./DatabaseBackup";

const SettingsNew = () => {
  UseTitle("Settings");
  return (
    <DashboardBackground>
      <div className="flex flex-col gap-y-7">
        <div className="bg-gray-100 p-5">
          {/* Company Info Update */}
          <CompanyInfoUpdate />
        </div>

        <Tabs>
          <TabList>
            <Tab>Default Settings</Tab>
            <Tab>Backup</Tab>
          </TabList>

          <TabPanel>
            <div className="bg-gray-100 p-5">
              {/* Company Info Update */}
              <h1 className="font-semibold text-2xl my-7">Default Setting</h1>
              <DefaultSetting></DefaultSetting>
            </div>
          </TabPanel>
          <TabPanel>
              <DatabaseBackup></DatabaseBackup>
          </TabPanel>
        </Tabs>
      </div>
    </DashboardBackground>
  );
};

export default SettingsNew;
