import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "../../features/User/userApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";

const UserProfileUpdateNew = () => {
  const { user } = useSelector((state) => state?.auth);
  //   console.log(user);
  const { handleSubmit, register } = useForm();

  const [updateProfile, { isLoading, isError, error, isSuccess, data }] =
    useUpdateUserProfileMutation();

  const handleSubmitUserProfile = async (data) => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", data?.name);
      formData.append("phone", data?.phone);
      formData.append("email", data?.email);
      formData.append("address", data?.address);
      formData.append("city", data?.city);
      formData.append("country", data?.country);
      formData.append("zip_code", data?.zip_code); // Add zip_code
      formData.append("state", data?.state); // Add state
      formData.append("password", data?.password); // Add password
      formData.append("password_confirmation", data?.password_confirmation); // Add password_confirmation

      // Append the user_Photo if it exists
      if (data?.user_Photo?.length > 0) {
        formData.append("user_Photo", data?.user_Photo[0]);
      }

      await updateProfile(formData); // Await the API call

      // After the API call, you can check for success or error
      if (isSuccess) {
        toast.success(data?.message, { id: 1 });
      } else if (isError) {
        toast.error(error?.data?.message || error?.status, { id: 1 });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const errorMessages = UseErrorMessages(error);

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
                className="w-full h-auto"
                src={
                  user?.img
                    ? `${
                        import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                      }/uploads/users/${user?.img}`
                    : `https://cdn-icons-png.flaticon.com/512/149/149071.png`
                }
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
          <div className="col-span-4 flex items-center justify-between gap-x-4">
            <label htmlFor="" className="w-full ">
              New Password
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered input-md w-full my-2"
                {...register("password")}
              />
            </label>
            <label htmlFor="" className="w-full ">
              Confirm Password
              <input
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered input-md w-full my-2"
                {...register("password_confirmation")}
              />
            </label>
          </div>

          <div className="col-span-5 flex justify-end">
            <input
              type="submit"
              // className="input input-bordered input-md my-2"
              className="btn btn-wide bg-[#0369a1] text-white hover:bg-gray-600 hover:text-white"
              value={"Save"}
            />
          </div>
        </form>
      </div>
      {/* Display error messages */}
      {errorMessages.map((errorMessage, index) => (
        <p
          key={index}
          className="border border-red-400 p-3 sm:w-2/5 my-2 rounded-lg"
        >
          {errorMessage}
        </p>
      ))}
    </>
  );
};

export default UserProfileUpdateNew;
