import { useState } from "react";
import Products from "./Products/Products";
import AddedItemCalculation from "./AddedItemCalculation/AddedItemCalculation";

const Pos = () => {
  const [addedProduct, setAddedProduct] = useState([]);
  return (
    <div className="border flex gap-x-3 border-red-400 ">
      <div className="w-1/2">
        <Products
          addedProduct={addedProduct}
          setAddedProduct={setAddedProduct}
        ></Products>
      </div>

      <div className="w-1/2">
        <AddedItemCalculation
          addedProduct={addedProduct}
          setAddedProduct={setAddedProduct}
        ></AddedItemCalculation>
      </div>
    </div>
  );
};

export default Pos;
