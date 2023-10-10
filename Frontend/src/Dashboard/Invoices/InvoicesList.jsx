import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { BiCartAdd } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { AiOutlinePrinter } from "react-icons/ai";
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
import DeleteConformation from "../../components/DeleteConformationAlert/DeletConformation";
import InvoicesAsCSV from "./InvoicesAsCSV";
import InvoiceDateFiltering from "./InvoiceDateFiltering";
import InvoicesAsPDF from "./InvoicesAsPDF.jsx";


const InvoicesList = () => {
  UseTitle("Invoices");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewInvoiceOpen, setViewInvoiceOpen] = useState(false);
  const [invoice, setInvoice] = useState({});
  const allInvoicesRef = useRef();

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
    
    DeleteConformation(id,()=> deleteInvoice(id))
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


 


  console.log(invoice)
  // SEARCH FILTERING STARTS
  const columns = [
    {
      name: "Invoice no",
      // selector: "invoice_no",
      selector: (row)=> <>{row?.invoice_no}</>,
      sortable: true,
    },
    {
      name: "Invoice Date",
      // selector: "issue_date",
      selector: (row)=> <>{row?.issue_date}</>,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => <td>{row?.customer?.name}</td>,
    },
    {
      name: "Total",
      // selector: "total",
      selector: (row)=> <>{row?.total}</>,
    },

    {
      name: "Paid",
      // selector: "paid_amount",
      selector: (row)=> <>{row?.paid_amount}</>,
    },
    {
      name: "Due",
      // selector: "due_amount",
      selector: (row)=> <>{row?.due_amount}</>,
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

          <AiOutlinePrinter size={20} className="cursor-pointer" />

          <PDFDownloadLink
            document={<InvoicePDF  invoice={invoice && invoice} />}
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

  console.log(filterData);

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
          <InvoiceDateFiltering
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            refetch={refetch}
          />

          <div className="flex lg:flex-row justify-between gap-2">
            <InvoicesAsCSV data={filterData} />
            {/* <InvoicesAsPDF data={filterData} /> */}
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
              <button className="flex items-center gap-x-2 border border-[#0369A1] text-[#0369A1] px-3 py-2 rounded-md w-full sm:w-fit cursor-pointer">
                <BsFiletypePdf size={20} /> Download as PDF
              </button>
            </PDFDownloadLink>
          </div>
        </div>

        <div ref={allInvoicesRef} className="overflow-x-scroll ">
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
