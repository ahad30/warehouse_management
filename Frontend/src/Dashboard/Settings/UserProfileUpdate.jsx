import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const UserProfileUpdate = () => {
  const { user } = useSelector((state) => state?.auth);

  const { handleSubmit, register, setValue } = useForm();

  console.log(user);
  const handleSubmitUserProfile = (data) => {
    console.log(data);
  };

  return (
    <>
      <h2 className="text-2xl font-semibold my-5">User Profile</h2>
      <div className="grid md:grid-cols-[1fr_3fr] gap-10 mt-10 border rounded-md p-5">
        <div className="sm:border-r-2 w-[90%] md:w-[70%] mx-auto">
          <div className="avatar">
            <div className="w-28 rounded-full">
              <img
                src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleSubmitUserProfile)}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.name}
            {...register("name")}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.email}
            {...register("email")}
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.phone}
            {...register("phone")}
          />
          {/* <input
            name="role"
            type="text"
            placeholder="Role"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.role}
          /> */}
          <select
            className="select select-bordered w-full my-2"
            {...register("role")}
            defaultValue={user?.role}
          >
            <option value={""}>Select Role</option>
            <option value={"admin"}>Admin</option>
            <option value={"accountant"}>Accountant</option>
            <option value={"manager"}>Manager</option>
            <option value={"sales_representative"}>Sales Representative</option>
          </select>
          <select
            className="select select-bordered w-full my-2"
            {...register("status")}
            defaultValue={user?.status}
          >
            <option value={""}>Select Status</option>
            <option value={"active"}>Active</option>
            <option value={"inactive"}>Inactive</option>
          </select>
          <input
            name="address"
            type="text"
            placeholder="Address"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.address}
          />
          <input
            name="zip_code"
            type="text"
            placeholder="Zip Code"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.zip_code}
          />
          <input
            name="city"
            type="text"
            placeholder="city"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.city}
          />
          <input
            name="state"
            type="text"
            placeholder="state"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.country}
          />
          <input
            name="country"
            type="text"
            placeholder="country"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.country}
          />
          <input
            type="submit"
            // className="input input-bordered input-md my-2"
            className="btn bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
            defaultValue={"Update Profile"}
          />
        </form>
      </div>
    </>
  );
};

export default UserProfileUpdate;
