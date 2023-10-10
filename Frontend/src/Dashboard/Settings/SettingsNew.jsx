import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import CompanyInfoUpdateNew from "./CompanyInfoUpdateNew";

const SettingsNew = () => {
  UseTitle("Settings");
  return (
    <DashboardBackground>
      <div className="flex flex-col gap-y-7">
        <div className="bg-gray-100 p-5">
          {/* Company Info Update */}
          <CompanyInfoUpdateNew />
        </div>
      </div>
    </DashboardBackground>
  );
};

export default SettingsNew;
