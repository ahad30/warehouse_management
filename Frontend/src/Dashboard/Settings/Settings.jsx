import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import CompanyInfoUpdate from "./CompanyInfoUpdate";

import DefaultSetting from "./DefaultSetting";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DatabaseBackup from "./DatabaseBackup";
import { useSelector } from "react-redux";

const Settings = () => {
  UseTitle("Settings");
  const { user } = useSelector((state) => state?.auth);

  return (
    <DashboardBackground>
      <div className="flex flex-col gap-y-7">
        <div className="bg-gray-100 p-5">
          {/* Company Info Update */}
          <CompanyInfoUpdate />
        </div>

        {user?.get_role?.role === "admin" && (
          <Tabs>
            <TabList>
              <Tab>Default Settings</Tab>
              <Tab>Backup</Tab>
            </TabList>

            <TabPanel>
              <div className="bg-gray-100 p-5">
                {/* Company Info Update */}
                <h1 className="font-semibold text-2xl my-7">Default Setting</h1>
                <DefaultSetting />
              </div>
            </TabPanel>
            <TabPanel>
              <DatabaseBackup />
            </TabPanel>
          </Tabs>
        )}
      </div>
    </DashboardBackground>
  );
};

export default Settings;
