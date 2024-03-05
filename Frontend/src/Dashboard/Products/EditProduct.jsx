import { bool, func, object } from "prop-types";
import { useForm } from "react-hook-form";
import {
  useUpdateProductImageMutation,
  useUpdateProductMutation,
} from "../../features/Product/productApi";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../../features/Category/categoryApi";
import { useGetBrandsQuery } from "../../features/Brand/brandApi";
import { useGetStoresQuery } from "../../features/Store/storeApi";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import { set } from "date-fns";
import { ImCross } from "react-icons/im";
const EditProduct = ({ modalIsOpen, setModalIsOpen, product, refetch }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: brandsData } = useGetBrandsQuery();
  const { data: storesData } = useGetStoresQuery();
  const [scanCode, setScanCode] = useState(1);
  const [previousImage, setPreviousImage] = useState([]);
  const [image_ids, setImageIds] = useState([]);
  useEffect(() => {
    if (product?.product_images) {
      setPreviousImage(product?.product_images);
    }
  }, [product, product?.product_images, refetch]);

  const [
    updateProduct,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
      data: updateData,
    },
  ] = useUpdateProductMutation();

  useEffect(() => {
    if (updateIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (updateIsError) {
      toast.error(updateError?.data?.message || updateError?.status, { id: 1 });
    }

    if (updateIsSuccess) {
      toast.success(updateData?.message, { id: 1 });
      setModalIsOpen(false);
    }
  }, [
    updateIsLoading,
    updateIsError,
    updateError,
    updateIsSuccess,
    updateData?.message,
    setModalIsOpen,
  ]);

  const errorMessages = UseErrorMessages(updateError);

  // Set default values using setValue from react-hook-form
  useEffect(() => {
    if (product) {
      setValue("product_name", product?.product_name || "");
      setValue("product_quantity", product?.product_quantity || "1");
      setValue("product_desc", product?.product_desc || "");
      setValue("product_retail_price", product?.product_retail_price || "");
      setValue("product_sale_price", product?.product_sale_price || "");
      setValue("warehouse_id", product?.warehouse_id || "");
      setValue("category_id", product?.category_id || "");
      setValue("brand_id", product?.brand_id || "");
      setValue("product_images", product?.images || "");
      setValue("scan_code", product.scan_code || "");
    }
  }, [product, setValue]);
  console.log(product);
  const onSubmit = (data) => {
    console.log(data);
    if (!data.product_name) {
      toast.error("Please fill in all required fields.", { id: 1 });
      return;
    }
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("product_name", data?.product_name);
    formData.append("product_quantity", data?.product_quantity);
    formData.append("product_retail_price", data?.product_retail_price);
    formData.append("product_sale_price", data?.product_sale_price);
    formData.append("product_sale_price", data?.product_sale_price);
    formData.append("warehouse_id", data?.warehouse_id);
    formData.append("category_id", data?.category_id);
    formData.append("brand_id", data?.brand_id);
    formData.append("scan_code", data?.scan_code);
    formData.append("id", product?.id);
    formData.append("images[]", data?.new_images[0]);
    formData.append("image_ids[]", image_ids);
    updateProduct(formData);
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      return alert("maximum upload 5");
    } else {
      const imagesArray = Array.from(files).map((file) => {
        return {
          url: URL.createObjectURL(file),
          file: file,
        };
      });

      setSelectedImages(imagesArray);
    }
  };
  const handleRemoveImage = (idx) => {
    if (selectedImages?.length > 0) {
      const filterImages = selectedImages.filter(
        (item, index) => index !== idx
      );
      setSelectedImages(filterImages);
    }
  };

  const handleRemoveImageApi = (id) => {
    setPreviousImage((prev) => prev.filter((item) => item.id !== id));
    setImageIds([...image_ids, id]);
  };

  // console.log(image_ids)
  return modalIsOpen ? (
    <div className="fixed inset-0 z-10 min-w-[1200px] overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setModalIsOpen(false)}
      ></div>
      <div className="flex items-center min-h-screen  px-4 py-8">
        <div className="relative p-4 mx-auto bg-white rounded-md shadow-lg">
          <div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <p className="text-lg font-semibold text-center mb-5">
                Update Product
              </p>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 lg:grid-cols-2  gap-5">
                    <label className="input-group">
                      <span className="font-semibold">
                        Name<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Product Name"
                        className="input input-bordered w-full"
                        {...register("product_name")}
                      />
                    </label>

                    <label className="input-group">
                      <span className="font-semibold">
                        Retail<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Retail"
                        className="input input-bordered w-full"
                        {...register("product_retail_price")}
                        min={1}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Sold<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Sold"
                        className="input input-bordered w-full"
                        {...register("product_sale_price")}
                        min={1}
                      />
                    </label>

                    <label className="input-group">
                      <span className="font-semibold">
                        Brands<span className="text-red-500 p-0">*</span>
                      </span>
                      <select
                        className="select select-bordered w-full"
                        required
                        {...register("brand_id")}
                      >
                        <option value={""}>Select Brand</option>
                        {brandsData?.data?.map((data) => (
                          <option value={data?.id} key={data?.id}>
                            {data?.brand_name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Store<span className="text-red-500 p-0">*</span>
                      </span>
                      <select
                        className="select select-bordered w-full"
                        required
                        {...register("store_id")}
                      >
                        <option value={""}>Select Store Info</option>
                        {storesData?.data?.map((data) => (
                          <option key={data?.id} value={data?.id}>
                            {data?.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Category<span className="text-red-500 p-0">*</span>
                      </span>
                      <select
                        className="select select-bordered w-full"
                        {...register("category_id")}
                      >
                        <option>Select Category</option>
                        {categoriesData?.data?.map((data, idx) => (
                          <option key={idx} value={data?.id}>
                            {data?.category_name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="">
                      <label className="input-group">
                        <span className="font-semibold text-sm">
                          scan code{" "}
                        </span>
                        <input
                          type="text"
                          placeholder="Scan Code"
                          readOnly={product?.scan_code ? true : false}
                          className="input input-bordered w-full "
                          {...register("scan_code")}
                          onKeyUp={(e) => {
                            setScanCode(e.target.value);
                            console.log(e.target);
                          }}
                        />
                      </label>
                      <img
                        src={`https://barcodeapi.org/api/128/${product?.scan_code} `}
                        className="h-16 float-right my-2"
                        alt=""
                      />
                    </div>
                    <label
                      htmlFor="image"
                      className="input-group file-input file-input-bordered"
                    >
                      <span className="font-semibold text-sm cursor-pointer">
                        Upload Image
                      </span>
                      <input
                        className="file-input hidden file-input-bordered w-full"
                        id="image"
                        // multiple={true}
                        multiple
                        type="file"
                        {...register("new_images", {
                          onChange: (e) => handleImageChange(e),
                        })}
                      />
                      <p className="py-3 px-2"> {selectedImages.length}</p>
                    </label>
                  </div>
                  {/* image section update  start  */}
                  <div>
                    {/* previous image */}
                    <h1 className="text-2xl mb-5 mt-5">Previous images </h1>
                    <div className="grid grid-cols-5">
                      {previousImage?.map((item) => (
                        <div className="relative" key={item?.id}>
                          <img
                            src={`${
                              import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                            }${item?.image}`}
                            alt=""
                            className="w-[100px] h-[100px]"
                          />
                          <div
                            onClick={() => handleRemoveImageApi(item?.id)}
                            className="bg-red-500 p-1 absolute text-white rounded-full top-0 right-30"
                          >
                            <ImCross size={12} />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* select Images */}
                    {selectedImages.length > 0 && (
                      <div>
                        <h1 className="text-2xl my-5">Selected Image</h1>
                        <div className="form-control  gap-3  w-full col-span-2 grid grid-cols-2 lg:grid-cols-5">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                key={index}
                                src={image?.url}
                                className="w-full h-[100px] object-cover rounded"
                              />
                              <div
                                onClick={() => handleRemoveImage(index)}
                                className="bg-red-500 p-1 absolute text-white rounded-full top-0 right-30"
                              >
                                <ImCross size={12} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="items-center gap-2 mt-3 sm:flex">
                    <button
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={() => setModalIsOpen(false)}
                    >
                      Cancel
                    </button>
                    <input
                      type="submit"
                      value={"Update Product"}
                      className="cursor-pointer w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                    />
                  </div>
                </form>
              </div>

              {/* Display error messages */}
              {errorMessages?.map((errorMessage, index) => (
                <p
                  key={index}
                  className="border border-red-400 p-3 sm:w-2/5 my-2 rounded-lg"
                >
                  {errorMessage}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

EditProduct.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
  product: object,
};

export default EditProduct;
