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
import { logOut } from "../../features/Auth/authSlice";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: categoryData } = useGetCategoriesQuery();
  const [addProduct, { isLoading, isError, error, isSuccess, data }] =
    useAddProductMutation();

  const onSubmit = (data) => {
    addProduct(data);
  };

  useEffect(() => {
    const handleApiError = (error) => {
      if (error?.originalStatus === 405) {
        toast.error("Invalid Token Please Re-Login!");
        return dispatch(logOut());
      } else {
        const errorMessage = error?.data?.message || error?.status;
        toast.error(errorMessage, { id: 1 });
      }
    };

    if (isError) {
      handleApiError(error);
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
              placeholder="Provide an Unique Product Name"
              className="input input-bordered w-full"
              required
              {...register("name")}
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
              {...register("code")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold">
              Price<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="number"
              placeholder="Product Price"
              className="input input-bordered w-full"
              required
              {...register("price")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold">
              Unit<span className="text-red-500 p-0">*</span>
            </span>
            <select
              className="select select-bordered w-full"
              required
              {...register("unit")}
            >
              <option value={""}>Select Unit</option>
              <option value={"pcs"}>Pcs</option>
              <option value={"box"}>Box</option>
              <option value={"kg"}>KG</option>
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
              {categoryData?.categories?.map((category, idx) => (
                <option key={idx} value={category?.id}>
                  {category?.category_name}
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
              {...register("desc")}
            />
          </label>
          {/* <div className="form-control w-full">
            <input
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div> */}
        </div>
        <SubmitButton
          title={isLoading ? "Saving Product..." : "Save Product"}
          icon={<BiCartAdd size={20} />}
        />
      </form>
    </DashboardBackground>
  );
};

export default AddProduct;
