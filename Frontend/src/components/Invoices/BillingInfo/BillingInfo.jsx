import CompanyInfo from "../CompanyInfo/CompanyInfo";
import CustomerInfo from "../CustomerInfo/CustomerInfo";

const BillingInfo = () => {
  return (
    <>
      <div className="my-5">
        <div className="grid  md:grid-cols-2 gap-10">
          <CompanyInfo />
          <CustomerInfo />
        </div>
      </div>
    </>
  );
};

export default BillingInfo;
