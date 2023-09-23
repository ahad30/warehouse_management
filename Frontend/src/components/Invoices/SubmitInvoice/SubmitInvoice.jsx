import { ImDownload2, ImPrinter } from "react-icons/im";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineSave } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { resetState } from "../../../features/Invoice/InvoiceSlice";
import { useNewInvoiceMutation } from "../../../features/Invoice/InvoiceApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { logOut } from "../../../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";

const SubmitInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoice = useSelector((state) => state?.invoice);
  const [
    newInvoice,
    { isLoading, isError, error, isSuccess, data: newInvoiceData },
  ] = useNewInvoiceMutation();

  const handleNewInvoice = () => {
    console.log(invoice);
    /* let data = {
      calculation: {
        discount: 500,
        shipping: 200,
        subTotal: 17998,
        total: 17698,
      },
      company: {
        company_address: "Bahaddarhat, Chittagong.",
        company_email: "z8techh@gmail.com",
        company_name: "Z-Eight Tech",
        company_phone: "0126454604",
      },
      customer: {
        address: "Rahattar pul",
        email: "deaizy@gmail.com",
        id: 6,
        name: "Deaizy Apu",
        notes: null,
        phone: "01464654562",
      },
      items: [
        {
          category_id: 3,
          category_name: "Electronices",
          code: "NRC867M",
          desc: "NOVA Rice Cooker 867M, quantity: 2.5kg",
          id: 5,
          name: "NOVA Rice Cooker 867M",
          price: 8999,
          quantity: 2,
          unit: "kg",
        },
      ],
    };
    */
    let data = {
      invoice_no: "73684564rt",
      invoice_date: "12/03/2023",
      company_name: "hjksajk",
      company_email: "sgdjhsd@gmail.com",
      company_phone: "02389022121",
      company_address: "ajhgjas, ghgjgagjh, jhgjhg",

      customer_name: "jhdhhsa",
      customer_email: "demo1@gmail.com",
      customer_phone: "0123456789",
      customer_address: "jhsikas, hghuiasg, gbasdasd",
      discount: "150",
      shipping: "50",
      total: "500",
      items: [
        {
          product_id: "1",
          name: "uewyu",
          code: "jshjhgsj",
          quantity: "2",
          rate: "656",
          unit: "kg",
          description: "hbsxguygasej sakghkjasd",
        },
        {
          product_id: "2",
          name: "uewyu",
          code: "jshjhgsj",
          quantity: "2",
          rate: "656",
          unit: "kg",
          description: "hbsxguygasej sakghkjasd",
        },
      ],
    };
    console.log(data);
    newInvoice(data);
  };

  useEffect(() => {
    const handleApiError = (error) => {
      if (error?.originalStatus === 405) {
        toast.error("Invalid Token Please Re-Login!");
        return dispatch(logOut());
      } else {
        const errorMessage = error?.data?.message || error?.status;
        toast.error(errorMessage, { id: 1 });
      }
    };

    if (isError) {
      handleApiError(error);
    }
    if (isSuccess && newInvoiceData?.status) {
      toast.success(newInvoiceData?.message, { id: 1 });
      return navigate("/dashboard/product");
    }
  }, [
    isLoading,
    isError,
    error,
    isSuccess,
    newInvoiceData,
    dispatch,
    navigate,
  ]);

  console.log(isLoading, isError, error, isSuccess, newInvoiceData);

  const handleResetState = () => {
    dispatch(resetState());
    window.location.reload(false);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="btn-group border btn-group-vertical lg:btn-group-horizontal">
        <button
          onClick={handleNewInvoice}
          className="btn btn-success text-white"
        >
          <AiOutlineSave /> Save
        </button>
        <button className="btn btn-secondary text-white">
          {" "}
          <ImDownload2 /> Download
        </button>
        <button className="btn btn-accent text-white">
          {" "}
          <ImPrinter />
          Print
        </button>
        <button
          onClick={handleResetState}
          className="btn bg-red-600 text-white"
        >
          {" "}
          <GrPowerReset color="white" /> Reset
        </button>
      </div>
    </div>
  );
};

export default SubmitInvoice;
