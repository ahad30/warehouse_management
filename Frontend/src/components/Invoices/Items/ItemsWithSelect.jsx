import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { deleteItem, getItem } from "../../../features/Invoice/invoiceSlice";
// import productData from "../../../Dashboard/Products/productData.json";
import { array } from "prop-types";

const ItemsWithSelect = ({ products }) => {
  const dispatch = useDispatch();
  console.log(products);
  const [selectedItem, setSelectedItem] = useState({});
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [itemList, setItemList] = useState([]);

  // SELECT AN ITEM FROM DATA FOR ADD TO INVOICE LIST
  const handleSelectedItem = (id) => {
    const matchedItem = products?.find((item) => item.id == id);
    setSelectedItem(matchedItem);
  };

  // GET QUANTITY BY ONCHANGE
  const handleQuantity = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  // SET ITEM AFTER GETTING QUANTITY
  useEffect(() => {
    setItem({ ...selectedItem, quantity });
  }, [selectedItem, quantity, dispatch]);

  // ADD TO ITEM LIST
  const handleAddItem = () => {
    if (item) {
      setItemList([...itemList, item]);
      dispatch(getItem(item));
      setSelectedItem({});
      setQuantity(1);
    }
  };

  // DELETE FROM ITEM LIST
  const handleDeleteItem = (id) => {
    const newItemList = itemList.filter((itm) => itm.id !== id);
    setItemList(newItemList);
    dispatch(deleteItem(newItemList));
  };

  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold mb-3">Items</h2>
      {/* <form> */}
      <div className="grid md:grid-cols-2 lg:grid-cols-[2fr_1fr_2fr_1fr_1fr_1fr] gap-2">
        <div>
          <label htmlFor="Item Name" className="">
            <p>Item Name:</p>
            <select
              className="select select-bordered w-full"
              onChange={(e) => handleSelectedItem(e.target.value)}
              name="product_name"
            >
              <option value="">Select Product</option>
              {products?.map((item, i) => (
                <option key={i} value={item?.id}>
                  {item?.product_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="description" className="">
            <p>Code:</p>
            <input
              type="text"
              name="product_code"
              placeholder="Code"
              className="input input-bordered input-md w-full"
              defaultValue={selectedItem?.product_code}
              disabled
            />
          </label>
        </div>
        <div>
          <label htmlFor="invoice" className="">
            <p>Price:</p>
            <input
              type="number"
              name="product_sale_price"
              placeholder="Price"
              className="input input-bordered input-md w-full"
              value={Number(selectedItem?.product_sale_price)}
              disabled
            />
          </label>
        </div>
        <div>
          <label htmlFor="invoice" className="">
            <p>Quantity:</p>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              className="input input-bordered input-md w-full"
              onChange={handleQuantity}
              required
              defaultValue={quantity}
            />
          </label>
        </div>
        <div>
          <label htmlFor="description" className="">
            <p>Unit:</p>
            <input
              type="text"
              name="product_unit"
              placeholder="Unit"
              className="input input-bordered input-md w-full"
              defaultValue={selectedItem?.product_unit}
              disabled
            />
          </label>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="btn btn-primary btn-sm mt-2"
          disabled={!selectedItem?.product_name}
          onClick={handleAddItem}
        >
          Add item
        </button>
      </div>
      {/* </form> */}

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="text-sm">#</th>
              <th className="text-sm">Item Name</th>
              <th className="text-sm">Code</th>
              <th className="text-sm">Price</th>
              <th className="text-sm">Quantity</th>
              <th className="text-sm">Unit</th>
              <th className="text-sm">Total Price</th>
              <th className="text-sm">
                <GiCancel />
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {itemList &&
              itemList?.map((item, i) => {
                return (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{item?.product_name}</td>
                    <td>{item?.product_code}</td>
                    <td>{item?.product_sale_price}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.product_unit}</td>
                    <td>{item?.quantity * item?.product_sale_price}</td>
                    <td
                      onClick={() => handleDeleteItem(item?.id)}
                      className="cursor-pointer"
                    >
                      <AiOutlineDelete size={20} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ItemsWithSelect.propTypes = {
  products: array,
};

export default ItemsWithSelect;
