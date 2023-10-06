// import InvoiceA4 from "../../../components/InvoicePages/InvoiceA4";
import { toast } from "react-hot-toast";
// import BillingInfo from "../../../components/Invoices/BillingInfo/BillingInfo";
import Calculation from "../../../components/Invoices/Calculation/Calculation";
import InvoiceDate from "../../../components/Invoices/InvoiceDate/InvoiceDate";
// import ItemsWithCustom from "../../../components/Invoices/Items/ItemsWithCustom";
import ItemsWithSelect from "../../../components/Invoices/Items/ItemsWithSelect";
import SubmitInvoice from "../../../components/Invoices/SubmitInvoice/SubmitInvoice";
import UseTitle from "../../../components/Reusable/UseTitle/UseTitle";
import UseLoading from "../../../components/Reusable/useLoading/UseLoading";
import { useGetInvoiceInfosQuery } from "../../../features/Invoice/InvoiceApi";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import CustomerInfo from "../../../components/Invoices/CustomerInfo/CustomerInfo";
import { useSelector } from "react-redux";

const NewInvoice = () => {
  UseTitle("New Invoice");
  const { data, isLoading, isError, error, isSuccess } =
    useGetInvoiceInfosQuery();

  const invoice = useSelector((state) => state?.invoice);
  console.log(invoice);

  if (isLoading) {
    return <UseLoading />;
  }

  if (isError) {
    toast.error(error?.data?.message || data?.message);
  }

  if (!data?.status) {
    return (
      <>
        <p className="text-center text-2xl mb-10">{data?.message}</p>
      </>
    );
  }

  if (isSuccess && data?.status)
    return (
      <DashboardBackground>
        <InvoiceDate />
        <CustomerInfo customers={data?.data?.customers} />
        {/* <ItemsWithCustom /> */}
        <ItemsWithSelect products={data?.data?.products} />
        <Calculation />
        <SubmitInvoice />
        {/* <InvoiceA4 /> */}
      </DashboardBackground>
    );
};

export default NewInvoice;
