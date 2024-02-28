import { array, func } from "prop-types";
import CategoryBrandsAndWareHouse from "./CategoryBrandsAndWareHouse";
import { useEffect, useState } from "react";
import Search from "./Search";
import { useGetProductsForPosQuery } from "../../../features/Pos/Pos";
import SingleProductCard from "./SingleProductCard";
import ProductsSkeleton from "./ProductsSkeleton";

const Products = ({ setAddedProduct, addedProduct }) => {
  console.log(addedProduct);
  const [singleCategory, setSingleCategory] = useState("category");
  const [singleBrands, setSingleBrands] = useState("brand");
  const [singleWarehouse, setSingleWarehouse] = useState("warehouse");
  const [singleScanCode, setSingleScanCode] = useState("");
  const [productsData, setProductsData] = useState([]);
  const { data, isLoading } = useGetProductsForPosQuery({
    warehouseId: singleWarehouse?.id ? singleWarehouse?.id : "",
    brandId: singleBrands?.id ? singleBrands?.id : "",
    categoryId: singleCategory?.id ? singleCategory?.id : "",
    scanCode: singleScanCode ? singleScanCode : "",
  });

  useEffect(() => {
    setProductsData(data?.data?.data);
  }, [data, data?.data?.data]);
  // scanCode
  // console.log(data);
  let s = true;
  return (
    <div>
      <Search setSingleScanCode={setSingleScanCode}></Search>

      <div className="bg-white mt-8 rounded-t-lg p-3">
        <CategoryBrandsAndWareHouse
          singleCategory={singleCategory}
          setSingleCategory={setSingleCategory}
          singleBrands={singleBrands}
          setSingleBrands={setSingleBrands}
          singleWarehouse={singleWarehouse}
          setSingleWarehouse={setSingleWarehouse}
        ></CategoryBrandsAndWareHouse>
      </div>

      <div className="bg-[#FCFCFC] py-5   rounded-b-lg p-3">
        {/* products card  start */}
        <div className="grid grid-cols-2 gap-5 mt-5 lg:grid-cols-5 ">
          {isLoading
            ? [...Array(5)].map((item, index) => (
                <ProductsSkeleton key={index}></ProductsSkeleton>
              ))
            : productsData?.map(
                (item) =>
                  item?.id !== 1 && (
                    <SingleProductCard
                      setAddedProduct={setAddedProduct}
                      key={item?.id}
                      item={item}
                      addedProduct={addedProduct}
                    ></SingleProductCard>
                  )
              )}
          {data?.data?.data?.length == 0 && <p className="text-center text-2xl my-12 font-normal col-span-2 lg:col-span-5">No data is Available</p>}
        </div>
        {/* products card  end */}
      </div>
    </div>
  );
};

export default Products;

Products.propTypes = {
  setAddedProduct: func,
  addedProduct: array,
};
