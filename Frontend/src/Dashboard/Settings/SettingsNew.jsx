import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import CompanyInfoUpdate from "./CompanyInfoUpdate";
import CompanyInfoUpdateNew from "./CompanyInfoUpdateNew";
import UserProfileUpdate from "./UserProfileUpdate";
import UserProfileUpdateNew from "./UserProfileUpdateNew";


const SettingsNew = () => {
    UseTitle("Settings");
    return (
        <DashboardBackground>
        <div className="flex flex-col gap-y-7">
          <div className="bg-gray-100 p-5">
            {/* Company Info Update */}
            <CompanyInfoUpdateNew></CompanyInfoUpdateNew>
          </div>
      
          <div className="bg-gray-100 p-5">
            {/* User profile */}
            <UserProfileUpdateNew />
          </div>
        </div>
      </DashboardBackground>
    );
};

export default SettingsNew;