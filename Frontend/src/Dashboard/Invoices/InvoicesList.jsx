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
  const handlePrint = useReactToPrint({
    content: () => reference.current,
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

  console.log(invoice);

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
          Invoices {invoicesData?.invoices?.length}
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
          <div ref={reference} className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setViewInvoiceOpen(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative max-w-7xl p-4 mx-auto bg-white rounded-md shadow-lg">
                {/* Invoice view section start */}
                <div>
                  <div className="md:min-w-[700px] h-[1100px] max-w-full p-5">
                    {/* Invoice from */}
                    <div className="flex justify-between items-center border-b-2 pb-5 my-5">
                      <div>
                        <img
                          className="w-28"
                          src={
                            companyInfo?.company_info?.company_img
                              ? `${
                                  import.meta.env
                                    .VITE_REACT_APP_PUBLIC_IMAGE_PORT
                                }/uploads/companyInfo/${
                                  companyInfo?.company_info?.company_img
                                }`
                              : "https://z8tech.dev/wp-content/uploads/2022/11/tras_ZL-01-removebg-preview.png"
                          }
                          alt={companyInfo?.company_info?.company_img}
                        />
                      </div>
                      <div>
                        <h5 className="text-2xl font-bold">
                          Invoice:
                          <span className="text-gray-400">
                            {" "}
                            {invoice?.invoice_no}
                          </span>
                        </h5>
                        <p className="text-lg">Date: {invoice?.issue_date}</p>
                      </div>
                    </div>

                    {/* Invoice to */}
                    <div className="flex justify-between items-center border-b-2 pb-5 my-5">
                      <div>
                        <h5 className="text-xl font-bold ">Invoice From</h5>
                        <div className="text-[#84878B] ">
                          <p>{companyInfo?.company_info?.company_name}</p>
                          <p>{companyInfo?.company_info?.company_email}</p>
                          <p>{companyInfo?.company_info?.company_phone}</p>
                          <p>{companyInfo?.company_info?.company_address}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-xl font-bold text-right">
                          Invoice To
                        </h5>
                        <div className="text-[#84878B] text-right">
                          <h5>{invoice?.customer?.name}</h5>
                          <p>{invoice?.customer?.phone}</p>
                          <p>{invoice?.customer?.email}</p>
                          <p>{invoice?.customer?.address} </p>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <table className="table table-zebra border rounded-lg">
                        {/* head */}
                        <thead>
                          <tr>
                            <th className="text-sm font-extrabold">#</th>
                            <th className="text-sm font-extrabold">
                              Item Name
                            </th>
                            <th className="text-sm font-extrabold">Price</th>
                            <th className="text-sm font-extrabold">Quantity</th>
                            <th className="text-sm font-extrabold">
                              {defaultSettings?.settings?.taxation || "Tax"}%
                            </th>
                            <th className="text-sm font-extrabold">
                              Total Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* row 1 */}
                          {invoice?.saleitems?.map((item, i) => {
                            return (
                              <tr key={i}>
                                <th>{i + 1}</th>
                                <td>{item?.name}</td>
                                <td>{item?.rate}</td>
                                <td>{item?.quantity}</td>
                                <td>{item?.tax}%</td>
                                <td>{item?.total_price_quantity_tax}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    {/* Calculation */}
                    <div className="flex justify-between mt-28">
                      <div className="flex items-center gap-5 w-20">
                        <QRCodeCanvas
                          size={70}
                          value={`${invoice?.invoice_no} at ${invoice?.issue_date} for ${invoice?.customer?.name}`}
                        />
                        <p
                          className={`font-semibold text-xl rounded-lg  px-3 py-1 ${
                            invoice?.status === 0
                              ? "text-[#DC2626]"
                              : "text-[#16A34A]"
                          }`}
                        >
                          {invoice?.status === 0 ? "Due" : "Paid"}
                        </p>
                      </div>
                      <div className="border rounded-lg p-5 my-5 space-y-2 w-[300px]">
                        <p className="flex justify-between items-center">
                          <span className="text-bold text-xl text-right">
                            Subtotal:
                          </span>
                          <span className="text-gray-500 text-lg">
                            {defaultSettings?.settings?.currency}
                            {invoice?.sub_total}
                          </span>
                        </p>
                        <p className="flex justify-between items-center">
                          <span className="text-bold text-xl text-right">
                            Discount:
                          </span>
                          <span className="text-gray-500 text-lg">
                            {invoice?.discount}%
                          </span>
                        </p>
                        <p className="flex justify-between items-center">
                          <span className="text-bold text-xl text-right">
                            Shipping:
                          </span>
                          <span className="text-gray-500 text-lg">
                            {defaultSettings?.settings?.currency}

                            {invoice?.shipping}
                          </span>
                        </p>
                        <p className="flex justify-between items-center text-[#383FE1] font-bold">
                          <span className="text-bold text-xl text-right">
                            Total:
                          </span>
                          <span className=" text-lg">
                            {defaultSettings?.settings?.currency}{" "}
                            {invoice?.total}
                          </span>
                        </p>
                        <p className="flex justify-between items-center text-[green] font-bold">
                          <span className="text-bold text-xl text-right">
                            Paid:
                          </span>
                          <span className=" text-lg">
                            {defaultSettings?.settings?.currency}{" "}
                            {invoice?.paid_amount}
                          </span>
                        </p>
                        <p className="flex justify-between items-center text-[red] font-bold">
                          <span className="text-bold text-xl text-right">
                            Due:
                          </span>
                          <span className=" text-lg">
                            {defaultSettings?.settings?.currency}
                            {invoice?.due_amount}
                          </span>
                        </p>
                      </div>
                    </div>
                    {defaultSettings?.settings?.footer_note && (
                      <p className="text-center italic">
                        {defaultSettings?.settings?.footer_note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end */}
        </div>
      </DashboardBackground>
    </>
  );
};

export default InvoicesList;
