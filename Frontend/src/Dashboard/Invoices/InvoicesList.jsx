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
import { BsFiletypePdf, BsFillEyeFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { FaDownload } from "react-icons/fa";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../../components/PDF/InvoicePDF";
import DataTable from "react-data-table-component";
import InvoiceAsCSV from "./InvoiceAsCSV";

const InvoicesList = () => {
  UseTitle("Invoices");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewInvoiceOpen, setViewInvoiceOpen] = useState(false);
  const [invoice, setInvoice] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 10;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: invoicesData,
    isLoading: invoicesIsLoading,
    refetch,
  } = useGetInvoicesQuery({ startDate, endDate });

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
      selector: "invoice_no",
      sortable: true,
    },
    {
      name: "Invoice Date",
      selector: "issue_date",
    },
    {
      name: "Customer Name",
      selector: "customer.name",
    },
    {
      name: "Total",
      selector: "total",
    },

    {
      name: "Paid",
      selector: "paid_amount",
    },
    {
      name: "Due",
      selector: "due_amount",
    },
    {
      name: "Status",
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

          <PDFDownloadLink document={<InvoicePDF invoiceData={invoice} />}>
            <FaDownload className="cursor-pointer" size={20} />
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
              onDelete(1);
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
          <div className="flex flex-col lg:flex-row gap-2">
            <label htmlFor="from">
              Start:
              <input
                className="input input-sm input-bordered"
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label htmlFor="to">
              End:
              <input
                className="input input-sm input-bordered"
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button
              onClick={() => refetch()}
              className="bg-[#0369A1] text-white rounded-md px-3 py-1"
            >
              Go
            </button>
          </div>

          <div className="flex lg:flex-row justify-between gap-2">
            <InvoiceAsCSV data={filterData} />
            <button className="flex items-center gap-x-2 text-[white] bg-[#0369A1] px-3 py-2 rounded-md w-full sm:w-fit cursor-pointer">
              <BsFiletypePdf size={20} /> Download as PDF
            </button>
          </div>
        </div>

        <div className="overflow-x-scroll">
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
