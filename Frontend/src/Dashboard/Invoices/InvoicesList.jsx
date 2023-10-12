import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
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
import { BsFiletypePdf, BsFillEyeFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../../components/PDF/InvoicePDF";
import DataTable from "react-data-table-component";
import InvoicesAsCSV from "./InvoicesAsCSV";
import InvoiceDateFiltering from "./InvoiceDateFiltering";
import InvoicesAsPDF from "./InvoicesAsPDF.jsx";
import RecieptPDF from "../../components/PDF/RecieptPDF";


const InvoicesList = () => {
  UseTitle("Invoices");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewInvoiceOpen, setViewInvoiceOpen] = useState(false);
  const [invoice, setInvoice] = useState({});
  const allInvoicesRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 10;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(null);

  const { data: invoicesData, isLoading: invoicesIsLoading } =
    useGetInvoicesQuery({ startDate, endDate, date });

  useEffect(() => {
    setFilterData(invoicesData?.invoices);
  }, [invoicesData?.invoices, invoicesData]);

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

  const handleStartDate = (date) => {
    setStartDate(date);
    setDate(null);
  };
  const handleEndDate = (date) => {
    setEndDate(date);
    setDate(null);
  };
  const handleDate = (date) => {
    console.log(date);
    setDate(date);
    setStartDate(null);
    setEndDate(null);
  };
  const handleDateClear = () => {
    setStartDate(null);
    setEndDate(null);
    setDate(null);
  };

  console.log(startDate, endDate, date);

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
  const columns = [
    {
      name: "Invoice no",
      selector: (row) => <>{row?.invoice_no}</>,
      sortable: true,
    },
    {
      name: "Invoice Date",
      selector: (row) => <>{row?.issue_date}</>,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => <>{row?.customer?.name}</>,
    },
    {
      name: "Total",
      selector: (row) => <>{row?.total}</>,
    },

    {
      name: "Paid",
      selector: (row) => <>{row?.paid_amount}</>,
    },
    {
      name: "Due",
      selector: (row) => <>{row?.due_amount}</>,
    },
    {
      name: "Status",
      sortable: true,
      selector: (row) => (
        <div>
          <button
            className={`rounded-lg text-white px-3 py-1 ${
              row?.status === 0 ? "bg-[#DC2626]" : "bg-[#16A34A]"
            }`}
          >
            {row?.status === 0 ? "Due" : "Paid"}
          </button>
        </div>
      ),
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-x-2 items-center">
          <BsFillEyeFill
            onClick={() => {
              handleViewInvoice(row);
            }}
            className="cursor-pointer"
            size={20}
          />
          <PDFDownloadLink
            document={<InvoicePDF invoice={invoice}></InvoicePDF>}
          >
            <FaDownload
              onMouseOver={() => setInvoice(row)}
              className="cursor-pointer"
              size={20}
            />
          </PDFDownloadLink>

          <PDFDownloadLink
            document={<RecieptPDF invoice={invoice} />}
          >
            <FaDownload
              onMouseOver={() => setInvoice(row)}
              className="cursor-pointer"
              size={20}
            />
          </PDFDownloadLink>

          <FiEdit
            onClick={() => {
              handleModalEditInfo(row);
            }}
            className="cursor-pointer"
            size={20}
          />

          <RiDeleteBin4Line
            onClick={() => {
              onDelete(row?.id);
            }}

            className="cursor-pointer"
            size={20}
          />
        </div>
      ),
    },
  ];

  //  search filtering
  const setFiltering = (search) => {
    const filteredData = invoicesData?.invoices?.filter((item) =>
      item?.invoice_no?.toLowerCase()?.includes(search?.toLowerCase())
    );
    if (filteredData) {
      setFilterData(filteredData);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // HANDLE INVOICE VIEW WITH MODAL
  const handleViewInvoice = (data) => {
    setInvoice(data);
    setViewInvoiceOpen(true);
  };

  // ALL INVOICES
  if (invoicesIsLoading) {
    return <UseLoading />;
  }

  // console.log(invoice)
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

        <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center gap-y-3">
          <InvoiceDateFiltering
            handleStartDate={handleStartDate}
            handleEndDate={handleEndDate}
            handleDate={handleDate}
            handleDateClear={handleDateClear}
          />

          <div className="flex lg:flex-row justify-between gap-2">
            {/* Invoices download as CSV file */}
            <InvoicesAsCSV data={filterData} />
            {/* Invoices download as PDF file */}
            <button className="border border-[#0369A1] text-[#0369A1] px-2 py-1 text-sm rounded-md w-full sm:w-fit cursor-pointer">
              <PDFDownloadLink
                document={
                  <InvoicesAsPDF
                    data={filterData}
                    startDate={startDate}
                    endDate={endDate}
                  />
                }
                fileName="Invoices Report"
              >
                <span className="flex justify-center items-center gap-x-2">
                  <BsFiletypePdf size={20} /> Download as PDF
                </span>
              </PDFDownloadLink>
            </button>
          </div>
        </div>

        <div ref={allInvoicesRef} className="overflow-x-scroll">
          <DataTable
            columns={columns}
            data={filterData}
            pagination
            responsive
            paginationPerPage={itemsPerPage}
            paginationRowsPerPageOptions={[itemsPerPage, 5, 10, 15]}
            paginationTotalRows={filterData?.length}
            onChangePage={(page) => setCurrentPage(page)}
          />
        </div>
        <EditInvoice
          invoice={invoice}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
        <div>
          <ViewInvoice
            invoice={invoice}
            viewInvoiceOpen={viewInvoiceOpen}
            setViewInvoiceOpen={setViewInvoiceOpen}
          />
        </div>
      </DashboardBackground>
    </>
  );
};

export default InvoicesList;
