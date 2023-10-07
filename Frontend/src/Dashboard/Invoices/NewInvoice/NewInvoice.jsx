import { toast } from "react-hot-toast";
import Calculation from "../../../components/Invoices/Calculation/Calculation";
import InvoiceDate from "../../../components/Invoices/InvoiceDate/InvoiceDate";
import ItemsWithSelect from "../../../components/Invoices/Items/ItemsWithSelect";
import UseTitle from "../../../components/Reusable/UseTitle/UseTitle";
import UseLoading from "../../../components/Reusable/useLoading/UseLoading";
import { useGetInvoiceInfosQuery } from "../../../features/Invoice/InvoiceApi";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import CustomerInfo from "../../../components/Invoices/CustomerInfo/CustomerInfo";

const NewInvoice = () => {
  UseTitle("New Invoice");
  const { data, isLoading, isError, error, isSuccess } =
    useGetInvoiceInfosQuery();

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
        <ItemsWithSelect products={data?.data?.products} />
        <Calculation />
      </DashboardBackground>
    );
};

export default NewInvoice;
