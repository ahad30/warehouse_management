import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import UseTable from "../../components/Reusable/useTable/useTable";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/useLoading";
import {
  useDeleteInvoiceMutation,
  useGetInvoicesQuery,
} from "../../features/Invoice/InvoiceApi";
import EditInvoice from "./EditInvoice";

const InvoicesList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [invoice, setInvoice] = useState({});

  const {
    data: invoicesData,
    isLoading: invoicesIsLoading,
    isError: invoicesIsError,
    error: invoicesError,
    isSuccess: invoicesIsSuccess,
  } = useGetInvoicesQuery();

  const [
    deleteInvoice,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      error: deleteError,
      isSuccess: deleteIsSuccess,
      data: deleteData,
    },
  ] = useDeleteInvoiceMutation();

  // DELETE STARTS
  const onDelete = (id) => {
    deleteInvoice(id);
  };

  useEffect(() => {
    if (deleteIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (deleteIsError) {
      toast.error(deleteData?.message || deleteError?.data?.message, { id: 1 });
    }

    if (deleteIsSuccess) {
      toast.success(deleteData?.message, { id: 1 });
    }
  }, [
    deleteIsLoading,
    deleteIsError,
    deleteError,
    deleteIsSuccess,
    deleteData,
  ]);
  // DELETE ENDS
  console.log(
    deleteIsLoading,
    deleteIsError,
    deleteError,
    deleteIsSuccess,
    deleteData
  );
  // EDIT STARTS
  const handleModalEditInfo = (invoice) => {
    setInvoice(invoice);
    setModalIsOpen(true);
  };
  // EDIT ENDS

  // SEARCH FILTERING STARTS
  const setFiltering = (data) => {
    console.log(data);
  };
  // SEARCH FILTERING ENDS

  const columns = [
    { key: "id", header: "Invoice ID" },
    { key: "invoice_no", header: "Invoice Number" },
    { key: "invoice_date", header: "Invoice Date" },
    { key: "customer_name", header: "Customer Name" },
    { key: "customer_email", header: "Customer Email" },
    { key: "customer_phone", header: "Customer Phone" },
    { key: "customer_address", header: "Billing Address" },
    { key: "discount", header: "Discount" },
    { key: "shipping", header: "Shipping" },
    { key: "total", header: "Total" },
    // { key: "created_at", header: "Created At" },
  ];

  // INVOICES CONTENT
  let content;

  // ALL INVOICES
  if (invoicesIsLoading) {
    return (content = <UseLoading />);
  }

  if (invoicesIsError) {
    console.error(invoicesError);
  }

  if (!invoicesData?.status) {
    return (content = (
      <>
        <p className="text-center text-2xl mt-10">{invoicesData?.message}</p>
      </>
    ));
  }

  if (invoicesIsSuccess && invoicesData?.status) {
    content = (
      <>
        <UseTable
          data={invoicesData?.invoices}
          columns={columns}
          handleModalEditInfo={handleModalEditInfo}
          onDelete={onDelete}
          btnTitle={"Add Invoice"}
          btnPath={"/dashboard/invoice/add"}
          btnIcon={<BiCartAdd size={20} />}
          setFiltering={setFiltering}
        />
      </>
    );
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Invoices {invoicesData?.invoices?.length}
        </TableHeadingTitle>
        {content}
        <EditInvoice
          invoice={invoice}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default InvoicesList;
