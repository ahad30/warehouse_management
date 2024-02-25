import { array, func } from "prop-types";
import CategoryBrandsAndWareHouse from "./CategoryBrandsAndWareHouse";
import { useState } from "react";
import Search from "./Search";

const Products = ({ setAddedProduct, addedProduct }) => {
  const [singleCategory, setSingleCategory] = useState("category");
  const [singleBrands, setSingleBrands] = useState("brand");
  const [singleWarehouse, setSingleWarehouse] = useState("warehouse");

  return (
    <div>
      <Search></Search>
      <CategoryBrandsAndWareHouse
        singleCategory={singleCategory}
        setSingleCategory={setSingleCategory}
        singleBrands={singleBrands}
        setSingleBrands={setSingleBrands}
        singleWarehouse={singleWarehouse}
        setSingleWarehouse={setSingleWarehouse}
      ></CategoryBrandsAndWareHouse>
    </div>
  );
};

export default Products;

Products.propTypes = {
  setAddedProduct: func,
  addedProduct: array,
};
