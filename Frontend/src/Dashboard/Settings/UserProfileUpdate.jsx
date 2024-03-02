import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "../../features/User/userApi";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";

const UserProfileUpdate = () => {
  UseTitle("Profile");
  // Access the user data from the Redux store
  const { user } = useSelector((state) => state?.auth);

  // Initialize the form using react-hook-form
  const { handleSubmit, register } = useForm();

  // Call the user profile update mutation from the API
  const [updateProfile, { isLoading, isError, error, isSuccess, data }] =
    useUpdateUserProfileMutation();

  // Function to handle the user profile update
  const handleSubmitUserProfile = async (data) => {
    try {
      // Create a FormData object to send form data as a multi-part request
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", data?.name);
      formData.append("phone", data?.phone);
      formData.append("email", data?.email);
      formData.append("address", data?.address);
      formData.append("city", data?.city);
      formData.append("country", data?.country);
      formData.append("zip_code", data?.zip_code);
      formData.append("state", data?.state);
      formData.append("password", data?.password);
      formData.append("password_confirmation", data?.password_confirmation);

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

  // Retrieve error messages using a reusable function
  const errorMessages = UseErrorMessages(error);

  useEffect(() => {
    // Show loading toast while the update request is in progress
    if (isLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    // Show an error toast if there is an error during profile update
    if (isError) {
      toast.error(error?.data?.message || error?.status, { id: 1 });
    }

    // Show a success toast if the update is successful
    if (isSuccess) {
      toast.success(data?.message, { id: 1 });
    }
  }, [isLoading, isError, error, isSuccess, data]);

  return (
    <div className="bg-gray-100 p-5 m-5">
      <h2 className="text-2xl font-semibold my-5">User Profile</h2>
      <div className="">
        <form
          className="grid grid-cols-1 lg:grid-cols-5 gap-5 justify-center items-start"
          onSubmit={handleSubmit(handleSubmitUserProfile)}
        >
          {/* File upload for user photo */}
          <div className="w-full lg:row-span-5 flex flex-col lg:items-center">
            {/* Display current user photo */}
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

            {/* Input for selecting a new user photo */}
            <div className="form-control w-full mt-5">
              <input
                type="file"
                className="file-input file-input-bordered"
                id="customFileInput"
                {...register("user_Photo")}
              />
            </div>
          </div>

          {/* Name field */}
          <div className="lg:col-span-4">
            <label htmlFor="name" className="label">
              Name
            </label>

            <input
              name="name"
              type="text"
              placeholder="Name"
              className="input input-bordered input-md w-1/2 my-2"
              defaultValue={user?.name}
              {...register("name")}
            />
          </div>

          {/* Email field */}
          <div className="lg:col-span-2">
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

          {/* Phone field */}
          <div className="lg:col-span-2">
            <label htmlFor="phone" className="label">
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

          {/* Address field */}
          <div className="lg:col-span-2">
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

          {/* Zip code field */}
          <div className="lg:col-span-2">
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

          <div className="lg:col-span-4 flex flex-col lg:flex-row lg:items-center lg:justify-center gap-x-4">
            {/* Country field */}
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
            {/* City field */}
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
            {/* State field */}
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

          <div className="lg:col-span-4 flex flex-col lg:flex-row lg:items-center lg:justify-center gap-x-4">
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

          <div className="lg:col-span-5 flex flex-col lg:flex-row lg:items-center lg:justify-end gap-x-4">
            <input
              type="submit"
              className="btn w-full lg:btn-wide bg-[#0369a1] text-white hover:bg-gray-600 hover:text-white"
              value={"Save"}
            />
          </div>
        </form>
      </div>
      {/* Display error messages if any */}
      {errorMessages?.map((errorMessage, index) => (
        <p
          key={index}
          className="border border-red-400 p-3 sm:w-2/5 my-2 rounded-lg"
        >
          {errorMessage}
        </p>
      ))}
    </div>
  );
};

export default UserProfileUpdate;
