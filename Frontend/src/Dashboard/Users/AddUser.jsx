import { AiOutlineUserAdd } from "react-icons/ai";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useAddUserMutation } from "../../features/User/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logOut } from "../../features/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const AddUser = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addUser, { isLoading, isError, error, isSuccess, data }] =
    useAddUserMutation();

  // GET INPUT FIELD FORM
  const onSubmit = async (data) => {
    console.log(data);
    addUser(data);
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
                Role<span className="text-red-500 p-0">*</span>
              </span>
              <select
                className="select select-bordered w-full"
                {...register("role")}
                required
              >
                <option value={""}>Select Role</option>
                <option value={"admin"}>Admin</option>
                <option value={"accountant"}>Accountant</option>
                <option value={"manager"}>Manager</option>
                <option value={"sales_representative"}>
                  Sales Representative
                </option>
              </select>
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
            {/* <label className="input-group">
              <span className="font-semibold min-w-[100px]">
                Branch<span className="text-red-500 p-0">*</span>
              </span>
              <select
                className="select select-bordered w-full"
                {...register("branch")}
                required
              >
                <option value={""}>Select Branch</option>
                {[...Array(5)].map((b, i) => (
                  <option key={i} value={`Branch ${i + 1}`}>
                    Branch {i + 1}
                  </option>
                ))}
              </select>
            </label> */}
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
                {...register("zip")}
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
      </DashboardBackground>
    </>
  );
};

export default AddUser;
