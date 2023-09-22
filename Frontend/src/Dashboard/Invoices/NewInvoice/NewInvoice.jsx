import BillingInfo from "../../../components/Invoices/BillingInfo/BillingInfo";
import Calculation from "../../../components/Invoices/Calculation/Calculation";
// import InvoiceInfo from "../../../components/Invoices/InvoiceInfo/InvoiceInfo";
// import ItemsWithCustom from "../../../components/Invoices/Items/ItemsWithCustom";
import ItemsWithSelect from "../../../components/Invoices/Items/ItemsWithSelect";
import UseLoading from "../../../components/Reusable/useLoading/useLoading";
import { useGetInvoiceInfosQuery } from "../../../features/Invoice/InvoiceApi";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";

const NewInvoice = () => {
  const { data, isLoading, isError, error, isSuccess } =
    useGetInvoiceInfosQuery();

  if (isLoading) {
    return <UseLoading />;
  }

  if (isError) {
    console.error(error);
  }

  if (!data?.status) {
    return (
      <>
        <p className="text-center text-2xl mt-10">{data?.message}</p>
      </>
    );
  }

  if (isSuccess && data?.status)
    return (
      <DashboardBackground>
        {/* <InvoiceInfo /> */}
        <BillingInfo
          company_info={data?.data?.company_info}
          customers={data?.data?.customers}
        />
        {/* <ItemsWithCustom /> */}
        <ItemsWithSelect products={data?.data?.products} />
        <Calculation />
      </DashboardBackground>
    );
};

export default NewInvoice;
