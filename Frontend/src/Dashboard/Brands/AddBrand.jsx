import { SiBrandfolder } from "react-icons/si";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { useAddBrandMutation } from "../../features/Brand/brandApi";

const AddBrand = () => {
  UseTitle("Add Brand");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addBrand, { isLoading, isError, error, isSuccess, data }] =
    useAddBrandMutation();

  const onSubmit = async (data) => {
    console.log(data);
    addBrand(data);
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
      return navigate("/dashboard/brand");
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
      <h2 className="text-xl my-5 font-semibold">Add Brand</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-5">
          <label className="input-group">
            <span className="font-semibold min-w-[110px]">
              Name<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Brand Name"
              className="input input-bordered w-full"
              required
              {...register("brand_name")}
            />
          </label>
          <div className="form-control w-full">
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              {...register("brand_img")}
            />
          </div>
        </div>
        <SubmitButton
          title={isLoading ? "Adding Brand..." : "Add Brand"}
          icon={<SiBrandfolder size={20} />}
        />
      </form>
    </DashboardBackground>
  );
};

export default AddBrand;
