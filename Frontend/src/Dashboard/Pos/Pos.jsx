import { useState } from "react";
import Products from "./Products/Products";
import AddedItemCalculation from "./AddedItemCalculation/AddedItemCalculation";

const Pos = () => {
  const [addedProduct, setAddedProduct] = useState([]);
  return (
    <div className=" bg-[#E3EFF7] min-h-screen flex gap-x-3 p-5 ">
      <div className="w-1/3 bg-white rounded-lg">
        <AddedItemCalculation
          addedProduct={addedProduct}
          setAddedProduct={setAddedProduct}
        ></AddedItemCalculation>
      </div>

      <div className="w-2/3">
        <Products
          addedProduct={addedProduct}
          setAddedProduct={setAddedProduct}
        ></Products>
      </div>
    </div>
  );
};

export default Pos;
