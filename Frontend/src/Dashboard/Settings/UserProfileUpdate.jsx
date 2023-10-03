import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "../../features/User/userApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const UserProfileUpdate = () => {
  const { user } = useSelector((state) => state?.auth);
  console.log(user);
  const { handleSubmit, register } = useForm();

  const [updateProfile, { isLoading, isError, error, isSuccess, data }] =
    useUpdateUserProfileMutation();

  const handleSubmitUserProfile = (data) => {
    const userData = {
      ...data,
      old_image: user?.img,
    };
    updateProfile(userData);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (isError) {
      toast.error(error?.data?.message || error?.status, { id: 1 });
    }

    if (isSuccess) {
      toast.success(data?.message, { id: 1 });
    }
  }, [isLoading, isError, error, isSuccess, data]);

  return (
    <>
      <h2 className="text-2xl font-semibold my-5">User Profile</h2>
      <div className="grid md:grid-cols-[1fr_3fr] gap-10 mt-10 border rounded-md p-5">
        <div className="sm:border-r-2 w-[90%] md:w-[70%] mx-auto">
          <div className="avatar">
            <div className="w-28 rounded-full">
              <img
                src={
                  user?.img
                    ? user?.img
                    : `https://cdn-icons-png.flaticon.com/512/149/149071.png`
                }
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
            readOnly
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.phone}
            {...register("phone")}
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.address}
            {...register("address")}
          />
          <input
            name="zip_code"
            type="text"
            placeholder="Zip Code"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.zip_code}
            {...register("zip_code")}
          />
          <input
            name="city"
            type="text"
            placeholder="city"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.city}
            {...register("city")}
          />
          <input
            name="state"
            type="text"
            placeholder="State"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.state}
            {...register("state")}
          />
          <input
            name="country"
            type="text"
            placeholder="country"
            className="input input-bordered input-md w-full my-2"
            defaultValue={user?.country}
            {...register("country")}
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
