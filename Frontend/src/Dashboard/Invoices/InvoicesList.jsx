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
import ViewInvoice from "./ViewInvoice/ViewInvoice";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import { RiDeleteBin4Line } from "react-icons/ri";
import { BsFiletypePdf, BsPrinter } from "react-icons/bs";
import { FiEdit, FiEye } from "react-icons/fi";
import { MdOutlineReceiptLong } from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF/InvoicePDF";
import DataTable from "react-data-table-component";
import InvoicesAsCSV from "./InvoicesAsCSV";
import InvoiceDateFiltering from "./InvoiceDateFiltering";
import InvoicesAsPDF from "./InvoicesAsPDF.jsx";
import RecieptPDF from "./InvoicePDF/RecieptPdf";
import { AiOutlineFilePdf } from "react-icons/ai";
import {
  useGetCompanyInfoQuery,
  useGetDefaultSettingsQuery,
} from "../../features/Settings/settingsApi";
import { useReactToPrint } from "react-to-print";
import { FaDownload } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import DeleteConformation from "../../components/DeleteConformationAlert/DeletConformation";
import InvoicePrint from "./InvoicePrint";

const InvoicesList = () => {
  UseTitle("Invoices");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewInvoiceOpen, setViewInvoiceOpen] = useState(false);
  const [invoice, setInvoice] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 11;
  // const { data: companyInfo } = useGetCompanyInfoQuery();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(null);
  const [companyDetails, setCompanyDetails] = useState({});
  const [defaultSettings, setDefaultSetting] = useState({});
  const [companyImg, setCompanyImg] = useState(null);
  const reference = useRef();
  const pageStyle = `{ size: 2.5in 4in }`;

  const handlePrint = useReactToPrint({
    content: () => reference.current,
    pageStyle: pageStyle,
  });
  const { data: invoicesData, isLoading: invoicesIsLoading } =
    useGetInvoicesQuery({ startDate, endDate, date });
  const { data: settingsData } = useGetDefaultSettingsQuery();

  const { data: companyInfo } = useGetCompanyInfoQuery();
  // const { data: } = useGetCompanyInfoQuery();

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
    setDate(date);
    setStartDate(null);
    setEndDate(null);
  };

  const handleDateClear = () => {
    setStartDate(null);
    setEndDate(null);
    setDate(null);
  };

  // DELETE STARTS
  const onDelete = (id) => {
    DeleteConformation(id, () => deleteInvoice(id)(id));
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

    if (companyInfo?.company_info) {
      const path = `${
        import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
      }/uploads/companyInfo/${companyInfo?.company_info?.company_img}`;
      setCompanyImg(path);
    }

    setCompanyDetails(companyInfo?.company_info);
    setDefaultSetting(settingsData?.settings);
  }, [
    deleteIsLoading,
    deleteIsError,
    deleteError,
    deleteIsSuccess,
    deleteData,
    companyInfo?.company_info,
    companyInfo,
    settingsData,
    settingsData?.settings,
  ]);
  console.log(companyDetails);
  // DELETE ENDS

  // EDIT STARTS
  const handleModalEditInfo = (invoice) => {
    setInvoice(invoice);
    setModalIsOpen(true);
  };
  // EDIT ENDS

  // HANDLE INVOICE VIEW WITH MODAL
  const handleViewInvoice = (data) => {
    setInvoice(data);
    setViewInvoiceOpen(true);
  };

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

  // SEARCH FILTERING STARTS
  // console.log(companyImg)
  const columns = [
    {
      name: "Invoice no",
      selector: (row) => <>{row?.invoice_no}</>,
    },
    {
      name: "Invoice Date",
      selector: (row) => <>{row?.issue_date}</>,
    },
    {
      name: "Customer Name",
      selector: (row) => <>{row?.customer?.name}</>,
    },
    {
      name: "Total",
      selector: (row) => <>{parseFloat(row?.total).toFixed(2)}</>,
    },

    {
      name: "Paid",
      selector: (row) => <>{parseFloat(row?.paid_amount).toFixed(2)}</>,
    },
    {
      name: "Due",
      selector: (row) => <>{parseFloat(row?.due_amount).toFixed(2)}</>,
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
        <div
          onMouseOver={() => setInvoice(row)}
          className="flex gap-x-2 items-center"
        >
          <FiEye
            onClick={() => {
              handleViewInvoice(row);
            }}
            className="cursor-pointer"
            title="View Invoice"
            size={20}
          />
          <button onMouseOver={() => setInvoice(row)} onClick={handlePrint}>
            <BsPrinter size={20}></BsPrinter>
          </button>
          <PDFDownloadLink
            document={
              <InvoicePDF
                defaultSettings={defaultSettings}
                companyDetails={companyDetails}
                invoice={invoice}
                companyImg={companyImg}
              ></InvoicePDF>
            }
          >
            <AiOutlineFilePdf
              onMouseOver={() => setInvoice(row)}
              className="cursor-pointer"
              title="A4 PDF Download"
              size={20}
            />
          </PDFDownloadLink>

          <PDFDownloadLink
            document={
              <RecieptPDF
                defaultSettings={defaultSettings}
                companyDetails={companyDetails}
                invoice={invoice}
                companyImg={companyImg}
              />
            }
          >
            <MdOutlineReceiptLong
              onMouseOver={() => setInvoice(row)}
              className="cursor-pointer"
              title="Receipt Download"
              size={20}
            />
          </PDFDownloadLink>

          <FiEdit
            onClick={() => {
              handleModalEditInfo(row);
            }}
            className="cursor-pointer"
            title="Edit Invoice"
            size={20}
          />

          <RiDeleteBin4Line
            onClick={() => {
              onDelete(row?.id);
            }}
            className="cursor-pointer"
            title="Delete Invoice"
            size={20}
          />
        </div>
      ),
    },
  ];

  // ALL INVOICES Loading
  if (invoicesIsLoading) {
    return <UseLoading />;
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          Invoices: {invoicesData?.invoices?.length}
        </TableHeadingTitle>

        <SearchAndAddBtn
          btnTitle={"Add Invoice"}
          btnPath={"/dashboard/invoice/new"}
          btnIcon={<BiCartAdd size={20} />}
          setFiltering={setFiltering}
        />

        <div className="flex lg:flex-row justify-end gap-2">
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

        {/* filtering */}
        <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center gap-y-3">
          <InvoiceDateFiltering
            handleStartDate={handleStartDate}
            handleEndDate={handleEndDate}
            handleDate={handleDate}
            handleDateClear={handleDateClear}
          />
        </div>

        <div>
          <DataTable
            columns={columns}
            data={filterData}
            pagination
            responsive
            paginationPerPage={itemsPerPage}
            paginationRowsPerPageOptions={[itemsPerPage, 5, 10, 15]}
            paginationTotalRows={filterData?.length}
            onChangePage={(page) => setCurrentPage(page)}
            key="id"
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

        {/* hidden */}
        <div className="hidden">
          {/* start */}
          <div className="" ref={reference}>
            <InvoicePrint
              invoice={invoice}
              companyInfo={companyInfo}
              defaultSettings={defaultSettings}
            ></InvoicePrint>
          </div>
          {/* <div ref={reference} ><InvoicePDF
            defaultSettings={defaultSettings}
            companyDetails={companyDetails}
            invoice={invoice}
            companyImg={companyImg}
           ></InvoicePDF></div> */}
          {/* end */}
        </div>
      </DashboardBackground>
    </>
  );
};

export default InvoicesList;
