import { BiSolidDuplicate } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useAddCategoryMutation } from "../../features/Category/categoryApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useToken } from "../../utils/hooks/useToken";

const AddCategory = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [addCategory, { isError, isLoading, isSuccess }] =
    useAddCategoryMutation();

  const token = useToken();

  const onSubmit = async (data) => {
    if (token) {
      addCategory(data, token);
    }

    if (isSuccess) {
      toast.success("Category added Successfully");
      return navigate("/dashboard/");
    }
  };

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
          title={isLoading ? "Saving..." : "Add Category"}
          icon={<BiSolidDuplicate size={20} />}
        />
      </form>
      {isError && <p>{isError}</p>}
    </DashboardBackground>
  );
};

export default AddCategory;
