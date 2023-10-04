import { AiOutlineUserAdd } from "react-icons/ai";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useAddCustomerMutation } from "../../features/Customer/customerApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";

const AddCustomer = () => {
  UseTitle("Add Customer");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addCustomer, { isLoading, isError, error, isSuccess, data }] =
    useAddCustomerMutation();

  const onSubmit = (data) => {
    const formData = new FormData()
    
    addCustomer(data);
  };

  const errorMessages = UseErrorMessages(error);

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
            <span className="font-semibold min-w-[100px]">Email</span>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">Web</span>
            <input
              type="url"
              placeholder="Customer Web link"
              className="input input-bordered w-full"
              {...register("web")}
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
          <div className="form-control w-full">
            <input
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>
        </div>
        <SubmitButton
          icon={<AiOutlineUserAdd size={20} />}
          title={isLoading ? "Adding Customer..." : "Add Customer"}
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

export default AddCustomer;
