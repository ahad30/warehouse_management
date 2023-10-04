import { bool, func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import {
  useGetUserRolesQuery,
  useUpdateUserMutation,
} from "../../features/User/userApi";

const EditUser = ({ modalIsOpen, setModalIsOpen, user }) => {
  const { register, handleSubmit, setValue } = useForm();
  const { data: rolesData } = useGetUserRolesQuery();

  const [
    updateUser,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
      data: updateData,
    },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (updateIsLoading) {
      toast.loading("Loading...", { id: 1 });
    }

    if (updateIsError) {
      toast.error(updateError?.data?.message || updateError?.status, { id: 1 });
    }

    if (updateIsSuccess) {
      toast.success(updateData?.message, { id: 1 });
      setModalIsOpen(false);
    }
  }, [
    updateIsLoading,
    updateIsError,
    updateError,
    updateIsSuccess,
    updateData?.message,
    setModalIsOpen,
  ]);

  // Set default values using setValue from react-hook-form
  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("role_id", user.role_id || "");
      setValue("status", user.status || "");
      setValue("address", user.address || "");
      setValue("city", user.city || "");
      setValue("country", user.country || "");
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    // Ensure all required fields have values
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.role_id ||
      !data.status ||
      !data.address ||
      !data.city ||
      !data.country
    ) {
      toast.error("Please fill in all required fields.", { id: 1 });
      return; // Exit early if any required field is missing
    }

    updateUser({ ...data, id: user?.id });
  };

  return modalIsOpen ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setModalIsOpen(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div>
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <p className="text-lg font-semibold text-center mb-5">
                Update Product
              </p>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-5 w-full">
                    <label className="input-group">
                      <span className="font-semibold">
                        Name<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Product Name"
                        className="input input-bordered w-full"
                        {...register("name")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Email<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        {...register("email")}
                        readOnly
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Phone<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Phone"
                        className="input input-bordered w-full"
                        {...register("phone")}
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
                        Status<span className="text-red-500 p-0">*</span>
                      </span>
                      <select
                        className="select select-bordered w-full"
                        {...register("status")}
                      >
                        <option value={"active"}>Active</option>
                        <option value={"inactive"}>Inactive</option>
                      </select>
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Address<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Address"
                        className="input input-bordered w-full"
                        {...register("address")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        City<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="City"
                        className="input input-bordered w-full"
                        {...register("city")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
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

                  <div className="items-center gap-2 mt-3 sm:flex">
                    <input
                      type="submit"
                      value={"Update"}
                      className="cursor-pointer w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                    />

                    <button
                      className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                      onClick={() => setModalIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

EditUser.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
  user: object,
};

export default EditUser;
