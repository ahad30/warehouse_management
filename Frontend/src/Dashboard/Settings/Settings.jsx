import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import CompanyInfoUpdate from "./CompanyInfoUpdate";
import DefaultSetting from "./DefaultSetting";

const Settings = () => {
  UseTitle("Settings");
  return (
    <DashboardBackground>
      <div className="flex flex-col gap-y-7">
        <div className="bg-gray-100 p-5">
          {/* Company Info Update */}
          <CompanyInfoUpdate />
        </div>
        <div className="bg-gray-100 p-5">
          {/* Default Settings */}
          <DefaultSetting />
        </div>
      </div>
    </DashboardBackground>
  );
};

export default Settings;
