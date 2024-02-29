import { bool, func, object } from "prop-types";

const Imageview = ({ modalIsOpen, setModalIsOpen, product }) => {
  const imgesArray = product?.product_images?.map((item) => item?.image);
  console.log(imgesArray);
  return modalIsOpen ? (
    <div className="fixed w-full inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setModalIsOpen(false)}
      ></div>
      <div className="flex items-center min-h-screen  px-4 py-8">
        <div className="relative w-full p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="grid grid-cols-3 gap-2">
            {imgesArray?.map((item, index) => (
              <img
                key={index}
                src={`${
                  import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                }${item}`}
                alt=""
                className="w-full h-[250px] object-cover rounded-lg"
              />
            ))}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-600  mt-2 p-3.5 flex text-white rounded-md outline-none border ring-offset-2 ring-red-500 focus:ring-2"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Imageview;

Imageview.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
  product: object,
};
