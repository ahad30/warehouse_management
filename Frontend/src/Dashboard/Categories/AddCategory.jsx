import { BiSolidDuplicate } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useAddCategoryMutation } from "../../features/Category/categoryApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
// import { useGetStoresQuery } from "../../features/Store/storeApi";

const AddCategory = () => {
  UseTitle("Add Category");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { data: storesData } = useGetStoresQuery();
  const [addCategory, { isLoading, isError, error, isSuccess, data }] =
    useAddCategoryMutation();

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("category_name", data?.category_name);

    if (data?.image?.length > 0) {
      formData.append("image", data?.image[0]);
    }
    if (data?.description) {
      formData.append("description", data?.description);
    }
    addCategory(formData);
  };

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
      return navigate("/dashboard/category");
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

  const errorMessages = UseErrorMessages(error);

  return (
    <DashboardBackground>
      <h2 className="text-xl my-5 font-semibold">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-5">
          {/* <label className="input-group">
            <span className="font-semibold">
              Warehouse<span className="text-red-500 p-0">*</span>
            </span>
            <select
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
          </label> */}
          <label className="input-group">
            <span className="font-semibold min-w-[110px]">
              Image<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="file"
              className="input input-bordered w-full"
              {...register("image")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[110px]">
              Name<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Category Name"
              className="input input-bordered w-full"
              required
              {...register("category_name")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[110px]">Description</span>
            <input
              type="text"
              placeholder="Category Description"
              className="input input-bordered w-full"
              {...register("description")}
            />
          </label>
        </div>
        <SubmitButton
          title={isLoading ? "Adding Category..." : "Add Category"}
          icon={<BiSolidDuplicate size={20} />}
          isLoading={isLoading}
        />

        {errorMessages?.map((errorMessage, index) => (
          <p
            key={index}
            className="border border-red-400 p-3 sm:w-2/5 my-2 rounded-lg"
          >
            {errorMessage}
          </p>
        ))}
      </form>
    </DashboardBackground>
  );
};

export default AddCategory;
