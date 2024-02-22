import { array, func } from "prop-types";
import { useGetBrandsQuery } from "../../../features/Brand/brandApi";
import { useGetCategoriesQuery } from "../../../features/Category/categoryApi";
import { useGetStoresQuery } from "../../../features/Store/storeApi";
import { useRef, useState } from "react";
import { set } from "date-fns";

const Products = ({ setAddedProduct, addedProduct }) => {
  const { data: allCategory } = useGetCategoriesQuery();
  const { data: allBrands } = useGetBrandsQuery();
  const { data: allWarHouse } = useGetStoresQuery();

  const [singleCategory, setSingleCategory] = useState("category");
  const [singleBrands, setSingleBrands] = useState("brand");
  const [singleWarehouse, setSingleWarehouse] = useState("warehouse");

  const handleCategory = (id) => {
    const findTheCategory = allCategory?.data?.find((item) => item?.id === id);
    setSingleCategory(findTheCategory);
  };
  const handleBrands = (id) => {
    const findTheBrands = allBrands?.data?.find((item) => item?.id === id);
    setSingleBrands(findTheBrands);
  };
  const handleWarehouse = (id) => {
    const findTheWarehouse = allWarHouse?.data?.find((item) => item?.id === id);
    setSingleWarehouse(findTheWarehouse);
  };

  return (
    <div className=" grid-cols-1 grid gap-y-3">
      {/* brands, category , wareHouse start */}

      {/* category  start */}
      <div>
        <div className="flex gap-x-3">
          <button
            onClick={() => setSingleCategory("category")}
            className={`min-w-[200px]  py-3 rounded-lg 
           ${
             singleCategory == "category"
               ? "bg-light-blue-500 text-white"
               : "bg-gray-100 text-black"
           }
          `}
          >
            All Category
          </button>
          <div className="flex gap-x-3 overflow-x-scroll wrapper">
            {allCategory?.data?.map((item, index) => (
              <button
                onClick={() => handleCategory(item?.id)}
                className={`min-w-[200px] rounded-lg ${
                  singleCategory?.id == item?.id
                    ? "bg-light-blue-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
                key={index}
              >
                {item?.category_name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* category end */}


      {/* brand  start */}
      <div>
        <div className="flex gap-x-3">
          <button
            onClick={() => setSingleBrands("brand")}
            className={`min-w-[200px]  py-3 rounded-lg 
           ${
             singleBrands == "brand"
               ? "bg-light-blue-500 text-white"
               : "bg-gray-100 text-black"
           }
          `}
          >
            All Brands
          </button>
          <div className="flex gap-x-3 overflow-x-scroll wrapper">
            {allBrands?.data?.map((item, index) => (
              <button
                onClick={() => handleBrands(item?.id)}
                className={`min-w-[200px] rounded-lg ${
                  singleBrands?.id == item?.id
                    ? "bg-light-blue-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
                key={index}
              >
                {item?.brand_name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* brand end */}


      {/* warehouse  start */}
      <div>
        <div className="flex gap-x-3">
          <button
            onClick={() => setSingleWarehouse("warehouse")}
            className={`min-w-[200px]  py-3 rounded-lg 
           ${
             singleWarehouse == "warehouse"
               ? "bg-light-blue-500 text-white"
               : "bg-gray-100 text-black"
           }
          `}
          >
            All Warehouse
          </button>
          <div className="flex gap-x-3 overflow-x-scroll wrapper">
            {allWarHouse?.data?.map((item, index) => (
              <button
                onClick={() => handleWarehouse(item?.id)}
                className={`min-w-[200px] rounded-lg ${
                  singleWarehouse?.id == item?.id
                    ? "bg-light-blue-500 text-white"
                    : "bg-gray-100 text-black"
                }`}
                key={index}
              >
                {item?.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* warehouse end */}

    

     

      {/* brands, category , wareHouse end */}
    </div>
  );
};

export default Products;

Products.propTypes = {
  setAddedProduct: func,
  addedProduct: array,
};
