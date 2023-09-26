import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTotalPrice } from "../../../features/Invoice/invoiceSlice";

const Calculation = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice);
  const { items, calculation } = invoice;

  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  let totalItemsPrice = items?.map(
    (item) => parseInt(item?.price) * item?.quantity
  );

  useEffect(() => {
    setSubTotal(totalItemsPrice?.reduce((prev, cur) => prev + cur, 0));

    setTotal(subTotal - discount + shipping);
  }, [totalItemsPrice, subTotal, discount, shipping]);

  // Total Price send to the Redux store
  useEffect(() => {
    let calculation = {
      subTotal,
      discount,
      shipping,
      total,
    };

    dispatch(getTotalPrice(calculation));
  }, [subTotal, discount, shipping, total, dispatch]);

  const handleDiscountPrice = (event) => {
    const { value } = event.target;
    setDiscount(Number(value));
  };

  const handleShippingCost = (event) => {
    const { value } = event.target;
    setShipping(Number(value));
  };

  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold mb-3">Calculations</h2>
      <div className="flex flex-col md:justify-end justify-items-end gap-5">
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Subtotal:</span>
          <input
            type="number"
            defaultValue={calculation?.subTotal}
            placeholder="Subtotal"
            className="input input-bordered w-full max-w-xs"
            readOnly
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Discount:</span>
          <input
            onChange={handleDiscountPrice}
            defaultValue={discount}
            type="number"
            placeholder="Discount"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Shipping:</span>
          <input
            onChange={handleShippingCost}
            defaultValue={shipping}
            type="number"
            placeholder="Shipping"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex justify-end items-center ">
          <span className="mr-2 text-xl">Total:</span>
          <input
            type="number"
            defaultValue={calculation?.total}
            placeholder="Total"
            className="input input-bordered w-full max-w-xs"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Calculation;
