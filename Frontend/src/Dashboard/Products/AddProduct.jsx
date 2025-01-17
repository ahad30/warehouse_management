import { BiCartAdd } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useAddProductMutation } from "../../features/Product/productApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../features/Category/categoryApi";
import { useDispatch } from "react-redux";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { useGetBrandsQuery } from "../../features/Brand/brandApi";
import { useGetStoresQuery } from "../../features/Store/storeApi";
import { ImCross } from "react-icons/im";
import useShowAsyncMessage from "../../components/Reusable/UseShowAsyncMessage/useShowAsyncMessage";
const AddProduct = () => {
  UseTitle("Add Product");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: brandsData } = useGetBrandsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const { data: storesData } = useGetStoresQuery();
  const [addProduct, { isLoading, isError, error, isSuccess, data }] =
    useAddProductMutation();
  const [scanCode, setScanCode] = useState("N/A");
  const onSubmit = (data) => {
    const formData = new FormData();
    const images = data?.images;
    formData.append("product_name", data?.product_name);
    formData.append("product_retail_price", data?.product_retail_price);
    formData.append("product_sale_price", data?.product_sale_price);
    formData.append("category_id", data?.category_id);
    formData.append("brand_id", data?.brand_id);
    formData.append("warehouse_id", data?.warehouse_id);
    formData.append("scan_code", data?.scan_code);
    formData.append("description", data?.description);

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        console.log(images[i]);
        formData.append("images[]", images[i]);
      }
    }
    if (data?.product_desc) {
      formData.append("product_desc", data?.product_desc);
    }

    addProduct(formData);
  };

  UseErrorMessages(error);
  useShowAsyncMessage(
    isLoading,
    isError,
    error,
    isSuccess,
    data,
    "/dashboard/product"
  );

  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (e) => {
    const files = e.target.files;
    // console.log(files);
    console.log(files.length);
    if (files.length > 5) {
      console.log("succeed");
      return alert("maximum upload 5");
    } else {
      console.log("You can not more then five image");
      const imagesArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
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

  return (
    <DashboardBackground>
      <h2 className="text-xl my-5 font-semibold">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="input-group">
            <span className="font-semibold text-sm">
              Name<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Product Name"
              className="input input-bordered w-full"
              required
              {...register("product_name")}
            />
          </label>

          <label className="input-group">
            <span className="font-semibold text-sm">
              Warehouse<span className="text-red-500 p-0">*</span>
            </span>
            <select
              // onChange={()=>}
              className="select select-bordered w-full"
              required
              {...register("warehouse_id")}
            >
              <option value={""}>Select Warehouse Info</option>
              {storesData?.data?.map((data) => (
                <option key={data?.id} value={data?.id}>
                  {data?.name}
                </option>
              ))}
            </select>
          </label>
          <label className="input-group">
            <span className="font-semibold text-sm">
              Category<span className="text-red-500 p-0">*</span>
            </span>
            <select
              className="select select-bordered w-full"
              required
              {...register("category_id")}
            >
              <option value={""}>Select Category</option>
              {categoryData?.data?.map((data, idx) => (
                <option key={idx} value={data?.id}>
                  {data?.category_name}
                </option>
              ))}
            </select>
          </label>

          <label className="input-group">
            <span className="font-semibold text-sm">
              Retail<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="number"
              placeholder="Retail Price"
              className="input input-bordered w-full"
              required
              min={0}
              {...register("product_retail_price")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold text-sm">
              Sell Price<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="number"
              placeholder="Sold Price"
              className="input input-bordered w-full"
              required
              min={0}
              {...register("product_sale_price")}
            />
          </label>

          <label className="input-group">
            <span className="font-semibold text-sm">
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

          <div>
            <label className="input-group">
              <span className="font-semibold text-sm">scan code </span>
              <input
                type="number"
                placeholder="Scan Code"
                className="input input-bordered w-full"
                {...register("scan_code")}
                onKeyUp={(e) => {
                  setScanCode(e.target.value);
                  console.log(e.target);
                }}
              />
            </label>

          </div>


        
          <div className="form-control ">
            <div className="mb-3">
              <label className="input-group file-input file-input-bordered">
                <span className="font-semibold text-sm cursor-pointer">
                  Upload Image
                </span>
                <input
                  className="file-input hidden file-input-bordered w-full"
                  id="image"
                  multiple="true"
                  type="file"
                  {...register("images", {
                    onChange: (e) => handleImageChange(e),
                  })}
                />
                <p className="py-3 px-2"> {selectedImages.length}</p>
              </label>
            </div>
          </div>

          <div className="flex">
            <label
              htmlFor="OrderNotes"
              className="me-2 text-lm font-medium text-black bg-[#E5E6E6] px-4 py-3 h-fit w-fit rounded-md"
            >
              Description
            </label>

            <textarea
              {...register("description")}
              id="OrderNotes"
              className=" w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
              rows="1"
              placeholder="Enter any additional order notes..."
            ></textarea>
          </div>
          <img
            src={`https://barcodeapi.org/api/128/${scanCode}`}
            className="h-16 float-right my-2"
            alt=""
          />
          {selectedImages.length > 0 && (
            <div className="form-control  gap-3  w-full col-span-2 grid grid-cols-2 lg:grid-cols-5">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    key={index}
                    src={image}
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
          )}
        </div>
        <SubmitButton
          title={isLoading ? "Saving Product..." : "Save Product"}
          icon={<BiCartAdd size={20} />}
          isLoading={isLoading}
        />
      </form>
    </DashboardBackground>
  );
};

export default AddProduct;
