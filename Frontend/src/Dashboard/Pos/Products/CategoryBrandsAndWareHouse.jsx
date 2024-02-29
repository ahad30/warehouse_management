import { func, object } from "prop-types";
import { useGetBrandsQuery } from "../../../features/Brand/brandApi";
import { useGetCategoriesQuery } from "../../../features/Category/categoryApi";
import { useGetStoresQuery } from "../../../features/Store/storeApi";
import CategorySkeleton from "./CategorySkeleton";

const CategoryBrandsAndWareHouse = ({
  singleCategory,
  setSingleCategory,
  singleBrands,
  setSingleBrands,
  singleWarehouse,
  setSingleWarehouse,
}) => {
  const { data: allCategory, isLoading: allCategoryIsLoading } =
    useGetCategoriesQuery();
  const { data: allBrands, isLoading: allBrandIsLoading } = useGetBrandsQuery();
  const { data: allWarHouse, isLoading: allWareHouseIsLoading } =
    useGetStoresQuery();

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
    <div className="  grid-cols-1 grid gap-y-3">
      {/* brands, category , wareHouse start */}

      {/* category  start */}
      <div className={`${allCategoryIsLoading ? "flex gap-x-3" : ""}`}>
        {allCategoryIsLoading ? (
          [...Array(3)].map((item, index) => (
            <CategorySkeleton key={index}></CategorySkeleton>
          ))
        ) : (
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
            <div className="flex gap-x-3  overflow-x-scroll wrapper">
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
        )}
        {allCategory?.data?.length == 0 && (
          <p className="text-center text-xl font-normal">
            Category is Not Available
          </p>
        )}
      </div>
      {/* category end */}

      {/* brand  start */}
      <div className={`${allBrandIsLoading ? "flex gap-x-3" : ""}`}>
        {allBrandIsLoading ? (
          [...Array(4)].map((item, index) => (
            <CategorySkeleton key={index}></CategorySkeleton>
          ))
        ) : (
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
        )}
        {allBrands?.data?.length == 0 && (
          <p className="text-center text-xl font-normal">
            Brands is Not Available
          </p>
        )}
      </div>
      {/* brand end */}

      {/* warehouse  start */}
      <div className={`${allWareHouseIsLoading ? "flex gap-x-3" : ""}`}>
        {allWareHouseIsLoading ? (
          [...Array(5)].map((item, index) => (
            <CategorySkeleton key={index}></CategorySkeleton>
          ))
        ) : (
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
                  className={`min-w-[200px]  rounded-lg ${
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
        )}

        {allWarHouse?.data?.length == 0 && (
          <p className="text-center text-xl font-normal">
            Warehouse is Not Available
          </p>
        )}
      </div>
      {/* warehouse end */}

      {/* brands, category , wareHouse end */}
    </div>
  );
};

export default CategoryBrandsAndWareHouse;

CategoryBrandsAndWareHouse.propTypes = {
  singleCategory: object,
  setSingleCategory: func,
  singleBrands: object,
  setSingleBrands: func,
  singleWarehouse: object,
  setSingleWarehouse: func,
};
