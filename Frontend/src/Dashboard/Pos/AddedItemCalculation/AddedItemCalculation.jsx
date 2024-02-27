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
      <div className="border-b   relative border-gray-200 shadow">
        <table className="divide-y  w-full absolute border  divide-gray-300 ">
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
                  <RiDeleteBin6Line onClick={()=> handleRemoveItem(item?.id)} className="text-red-500 cursor-pointer" size={20}>
                  </RiDeleteBin6Line>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddedItemCalculation;

AddedItemCalculation.propTypes = {
  addedProduct: array,
};
