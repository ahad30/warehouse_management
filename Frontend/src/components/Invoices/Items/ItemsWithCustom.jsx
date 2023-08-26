import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { deleteItem, getItem } from "../../../features/Invoice/InvoiceSlice";
import productData from "../../../Dashboard/Products/productData.json";

const ItemsWithCustom = () => {
  const data = useMemo(() => productData, []);
  console.log(data);

  const dispatch = useDispatch();
  const [itemList, setItems] = useState([]);
  const [item, setItem] = useState({
    id: "",
    itemName: "",
    description: "",
    rate: "",
    quantity: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
      id: itemList?.length + 1,
    }));
  };

  const handleAddItem = () => {
    let newItem;
    if (item) {
      newItem = {
        ...item,
      };
    }

    setItems([...itemList, newItem]);
    dispatch(getItem(newItem));

    setItem({
      itemName: "",
      description: "",
      rate: "",
      quantity: "",
    });
  };

  const handleDeleteItem = (id) => {
    const newItemList = itemList.filter((itm) => itm.id !== id);
    setItems(newItemList);
    dispatch(deleteItem(newItemList));
  };

  return (
    <div className="my-5">
      <h2 className="text-2xl font-bold mb-3">Items</h2>
      <form className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div>
          <label htmlFor="Item Name" className="">
            <p>Item Name:</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="itemName"
              value={item?.itemName}
              placeholder="Item Name"
              className="input input-bordered input-md w-full"
            />
          </label>
        </div>
        <div>
          <label htmlFor="description" className="">
            <p>Description:</p>
            <input
              onChange={handleInputChange}
              type="text"
              name="description"
              value={item.description}
              placeholder="Description"
              className="input input-bordered input-md w-full"
            />
          </label>
        </div>
        <div>
          <label htmlFor="invoice" className="">
            <p>Rate:</p>
            <input
              onChange={handleInputChange}
              type="number"
              name="rate"
              value={item.rate}
              placeholder="Rate"
              className="input input-bordered input-md w-full"
            />
          </label>
        </div>
        <div>
          <label htmlFor="invoice" className="">
            <p>Quantity:</p>
            <input
              onChange={handleInputChange}
              type="number"
              name="quantity"
              value={item.quantity}
              placeholder="Quantity"
              className="input input-bordered input-md w-full"
            />
          </label>
        </div>
      </form>
      <div className="flex justify-end">
        <button className="btn btn-primary btn-sm mt-2" onClick={handleAddItem}>
          Add item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="text-sm">#</th>
              <th className="text-sm">Item Name</th>
              <th className="text-sm">Description</th>
              <th className="text-sm">Rate</th>
              <th className="text-sm">Quantity</th>
              <th className="text-sm">Price</th>
              <th className="text-sm">
                <GiCancel />
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {itemList &&
              itemList?.map((itm, i) => {
                return (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{itm?.itemName}</td>
                    <td>{itm?.description}</td>
                    <td>{itm?.rate}</td>
                    <td>{itm?.quantity}</td>
                    <td>{itm?.quantity * itm?.rate}</td>
                    <td
                      onClick={() => handleDeleteItem(itm?.id)}
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

export default ItemsWithCustom;
