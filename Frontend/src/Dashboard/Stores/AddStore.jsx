import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { FaStore } from "react-icons/fa";
import { useAddStoreMutation } from "../../features/Store/storeApi";

const AddStore = () => {
  UseTitle("Add Warehouse");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addStore, { isLoading, isError, error, isSuccess, data }] =
    useAddStoreMutation();

  const onSubmit = (data) => {
    addStore(data);
    console.log(data);
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
      return navigate("/dashboard/store");
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
      <h2 className="text-xl my-5 font-semibold">Add Store</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              Warehouse Name<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Warehouse Name"
              className="input input-bordered w-full"
              
              {...register("name")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              Country<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Country"
              className="input input-bordered w-full"
              required
              {...register("country")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              City<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="City"
              className="input input-bordered w-full"
              required
              {...register("city")}
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
            <span className="font-semibold min-w-[100px]">Website Link</span>
            <input
              type="text"
              placeholder="Customer Web link"
              className="input input-bordered w-full"
              {...register("site_link")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">Image</span>
            <input
              type="file"
              className="input input-bordered w-full"              
              {...register("address")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              City<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="City "
              className="input input-bordered w-full"
              
              {...register("city")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              Country<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Country"
              className="input input-bordered w-full"
              
              {...register("country")}
            />
          </label>
        </div>
        <SubmitButton
          icon={<FaStore size={20} />}
          title={isLoading ? "Adding Store..." : "Save"}
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

export default AddStore;
