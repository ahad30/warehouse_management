import { ImDownload2, ImPrinter } from "react-icons/im";
import { GrPowerReset } from "react-icons/gr";
import { AiOutlineSave } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getTotalPrice,
  resetState,
} from "../../../features/Invoice/InvoiceSlice";
import { useNewInvoiceMutation } from "../../../features/Invoice/InvoiceApi";

const Calculation = () => {
  const store = useSelector((state) => state.invoice);
  const { items } = store;
  const dispatch = useDispatch();

  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  let totalItemsPrice = items?.map(
    (item) => parseInt(item?.price) * item?.quantity
  );

  // redux
  const [newInvoice, { data }] = useNewInvoiceMutation();

  useEffect(() => {
    setSubTotalPrice(totalItemsPrice?.reduce((prev, cur) => prev + cur, 0));

    setTotalPrice(subTotalPrice - discountPrice + shippingCost);
  }, [totalItemsPrice, subTotalPrice, discountPrice, shippingCost]);

  // Total Price send to the Redux store
  useEffect(() => {
    let calculation = {
      subTotalPrice,
      discountPrice,
      shippingCost,
      totalPrice,
    };
    dispatch(getTotalPrice(calculation));
  }, [subTotalPrice, discountPrice, shippingCost, totalPrice, dispatch]);

  const handleNewInvoice = (data) => {
    console.log(data);
    newInvoice(data);
  };

  const handleDiscountPrice = (event) => {
    const { value } = event.target;
    setDiscountPrice(Number(value));
  };

  const handleShippingCost = (event) => {
    const { value } = event.target;
    setShippingCost(Number(value));
  };

  const handleResetState = () => {
    dispatch(resetState());
    window.location.reload(false);
  };
  console.log(data);
  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold mb-3">Calculations</h2>
      <div className="flex flex-col md:justify-end justify-items-end gap-5">
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Subtotal:</span>
          <input
            type="number"
            value={subTotalPrice}
            placeholder="Subtotal"
            className="input input-bordered w-full max-w-xs"
            readOnly
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Discount:</span>
          <input
            onChange={handleDiscountPrice}
            value={discountPrice}
            type="number"
            placeholder="Discount"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Shipping:</span>
          <input
            onChange={handleShippingCost}
            value={shippingCost}
            type="number"
            placeholder="Shipping"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Total:</span>
          <input
            type="number"
            value={totalPrice}
            placeholder="Total"
            className="input input-bordered w-full max-w-xs"
            readOnly
          />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="btn-group border btn-group-vertical lg:btn-group-horizontal">
          <button
            onClick={() => handleNewInvoice(store)}
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
    </div>
  );
};

export default Calculation;
