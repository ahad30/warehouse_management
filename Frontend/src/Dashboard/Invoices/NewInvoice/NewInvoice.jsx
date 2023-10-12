import { toast } from "react-hot-toast";
import UseTitle from "../../../components/Reusable/UseTitle/UseTitle";
import UseLoading from "../../../components/Reusable/useLoading/UseLoading";
import { useGetInvoiceInfosQuery } from "../../../features/Invoice/InvoiceApi";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import InvoiceDate from "./InvoiceDate/InvoiceDate";
import CustomerInfo from "./CustomerInfo/CustomerInfo";
import ItemsWithSelect from "./Items/ItemsWithSelect";
import Calculation from "./Calculation/Calculation";

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
