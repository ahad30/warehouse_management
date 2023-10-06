import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { deleteItem, getItem } from "../../../features/Invoice/invoiceSlice";
// import productData from "../../../Dashboard/Products/productData.json";
import { array } from "prop-types";
import { useGetCategoriesQuery } from "../../../features/Category/categoryApi";
import { useGetBrandsQuery } from "../../../features/Brand/brandApi";

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
  }, [selectedItem, quantity, dispatch]);

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
  console.log(products);
  return (
    <div className="my-5">
      <div className="bg-[#F3F4F6] border border-[#D1D5DB] rounded-lg p-5">
        {/* Select Category or Brand */}
        <div className="grid sm:grid-cols-2 gap-5 mb-5">
          <select
            className="select select-bordered w-full"
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
          <select
            className="select select-bordered w-full"
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
        </div>
        {/* Select Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-2 ">
          <div>
            <label htmlFor="description" className="">
              <p>Code:</p>
              <input
                type="text"
                name="product_code"
                placeholder="Code"
                className="input input-bordered input-md w-full"
                defaultValue={selectedItem?.product_code}
                readOnly
              />
            </label>
          </div>
          <div>
            <label htmlFor="Item Name" className="">
              <p>Item Name:</p>
              <select
                className="select select-bordered w-full"
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
            <label htmlFor="invoice" className="">
              <p>Price:</p>
              <input
                type="number"
                name="product_sale_price"
                placeholder="Price"
                className="input input-bordered input-md w-full"
                value={Number(selectedItem?.product_sale_price)}
                readOnly
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
                readOnly
              />
            </label>
          </div>

          <div className="flex items-center">
            <button
              className="w-full bg-[#0369A1] text-white inline"
              // disabled={!selectedItem?.product_name}
              onClick={handleAddItem}
            >
              Add item
            </button>
          </div>
        </div>
      </div>

      {/* Invoice items */}
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
