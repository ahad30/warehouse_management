import { useState } from "react";
import Products from "./Products/Products";
import AddedItemCalculation from "./AddedItemCalculation/AddedItemCalculation";

const Pos = () => {
  const [addedProduct, setAddedProduct] = useState([]);
  return (
    <div className=" bg-[#E3EFF7]  flex justify-between gap-x-3 p-3">
      <div className="relative bg-white w-1/3 overflow-hidden ring-1 rounded-lg">
        <div className="w-1/3 overflow-x-hidden fixed h-[90vh] ">
          <AddedItemCalculation
            addedProduct={addedProduct}
            setAddedProduct={setAddedProduct}
          ></AddedItemCalculation>
        </div>
      </div>

      <div className="w-2/3  ">
        <Products
          addedProduct={addedProduct}
          setAddedProduct={setAddedProduct}
        ></Products>
      </div>
    </div>
  );
};

export default Pos;
