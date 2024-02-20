import { BiCartAdd } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useAddProductMutation } from "../../features/Product/productApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../features/Category/categoryApi";
import { useDispatch } from "react-redux";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { useGetBrandsQuery } from "../../features/Brand/brandApi";
import { useGetStoresQuery } from "../../features/Store/storeApi";

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
  console.log(categoryData);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("product_name", data?.product_name);
    formData.append("product_code", data?.product_code);
    formData.append("product_retail_price", data?.product_retail_price);
    formData.append("product_sale_price", data?.product_sale_price);
    formData.append("product_unit", data?.product_unit);
    formData.append("category_id", data?.category_id);
    formData.append("brand_id", data?.brand_id);
    formData.append("warehouse_id", data?.warehouse_id);
    formData.append("product_quantity", data?.product_quantity);
    formData.append("scan_code", data?.scan_code);
    if (data?.images) {
      formData.append("images", data?.images[0]);
    }
    if (data?.product_desc) {
      formData.append("product_desc", data?.product_desc);
    }

    addProduct(formData);
  };

  // console.log(isLoading, isError, error, isSuccess, data);

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

  console.log(isLoading, isError, error, isSuccess, data);

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
          <label className="input-group">
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
          </label>
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
          <label className="input-group">
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
          </label>
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
          <div className="form-control w-full">
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              {...register("images")}
            />
          </div>
          <label className="input-group">
            <span className="font-semibold text-sm">scan code </span>
            <input
              type="text"
              placeholder="Product Description"
              className="input input-bordered w-full"
              {...register("scan_code")}
            />
          </label>
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
