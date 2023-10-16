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
  // Set the page title to "New Invoice"
  UseTitle("New Invoice");

  // Fetch invoice information using a query
  const { data, isLoading, isError, error, isSuccess } =
    useGetInvoiceInfosQuery();

  // Handle different states and conditions
  if (isLoading) {
    // If data is loading, show a loading indicator
    return <UseLoading />;
  }

  if (isError) {
    // If there's an error, display an error message
    toast.error(error?.data?.message || data?.message);
  }

  if (!data?.status) {
    // If the response indicates failure, display an error message
    return (
      <>
        <p className="text-center text-2xl mb-10">{data?.message}</p>
      </>
    );
  }

  if (isSuccess && data?.status) {
    // If data was successfully loaded and the response indicates success, render the invoice creation form
    return (
      <DashboardBackground>
        {/* Component for handling invoice date */}
        <InvoiceDate />

        {/* Component for handling customer information */}
        <CustomerInfo customers={data?.data?.customers} />

        {/* Component for selecting and adding items/products to the invoice */}
        <ItemsWithSelect products={data?.data?.products} />

        {/* Component for invoice calculations */}
        <Calculation />
      </DashboardBackground>
    );
  }
};

export default NewInvoice;
