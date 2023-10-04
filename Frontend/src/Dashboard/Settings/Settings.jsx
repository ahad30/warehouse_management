import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import CompanyInfoUpdate from "./CompanyInfoUpdate";
import UserProfileUpdate from "./UserProfileUpdate";

const Settings = () => {
  UseTitle("Settings");

  return (
    <DashboardBackground>
      {/* Company Info Update */}
      <CompanyInfoUpdate />

      {/* User profile */}
      <UserProfileUpdate />
    </DashboardBackground>
  );
};

export default Settings;


