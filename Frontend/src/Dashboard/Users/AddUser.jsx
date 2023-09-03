import { AiOutlineUserAdd } from "react-icons/ai";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { useForm } from "react-hook-form";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useAddUserMutation } from "../../features/User/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddUser = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [addUser, { isLoading, isSuccess, error }] = useAddUserMutation();

  // GET INPUT FIELD FORM
  const onSubmit = async (data) => {
    console.log(data);
    addUser(data);
  };

  // CHECK ERROR
  if (error) {
    toast.error(error.data.errors.email[0], { id: 1 });
  }

  // IF SUCCESS THEN ROUTE THE USERS
  if (isSuccess) {
    return navigate("/dashboard/user");
  }

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
                <option value={"officer"}>Officer</option>
                <option value={"manager"}>Manager</option>
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
            title={isLoading ? "Adding User" : "Add User"}
            icon={<AiOutlineUserAdd size={20} />}
          />
        </form>
      </DashboardBackground>
    </>
  );
};

export default AddUser;
