import { array, number } from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

import { RxReset } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import { useNewInvoiceMutation } from "../../../features/Invoice/InvoiceApi";
import { UseErrorMessages } from "../../../components/Reusable/UseErrorMessages/UseErrorMessages";
import useShowAsyncMessage from "../../../components/Reusable/UseShowAsyncMessage/useShowAsyncMessage";

const AddedItemCalculation = ({ setAddedProduct, addedProduct }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0.0);
  const [error, setError] = useState(false);

  const handleRemoveItem = (id) => {
    const filterItem = addedProduct?.filter((item) => item?.id !== id);
    setAddedProduct([...filterItem]);
  };

  const addedProductPrice = addedProduct?.reduce(
    (accumulator, currentValue) => {
      return accumulator + Number(currentValue?.product_sale_price);
    },
    0
  );

  useEffect(() => {
    const addedProductPrice = addedProduct?.reduce(
      (accumulator, currentValue) => {
        return accumulator + Number(currentValue?.product_sale_price);
      },
      0
    );
    setTotalPrice(addedProductPrice);
  }, [addedProduct]);

  //   console.log(totalPrice);
  const handleTextAndDiscount = (value, from) => {
    if (value < 0) {
      setError(true);
      return toast.error("Value must be greater than zero");
    }

    const count =
      from === "Discount"
        ? Number(totalPrice) - Number(totalPrice) * (Number(value) / 100)
        : from === "Tax"
        ? Number(totalPrice) + Number(totalPrice) * (Number(value) / 100)
        : 0;
    if (count < 0) {
      setError(true);
      toast.error("Provided Value is too high");
    } else {
      setError(false);
      if (from === "Discount") {
        setDiscount(value);
      }
      if (from === "Tax") {
        setTax(value);
      }
      setTotalPrice(count);
    }
  };
  const handleShipping = (value) => {
    if (value < 0) {
      setError(true);
      return toast.error("Value must be greater than zero");
    }
    const count = Number(totalPrice) + Number(value);
    if (count < 0) {
      setError(true);
      toast.error("Provided Value is too high");
    } else {
      setError(false);
      setShipping(value);
      setTotalPrice(count);
    }
  };
  const [
    createNewPos,
    { data, isError, isLoading, isSuccess, error: posError },
  ] = useNewInvoiceMutation();
  const createPos = () => {
    createNewPos({
      items: addedProduct?.map((item) => item?.id),
      discount: Number(discount),
      shipping: Number(shipping),
      tax: Number(tax),
    });
  };

  useShowAsyncMessage(isLoading, isError, posError, isSuccess, data);
  UseErrorMessages(posError);
  useEffect(() => {
    if (isSuccess) {
      setAddedProduct([]);
      setDiscount(0);
      setTax(0);
      setDiscount(0);
    }
  }, [isSuccess]);
  return (
    <div className="">
      <div className="h-[400px] overflow-y-scroll  scrollbar-0">
        <table className="divide-y w-full    divide-gray-300 ">
          <thead className="border">
            <tr className="">
              <th className=" py-2 text-center text-xs text-gray-500">#</th>
              <th className=" py-2 text-center text-xs text-gray-500">
                Product
              </th>
              <th className=" py-2 text-center text-xs text-gray-500">Price</th>

              <th className=" py-2 text-xs text-center text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {addedProduct?.map((item, index) => (
              <tr key={item?.id} className="whitespace-nowrap w-full">
                <td className="text-center py-2 text-sm text-gray-500">
                  {index}
                </td>
                <td className="text-center py-2 text-sm text-gray-500">
                  {item?.product_name}
                </td>

                <td className="text-center  py-2 text-sm text-gray-500">
                  {Number(item?.product_sale_price).toFixed(2)}
                </td>
                <td className="flex justify-center  py-2 text-sm text-gray-500">
                  <RiDeleteBin6Line
                    onClick={() => handleRemoveItem(item?.id)}
                    className="text-red-500 cursor-pointer"
                    size={20}
                  ></RiDeleteBin6Line>
                </td>
              </tr>
            ))}

            <tr className="">
              {" "}
              {addedProduct?.length === 0 && (
                <td
                  colSpan={4}
                  className="text-center w-full text-xl mt-12 py-4"
                >
                  No data Found
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="absolute bottom-7 bg-white   lg:px-3">
        {/* calculated section */}
        <div className="mt-12 grid grid-cols-1 p-2 lg:grid-cols-2 gap-3 items-center">
          {/* discount tax shipping start  */}
          <div className="flex flex-col gap-y-4">
            {/*  tax */}
            <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg">
              <input
                placeholder="Tax"
                className="border-0  w-full focus:border-0 focus:ring-0"
                type="number"
                value={Number(tax) == 0 ? "tax" : tax}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setTax(value);
                    handleTextAndDiscount(e.target?.value, "Tax");
                  }
                }}
              />

              <span>%</span>
            </div>
            {/*  Discount */}
            <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg">
              <input
                placeholder="Discount"
                className="border-0 focus:border-0 w-full focus:ring-0"
                type="number"
                // value={Number(discount) == 0 ? "Discount" : discount}
                value={Number(discount) < 100 && discount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setDiscount(value);
                    handleTextAndDiscount(value, "Discount");
                  }
                }}
              />
              <span>%</span>
            </div>
            {/*  shipping */}
            <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg">
              <input
                placeholder="Shipping"
                className="border-0 w-full focus:border-0 focus:ring-0"
                type="number"
                value={Number(shipping) == 0 ? "Shipping" : shipping}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setShipping(value);
                    handleShipping(value);
                  }
                }}
              />
              <span>$</span>
            </div>
          </div>
          {/* discount tax shipping end  */}

          {/* sidebar text Calculation start */}

          <div className=" text-right font-poppins">
            <p className="text-lg text-gray-600 my-2 font-semibold">
              Sub Total: {Number(addedProductPrice).toFixed(2)}
            </p>
            <p className="text-2xl my-2 font-semibold">
              Total: {Number(totalPrice).toFixed(2)}
            </p>
          </div>
          {/* sidebar text Calculation end */}
        </div>

        {/* button section */}
        <div className="flex gap-x-3 p-2">
          <div
            onClick={() => setAddedProduct([])}
            className=" cursor-pointer bg-red-500 w-1/2 py-3 rounded-lg flex justify-center items-center gap-x-4 text-xl font-medium text-white"
          >
            <p>Reset</p>
            <RxReset size={25}></RxReset>
          </div>

          <div
            onClick={() => createPos()}
            className={`bg-[#2FC989] w-1/2 py-3 rounded-lg flex justify-center items-center gap-x-4 text-xl font-medium text-white ${
              error === true
                ? "disabled  cursor-none bg-green-200"
                : "cursor-pointer bg-[#2FC989] "
            }`}
          >
            <p>Submit</p>
            <MdDone size={25}></MdDone>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedItemCalculation;

AddedItemCalculation.propTypes = {
  addedProduct: array,
};
