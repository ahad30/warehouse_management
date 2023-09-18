import BillingInfo from "../../../components/Invoices/BillingInfo/BillingInfo";
import Calculation from "../../../components/Invoices/Calculation/Calculation";
// import InvoiceInfo from "../../../components/Invoices/InvoiceInfo/InvoiceInfo";
// import ItemsWithCustom from "../../../components/Invoices/Items/ItemsWithCustom";
import ItemsWithSelect from "../../../components/Invoices/Items/ItemsWithSelect";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";

const NewInvoice = () => {
  return (
    <DashboardBackground>
      {/* <InvoiceInfo /> */}
      <BillingInfo />
      {/* <ItemsWithCustom /> */}
      <ItemsWithSelect />
      <Calculation />
    </DashboardBackground>
  );
};

export default NewInvoice;
