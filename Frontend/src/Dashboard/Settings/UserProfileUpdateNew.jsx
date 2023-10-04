import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useGetUserRolesQuery,
  useUpdateUserProfileMutation,
} from "../../features/User/userApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const UserProfileUpdateNew = () => {
  const { user } = useSelector((state) => state?.auth);
  //   console.log(user);
  const { handleSubmit, register } = useForm();
  const { data: rolesData } = useGetUserRolesQuery();

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
      <div className="">
        <form
          className="grid grid-cols-5 gap-5 justify-center items-start"
          onSubmit={handleSubmit(handleSubmitUserProfile)}
        >
          {/* file upload  */}
          <div className="w-full row-span-5 flex flex-col items-center ">
            <div className=" bg-white p-5 w-40 h-40 flex justify-center items-center rounded-lg">
              <img
                className="w-full h-auto p"
                src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
              />
            </div>

            {/* <label htmlFor="" id="customFileInput" className="custom-file-input text-black opacity-70">choose file</label> */}

            <input
              type="file"
              className="file-input file-input-ghost w-full max-w-xs custom-file-input"
              id="customFileInput"
              {...register("user_Photo")}
            />
          </div>

          {/* name field */}
          <div className="col-span-4">
            <label htmlFor="name" className="label">
              Name
            </label>

            <input
              name="name"
              type="text"
              placeholder="Name"
              className="input input-bordered input-md w-1/2 my-2 "
              defaultValue={user?.name}
              {...register("name")}
            />
          </div>

          {/* email field */}
          <div className="col-span-2">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered input-md w-full my-2"
              defaultValue={user?.email}
              {...register("email")}
              readOnly
            />
          </div>
          {/* phone field */}
          <div className="col-span-2">
            <label htmlFor="phone" className="label">
              {" "}
              Phone
            </label>
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              className="input input-bordered input-md w-full my-2"
              defaultValue={user?.phone}
              {...register("phone")}
            />
          </div>

          {/* address field */}
          <div className="col-span-2">
            <label htmlFor="address" className="label">
              Address
            </label>
            <input
              name="address"
              type="text"
              placeholder="Address"
              className="input input-bordered input-md w-full my-2"
              defaultValue={user?.address}
              {...register("address")}
            />
          </div>

          {/* zip code field */}
          <div className="col-span-2">
            <label htmlFor="zip_code" className="label">
              Zip code
            </label>
            <input
              name="zip_code"
              type="text"
              placeholder="Zip Code"
              className="input input-bordered input-md w-full my-2"
              defaultValue={user?.zip_code}
              {...register("zip_code")}
            />
          </div>

          <div className="col-span-4 flex items-center justify-center gap-x-4">
            {/* country field */}
            <div className="w-full">
              <label htmlFor="country">Country</label>
              <input
                name="country"
                type="text"
                placeholder="country"
                className="input input-bordered input-md w-full my-2"
                defaultValue={user?.country}
                {...register("country")}
              />
            </div>
            {/* country field */}
            <div className="w-full">
              <label htmlFor="city">City</label>
              <input
                name="city"
                type="text"
                placeholder="city"
                className="input input-bordered input-md w-full my-2"
                defaultValue={user?.city}
                {...register("city")}
              />
            </div>
            {/* country field */}
            <div className="w-full">
              <label htmlFor="state">State</label>
              <input
                name="state"
                type="text"
                placeholder="state"
                className="input input-bordered input-md w-full my-2"
                defaultValue={user?.state}
                {...register("state")}
              />
            </div>
          </div>

          <div className="col-span-5 flex justify-end ">
            <input
              type="submit"
              // className="input input-bordered input-md my-2"
              className="btn btn-wide bg-[#0369a1] text-white hover:bg-gray-600 hover:text-white"
              value={"Save"}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfileUpdateNew;
