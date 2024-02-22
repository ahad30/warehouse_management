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
  let getYear = () => {
    let currentYear = new Date().getFullYear();
    return currentYear;
  };
  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("product_name", data?.product_name);
    // formData.append("product_code", data?.product_code);
    formData.append("product_retail_price", data?.product_retail_price);
    formData.append("product_sale_price", data?.product_sale_price);
    formData.append("product_unit", data?.product_unit);
    formData.append("category_id", data?.category_id);
    formData.append("brand_id", data?.brand_id);
    formData.append("warehouse_id", data?.warehouse_id);
    // formData.append("product_quantity", data?.product_quantity);
    formData.append("scan_code", data?.scan_code);
    const images = data.images;

    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }
    // if (data?.images.length > 0) {
    //   formData.append("images", data?.images);
    // }
    if (data?.product_desc) {
      formData.append("product_desc", data?.product_desc);
    }

    addProduct(formData);
  };

  const errorMessages = UseErrorMessages();

  useEffect(() => {
    if (isLoading) {
      toast.loading(<p>Loading...</p>, { id: 1 });
    }

    if (isError) {
      const errorMessage = error?.data?.message || error?.status;
      toast.error(errorMessage, { id: 1 });
    }

    if (isSuccess && data?.status) {
      toast.success(data?.message, { id: 1 });
      return navigate("/dashboard/product");
    }
  }, [
    isLoading,
    isError,
    error,
    isSuccess,
    data?.message,
    navigate,
    data?.status,
    dispatch,
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (e) => {
    const files = e.target.files;
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
            <span className="font-semibold">
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
          {/* <label className="input-group">
            <span className="font-semibold">
              Code<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Product Code"
              className="input input-bordered w-full"
              required
              {...register("product_code")}
            />
          </label> */}
          <label className="input-group">
            <span className="font-semibold">
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
            <span className="font-semibold">
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
          {/* <label className="input-group">
            <span className="font-semibold">
              Quantity<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="number"
              placeholder="Quantity"
              className="input input-bordered w-full"
              required
              min={1}
              {...register("product_quantity")}
            />
          </label> */}
          <label className="input-group">
            <span className="font-semibold">
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
            <span className="font-semibold">
              Sold<span className="text-red-500 p-0">*</span>
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
            <span className="font-semibold">
              Unit<span className="text-red-500 p-0">*</span>
            </span>
            <select
              className="select select-bordered w-full"
              required
              {...register("product_unit")}
            >
              <option value={""}>Select Unit</option>
              <option value={"pcs"}>Pcs</option>
              <option value={"box"}>Box</option>
              <option value={"kg"}>KG</option>
              <option value={"litre"}>Litre</option>
            </select>
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
            <span className="font-semibold">Description</span>
            <input
              type="text"
              placeholder="Product Description"
              className="input input-bordered w-full"
              {...register("product_desc")}
            />
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
            <img
              src={`https://barcodeapi.org/api/128/${scanCode}`}
              className="h-16 float-right my-2"
              alt=""
            />
          </div>

          <div className="form-control  w-full">
            <div className="mb-3">
              <label htmlFor="image">
                <div className="file-input file-input-bordered w-full px-2 py-3 cursor-pointer">
                  upload image : {selectedImages.length}
                </div>
              </label>
              <input
                className="file-input hidden file-input-bordered w-full"
                id="image"
                multiple="true"
                type="file"
                {...register("images", {
                  onChange: (e) => handleImageChange(e),
                })}
              />
            </div>
          </div>

          {selectedImages.length > 0 && (
            <div className="form-control  gap-3  w-full col-span-2 grid grid-cols-2 lg:grid-cols-5">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    key={index}
                    src={image}
                    // alt={SelectedImage ${index + 1}}
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
          {/* <div className="form-control w-full">
            <input
              type="file"
              multiple="true"
              className="file-input file-input-bordered w-full"
              {...register("images")}
            />
          </div> */}
        </div>
        <SubmitButton
          title={isLoading ? "Saving Product..." : "Save Product"}
          icon={<BiCartAdd size={20} />}
          isLoading={isLoading}
        />
      </form>
      {/* Display error messages */}
      {errorMessages.map((errorMessage, index) => (
        <p
          key={index}
          className="border border-red-400 p-3 sm:w-2/5 my-2 rounded-lg"
        >
          {errorMessage}
        </p>
      ))}
    </DashboardBackground>
  );
};

export default AddProduct;
