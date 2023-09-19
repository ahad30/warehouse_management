import { AiOutlineUserAdd } from "react-icons/ai";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useAddCustomerMutation } from "../../features/Customer/customerApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/Auth/authSlice";
import { useDispatch } from "react-redux";

const AddCustomer = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [addCustomer, { isLoading, isError, error, isSuccess, data }] =
    useAddCustomerMutation();

  const onSubmit = (data) => {
    addCustomer(data);
  };

  useEffect(() => {
    const handleApiError = (error) => {
      if (error?.originalStatus === 405) {
        toast.error("Invalid Token Please Re-Login!");
        return dispatch(logOut());
      } else {
        let existUser =
          error?.data?.message === "Customer Already Exist" &&
          "Please use different Email and Phone";

        const errorMessage = existUser || error?.data?.message || error?.status;
        toast.error(errorMessage, { id: 1 });
      }
    };

    if (isError) {
      handleApiError(error);
    }
    if (isSuccess && data?.status) {
      toast.success(data?.message, { id: 1 });
      return navigate("/dashboard/customer");
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
      <h2 className="text-xl my-5 font-semibold">Add Customer</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              Name<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              required
              {...register("name")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              Phone<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Phone"
              className="input input-bordered w-full"
              required
              {...register("phone")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              Email<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
              {...register("email")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              Address<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Address"
              className="input input-bordered w-full"
              required
              {...register("address")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">Notes</span>
            <input
              type="text"
              placeholder="Notes"
              className="input input-bordered w-full"
              {...register("notes")}
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
          icon={<AiOutlineUserAdd size={20} />}
          title={isLoading ? "Adding Customer" : "Add Customer"}
        />
      </form>
    </DashboardBackground>
  );
};

export default AddCustomer;
