import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SubmitInvoice from "../SubmitInvoice/SubmitInvoice";
import { getTotalPrice } from "../../../../features/Invoice/invoiceSlice";
import { useGetDefaultSettingsQuery } from "../../../../features/Settings/settingsApi";

const Calculation = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state?.invoice);
  const { data: defaultSettings } = useGetDefaultSettingsQuery();

  const settings = defaultSettings?.settings;

  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(settings?.discount);
  const [shipping, setShipping] = useState(settings?.shipping);
  const [total, setTotal] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [due, setDue] = useState(0);

  let totalItemsPrice = items?.map(
    (item) => parseInt(item?.product_sale_price) * item?.quantity
  );

  useEffect(() => {
    setSubTotal(totalItemsPrice?.reduce((prev, cur) => prev + cur, 0));

    setTotal(subTotal - (subTotal * discount) / 100 + shipping);
    setDue(total - paidAmount);
  }, [
    totalItemsPrice,
    subTotal,
    discount,
    shipping,
    total,
    setDue,
    paidAmount,
  ]);

  // Total Price send to the Redux store
  useEffect(() => {
    let calculation = {
      subTotal,
      discount,
      shipping,
      total,
      paidAmount,
      due,
    };

    dispatch(getTotalPrice(calculation));
  }, [subTotal, discount, shipping, total, paidAmount, due, dispatch]);

  const handleDiscountPrice = (event) => {
    const { value } = event.target;
    setDiscount(Number(value));
  };

  const handleShippingCost = (event) => {
    const { value } = event.target;
    setShipping(Number(value));
  };

  const handlePaidAmount = (event) => {
    const { value } = event.target;
    setPaidAmount(Number(value));
  };

  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold mb-3">Calculations</h2>
      <div className="flex flex-col md:justify-end justify-items-end gap-5">
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Subtotal:</span>
          <input
            type="number"
            value={subTotal}
            placeholder="Subtotal"
            className="input input-bordered w-full max-w-xs"
            disabled
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Discount (%):</span>
          <input
            onChange={handleDiscountPrice}
            value={discount}
            type="number"
            placeholder="Discount"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Shipping:</span>
          <input
            onChange={handleShippingCost}
            value={shipping}
            type="number"
            placeholder="Shipping"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Total:</span>
          <input
            type="number"
            value={total.toFixed(2)}
            placeholder="Total"
            className="input input-bordered w-full max-w-xs"
            disabled
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Paid:</span>
          <input
            type="number"
            onChange={handlePaidAmount}
            value={paidAmount}
            placeholder="Paid"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Due:</span>
          <input
            type="number"
            value={due.toFixed(2)}
            placeholder="Paid"
            className="input input-bordered w-full max-w-xs"
            disabled
          />
        </div>
        <div>
          <SubmitInvoice />
        </div>
      </div>
    </div>
  );
};

export default Calculation;
