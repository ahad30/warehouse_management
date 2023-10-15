import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { array } from "prop-types";
import { toast } from "react-hot-toast";
import { deleteItem, getItem } from "../../../../features/Invoice/invoiceSlice";
import { useGetCategoriesQuery } from "../../../../features/Category/categoryApi";
import { useGetBrandsQuery } from "../../../../features/Brand/brandApi";

const ItemsWithSelect = ({ products }) => {
  const dispatch = useDispatch();
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: brandsData } = useGetBrandsQuery();

  const [selectedItem, setSelectedItem] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
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
  }, [selectedItem, quantity]);

  //
  const filteredProducts = products
    ?.filter(
      (product) =>
        selectedCategory == "" || product?.category_id == selectedCategory
    )
    ?.filter(
      (product) => selectedBrand == "" || product?.brand_id == selectedBrand
    );

  // ADD TO ITEM LIST
  const handleAddItem = () => {
    if (item) {
      let existItem = itemList.find((Item) => Item?.id === item?.id);
      if (existItem) {
        return toast.error("Item already added", { id: 1 });
      } else if (!existItem) {
        setItemList([...itemList, item]);
        setSelectedItem({});
        setQuantity(1);
      }
    }
  };

  useEffect(() => {
    dispatch(getItem(itemList));
  }, [dispatch, itemList]);

  // DELETE FROM ITEM LIST
  const handleDeleteItem = (id) => {
    const newItemList = itemList.filter((itm) => itm.id !== id);
    setItemList(newItemList);
    dispatch(deleteItem(newItemList));
  };

  return (
    <div className="my-5">
      <div className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg p-5">
        <h1 className="text-2xl font-semibold mb-9">Select item</h1>
        {/* Select Category or Brand */}
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <label htmlFor="">
            Select category
            <select
              className="select select-bordered my-3 w-full"
              onChange={(e) => setSelectedCategory(e?.target?.value)}
              value={selectedCategory}
            >
              <option value={""}>Select Category</option>
              {categoryData?.categories?.map((category, idx) => (
                <option key={idx} value={category?.id}>
                  {category?.category_name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Select brand
            <select
              className="select select-bordered w-full my-3"
              onChange={(e) => setSelectedBrand(e?.target?.value)}
              value={selectedBrand}
            >
              <option value={""}>Select Brand</option>
              {brandsData?.brands?.map((brand) => (
                <option value={brand?.id} key={brand?.id}>
                  {brand?.brand_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* Select Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-2 items-start">
          <div>
            <label htmlFor="description">
              <p>Code:</p>
              <input
                type="text"
                name="product_code"
                placeholder="Code"
                className="input input-bordered my-3 input-md w-full"
                defaultValue={selectedItem?.product_code}
                readOnly
              />
            </label>
          </div>
          <div>
            <label htmlFor="Item Name">
              <p>Item Name:</p>
              <select
                className="select select-bordered  my-3 w-full"
                onChange={(e) => handleSelectedItem(e.target.value)}
                name="product_name"
              >
                <option value="">Select Product</option>
                {filteredProducts?.map((item, i) => (
                  <option key={i} value={item?.id}>
                    {item?.product_name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="invoice">
              <p>Price:</p>
              <input
                type="number"
                name="product_sale_price"
                placeholder="Price"
                className="input input-bordered input-md  my-3 w-full"
                value={Number(selectedItem?.product_sale_price)}
                readOnly
              />
            </label>
          </div>
          <div>
            <label htmlFor="invoice">
              <p>Quantity:</p>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="input input-bordered input-md  my-3 w-full"
                onChange={handleQuantity}
                min={1}
                max={selectedItem?.product_quantity}
                required
                value={quantity}
              />
            </label>
          </div>
          <div>
            <label htmlFor="description">
              <p>Unit:</p>
              <input
                type="text"
                name="product_unit"
                placeholder="Unit"
                className="input input-bordered input-md  my-3 w-full"
                defaultValue={selectedItem?.product_unit}
                readOnly
              />
            </label>
          </div>

          <div className=" border border-red-300  rounded-md  text-sm">
            <p>Add item</p>
            <div className=" flex my-3 bg-[#0369A1] text-white rounded-lg justify-between">
              <AiOutlinePlusCircle size={20} />
              <button
                className={`w-full btn  bg-[#0369A1] text-white ${
                  selectedItem?.product_name && "cursor-pointer"
                }`}
                disabled={!selectedItem?.product_name}
                onClick={handleAddItem}
              >
                Add item
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice items */}
      <div className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg p-5 mt-5">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th className="text-sm">#</th>
                <th className="text-sm">Code</th>
                <th className="text-sm">Item Name</th>
                <th className="text-sm">Price</th>
                <th className="text-sm">Quantity</th>
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
                      <td>{item?.product_code}</td>
                      <td>{item?.product_name}</td>
                      <td>{item?.product_sale_price}</td>
                      <td>{item?.quantity}</td>
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
            <tfoot>
              <tr>
                <th className="text-sm">#</th>
                <th className="text-sm">Code</th>
                <th className="text-sm">Item Name</th>
                <th className="text-sm">Price</th>
                <th className="text-sm">Quantity</th>
                <th className="text-sm">Total Price</th>
                <th className="text-sm">
                  <GiCancel />
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

ItemsWithSelect.propTypes = {
  products: array,
};

export default ItemsWithSelect;
