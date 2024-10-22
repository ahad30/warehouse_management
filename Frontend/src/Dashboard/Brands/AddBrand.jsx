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
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import useShowAsyncMessage from "../../components/Reusable/UseShowAsyncMessage/useShowAsyncMessage";

const AddBrand = () => {
  // Set the page title using the UseTitle custom hook.
  UseTitle("Add Brand");

  // Initialize useForm for form management.
  const { register, handleSubmit } = useForm();

  // Get the navigation function for routing.
  const navigate = useNavigate();

  // Get the Redux dispatch function.
  const dispatch = useDispatch();

  // Use the useAddBrandMutation hook to handle brand addition.
  const [addBrand, { isLoading, isError, error, isSuccess, data }] =
    useAddBrandMutation();

  // Handle form submission.
  const onSubmit = (data) => {
    console.log(data);
    // Create a FormData object for sending form data, including files.
    const formData = new FormData();
    formData.append("brand_name", data?.brand_name);

    if (data?.brand_img.length > 0) {
      formData.append("brand_img", data?.brand_img[0]);
    }

    // Call the addBrand mutation with the form data.
    addBrand(formData);
    console.log(data);
  };

  UseErrorMessages(error);
  useShowAsyncMessage(
    isLoading,
    isError,
    error,
    isSuccess,
    data,
    "/dashboard/brand"
  );
  return (
    <DashboardBackground>
      <h2 className="text-xl my-5 font-semibold">Add Brand</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="mulitpart/form-data">
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
          isLoading={isLoading}
        />
      </form>

      {/* {errorMessages?.map((errorMessage, index) => (
        <p
          key={index}
          className="border border-red-400 p-3 sm:w-2/5 my-2 rounded-lg"
        >
          {errorMessage}
        </p>
      ))} */}
    </DashboardBackground>
  );
};

export default AddBrand;
