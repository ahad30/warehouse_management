import { BiSolidDuplicate } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useAddCategoryMutation } from "../../features/Category/categoryApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const AddCategory = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [addCategory, { isLoading, isError, error, isSuccess, data }] =
    useAddCategoryMutation();

  const onSubmit = async (data) => {
    addCategory(data);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading(<p>Loading...</p>, { id: 1 });
    }
    if (isError) {
      toast.error(data?.message || error?.status, { id: 1 });
      console.log(error);
      return navigate("/dashboard/category");
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
    data?.status,
    data?.message,
    navigate,
  ]);

  return (
    <DashboardBackground>
      <h2 className="text-xl my-5 font-semibold">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-5">
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
        />
      </form>
      {error && <p>{error}</p>}
    </DashboardBackground>
  );
};

export default AddCategory;
