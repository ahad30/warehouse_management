import { array } from "prop-types";
import { RiDeleteBin6Line } from "react-icons/ri";

const AddedItemCalculation = ({ setAddedProduct, addedProduct }) => {
  console.log(addedProduct);
  const handleRemoveItem = (id) => {
    const filterItem = addedProduct?.filter((item) => item?.id !== id);
    setAddedProduct([...filterItem]);
  };

  return (
    <div className="">
      <div className="border-b border-gray-200 shadow">
        <table className="divide-y w-full  border  divide-gray-300 ">
          <thead className=" ">
            <tr className="">
              <th className="px-6 py-2 text-start text-xs text-gray-500">
                Product
              </th>
              <th className="px-6 py-2 text-start text-xs text-gray-500">
                Price
              </th>
              <th className="px-6 py-2 text-xs text-start text-gray-500">
                Sub Total
              </th>
              <th className="px-6 py-2 text-xs text-start text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {addedProduct?.map((item) => (
              <tr key={item?.id} className="whitespace-nowrap">
                <td className="px-6 py-2 text-sm text-gray-500">
                  {item?.product_name}
                </td>

                <td className="px-6 py-2 text-sm text-gray-500">
                  {Number(item?.product_sale_price).toFixed(2)}
                </td>

                <td className="px-6 flex py-2 text-sm text-gray-500">
                  {Number(item?.product_sale_price).toFixed(2)}
                </td>
                <td className="px-6  py-2 text-sm text-gray-500">
                  <RiDeleteBin6Line
                    onClick={() => handleRemoveItem(item?.id)}
                    className="text-red-500 cursor-pointer"
                    size={20}
                  ></RiDeleteBin6Line>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid grid-cols-1 p-2 lg:grid-cols-2 gap-3">
        {/* discount tax shipping start  */}
        <div className="flex  flex-col gap-y-4">
          {/*  tax */}
          <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg">
            <input
              placeholder="Tax"
              className="border-0 focus:border-0 focus:ring-0"
              type="text"
            />
            <span>%</span>
          </div>
          {/*  Discount */}
          <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg">
            <input
              placeholder="Discount"
              className="border-0 focus:border-0 focus:ring-0"
              type="text"
            />
            <span>$</span>
          </div>
          {/*  tax */}
          <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg">
            <input
              placeholder="Shipping"
              className="border-0 focus:border-0 focus:ring-0"
              type="text"
            />
            <span>$</span>
          </div>
        </div>
        {/* discount tax shipping end  */}

        {/* sidebar text Calculation start */}

        <div className="">
            <h1 className="text-2xl my-2 font-semibold">Sub Total {0.00}</h1>
            <h1 className="text-xl my-2 font-semibold">Total QTY {0.00}</h1>
        </div>
        {/* sidebar text Calculation end */}
      </div>
    </div>
  );
};

export default AddedItemCalculation;

AddedItemCalculation.propTypes = {
  addedProduct: array,
};
