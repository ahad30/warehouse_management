import { AiOutlineUserAdd } from "react-icons/ai";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import {
  useAddUserMutation,
  useGetUserRolesQuery,
} from "../../features/User/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";

const AddUser = () => {
  UseTitle("Add User");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addUser, { isLoading, isError, error, isSuccess, data }] =
    useAddUserMutation();

  const { data: rolesData } = useGetUserRolesQuery();

  // GET INPUT FIELD FORM
  const onSubmit = async (data) => {
    addUser(data);
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
      return navigate("/dashboard/user");
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
    <>
      <DashboardBackground>
        <h2 className="text-xl my-5 font-semibold">Add User</h2>
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
                Role<span className="text-red-500 p-0">*</span>
              </span>
              <select
                className="select select-bordered w-full"
                {...register("role_id")}
                required
              >
                <option value={""}>Select Role</option>
                {rolesData?.roles?.map((userRole) => (
                  <option key={userRole?.id} value={userRole?.id}>
                    {userRole?.role}
                  </option>
                ))}
              </select>
            </label>
            <label className="input-group">
              <span className="font-semibold min-w-[100px]">
                Password<span className="text-red-500 p-0">*</span>
              </span>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                required
                {...register("password")}
              />
            </label>
            <label className="input-group">
              <span className="font-semibold min-w-[100px]">
                Retype<span className="text-red-500 p-0">*</span>
              </span>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                required
                {...register("password_confirmation")}
              />
            </label>

            <label className="input-group">
              <span className="font-semibold min-w-[100px]">
                Status<span className="text-red-500 p-0">*</span>
              </span>
              <select
                className="select select-bordered w-full"
                {...register("status")}
                required
              >
                <option value={"active"} selected>
                  Active
                </option>
                <option value={"inactive"}>Inactive</option>
              </select>
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
              <span className="font-semibold min-w-[100px]">Zip</span>
              <input
                type="number"
                placeholder="Zip Code"
                className="input input-bordered w-full"
                {...register("zip_code")}
              />
            </label>
            <label className="input-group">
              <span className="font-semibold min-w-[100px]">
                City<span className="text-red-500 p-0">*</span>
              </span>
              <input
                type="text"
                placeholder="City Name"
                className="input input-bordered w-full"
                required
                {...register("city")}
              />
            </label>
            <label className="input-group">
              <span className="font-semibold min-w-[100px]">
                Country<span className="text-red-500 p-0">*</span>
              </span>
              <input
                type="text"
                placeholder="Country Name"
                className="input input-bordered w-full"
                required
                {...register("country")}
              />
            </label>
            <label className="input-group">
              <span className="font-semibold min-w-[100px]">State</span>
              <input
                type="text"
                placeholder="State Name"
                className="input input-bordered w-full"
                {...register("state")}
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
            title={isLoading ? "Adding User..." : "Add User"}
            icon={<AiOutlineUserAdd size={20} />}
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
    </>
  );
};

export default AddUser;
