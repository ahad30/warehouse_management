import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import {
  useDeleteInvoiceMutation,
  useGetInvoicesQuery,
} from "../../features/Invoice/InvoiceApi";
import EditInvoice from "./EditInvoice";
import ViewInvoice from "../../components/InvoicePages/ViewInvoice";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import { RiDeleteBin4Line } from "react-icons/ri";
import { BsFiletypeCsv, BsFiletypePdf, BsFillEyeFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../../components/PDF/InvoicePDF";
import { format } from "date-fns";

const InvoicesList = () => {
  UseTitle("Invoices");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewInvoiceOpen, setViewInvoiceOpen] = useState(false);
  const [invoice, setInvoice] = useState({});
  const toDay = format(new Date(), "yyyy-MM-dd");

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

  // HANDLE INVOICE VIEW WITH MODAL
  const handleViewInvoice = (data) => {
    setInvoice(data);
    setViewInvoiceOpen(true);
    console.log(data);
  };

  // ALL INVOICES
  if (invoicesIsLoading) {
    return <UseLoading />;
  }
  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Invoices {invoicesData?.invoices?.length}
        </TableHeadingTitle>

        <SearchAndAddBtn
          btnTitle={"Add Invoice"}
          btnPath={"/dashboard/invoice/new"}
          btnIcon={<BiCartAdd size={20} />}
          setFiltering={setFiltering}
        />

        <div className="my-5 flex flex-col lg:flex-row justify-start lg:justify-between lg:items-center gap-y-3">
          <form className="flex flex-col lg:flex-row gap-2">
            <label htmlFor="from">
              From:
              <input className="input input-sm input-bordered" type="date" />
            </label>
            <label htmlFor="to">
              To:
              <input
                className="input input-sm input-bordered"
                type="date"
                defaultValue={toDay}
              />
            </label>
            <input
              type="submit"
              // className="btn btn-accent btn-sm inline-block w-fit"
              className="flex items-center gap-x-2 btn-primary px-2 py-1 rounded-md w-full sm:w-fit cursor-pointer"
              value={"Get Report"}
            />
          </form>
          <div className="flex lg:flex-row justify-between gap-2">
            <button className="flex items-center gap-x-2 btn-primary px-3 py-2 rounded-md w-full sm:w-fit cursor-pointer">
              <BsFiletypeCsv size={20} /> CSV
            </button>
            <button className="flex items-center gap-x-2 btn-primary px-3 py-2 rounded-md w-full sm:w-fit cursor-pointer">
              <BsFiletypePdf size={20} /> PDF
            </button>
          </div>
        </div>

        <div className="overflow-x-scroll">
          <table className="table table-sm table-pin-rows table-pin-cols">
            {/* Table header */}
            <thead>
              <tr>
                <th>Inv No</th>
                <th>Inv Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Paid Amount</th>
                <th>Due Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {[...Array(5)].map((invoice, idx) => (
                <tr key={idx}>
                  <td>Inv No</td>
                  <td>04-Oct-23</td>
                  <td>John Doe</td>
                  <td>1000</td>
                  <td>800</td>
                  <td>200</td>
                  <td>Due</td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <BsFillEyeFill
                        onClick={() => {
                          handleViewInvoice(1);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />

                      <PDFDownloadLink document={<InvoicePDF />}>
                        <FaDownload className="cursor-pointer" size={20} />
                      </PDFDownloadLink>

                      <FiEdit
                        onClick={() => {
                          handleModalEditInfo(1);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />

                      <RiDeleteBin4Line
                        onClick={() => {
                          onDelete(1);
                        }}
                        className="cursor-pointer"
                        size={20}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Inv No</th>
                <th>Inv Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Paid Amount</th>
                <th>Due Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
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
