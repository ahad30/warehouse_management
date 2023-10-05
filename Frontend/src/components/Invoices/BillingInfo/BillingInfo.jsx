import { array, object } from "prop-types";
import CompanyInfo from "../CompanyInfo/CompanyInfo";
import CustomerInfo from "../CustomerInfo/CustomerInfo";

const BillingInfo = ({ company_info, customers }) => {
  return (
    <>
      <div className="my-5">
        <div className="">
          {/* <CompanyInfo company_info={company_info} /> */}
          <CustomerInfo customers={customers} />
        </div>
      </div>
    </>
  );
};
BillingInfo.propTypes = {
  company_info: object,
  customers: array,
};
export default BillingInfo;
