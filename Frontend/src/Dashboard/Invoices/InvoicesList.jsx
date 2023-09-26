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
import ViewInvoice from "../../components/InvoicePages/ViewInvoice";

const InvoicesList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewInvoiceOpen, setViewInvoiceOpen] = useState(false);
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

  // HANDLE PDF DOWNLOAD
  const handleInvoicePDF = (data) => {
    console.log(data);
  };

  // HANDLE INVOICE VIEW WITH MODAL
  const handleViewInvoice = (data) => {
    setInvoice(data);
    setViewInvoiceOpen(true);
    console.log(data);
  };

  const invoiceData = {
    invoiceNumber: "INV-001",
    amount: 100.0,
    // Add more data as needed
  };

  const columns = [
    { key: "id", header: "ID" },
    { key: "invoice_no", header: "Invoice Number" },
    { key: "invoice_date", header: "Invoice Date" },
    { key: "customer_name", header: "Customer Name" },
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
          handleInvoicePDF={handleInvoicePDF}
          handleViewInvoice={handleViewInvoice}
          btnTitle={"Add Invoice"}
          btnPath={"/dashboard/invoice/new"}
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
        <ViewInvoice
          invoice={invoice}
          viewInvoiceOpen={viewInvoiceOpen}
          setViewInvoiceOpen={setViewInvoiceOpen}
        />
      </DashboardBackground>
    </>
  );
};

export default InvoicesList;
