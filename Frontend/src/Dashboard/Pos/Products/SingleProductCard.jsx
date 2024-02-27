import { func, object } from "prop-types";

const SingleProductCard = ({ item, setAddedProduct }) => {
  console.log(item);
  const {
    product_images,
    product_name,
   
    product_sale_price,
  } = item;

  return (
    <div className="bg-white  relative   p-1 rounded-lg shadow-lg">
      <div className="flex justify-center">
        <img
          className="max-h-[100px] max-w-[100px]"
          src={`${import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT}${
            product_images[0]?.image
          }`}
          alt=""
        />
      </div>
      {/* product name start */}
      <div className="mt-4">
        <h3 className="font-semibold text-base">{product_name}</h3>
        <h6 className=" text-sm">{product_name}</h6>
      </div>
      {/* product name end */}

      {/* price and code */}
      <p className="bg-[#6571FF] text-white rounded-lg w-1/3 absolute top-0 left-0 text-xs p-1">${Number(product_sale_price).toFixed(2)}</p>

      <p className="bg-[#0099FB] text-white rounded-lg w-1/3 absolute top-0 right-0 text-xs p-1">${Number(product_sale_price).toFixed(2)}</p>
    </div>
  );
};

export default SingleProductCard;
SingleProductCard.propTypes = {
  item: object,
  setAddedProduct: func,
};
