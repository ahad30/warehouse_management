import { useState } from "react";
import Products from "./Products/Products";
import AddedItemCalculation from "./AddedItemCalculation/AddedItemCalculation";

const Pos = () => {
  const [addedProduct, setAddedProduct] = useState([]);
  return (
    <div className=" bg-[#E3EFF7] p-3 flex flex-col lg:flex-row justify-between gap-x-3  lg:h-screen overflow-hidden">
      
      <div className="relative bg-white lg:w-1/3 overflow-hidden rounded-lg">
        <div className="w-full overflow-x-hidden h-screen ">
          <AddedItemCalculation
            addedProduct={addedProduct}
            setAddedProduct={setAddedProduct}
          ></AddedItemCalculation>
        </div>
      </div>

      <div className="lg:w-2/3 ">
        <Products
          addedProduct={addedProduct}
          setAddedProduct={setAddedProduct}
        ></Products>
      </div>
    </div>
  );
};

export default Pos;
