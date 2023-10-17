import { bool, func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useUpdateStoreMutation } from "../../features/Store/storeApi";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";

const EditStore = ({ modalIsOpen, setModalIsOpen, store }) => {
  const { register, handleSubmit, setValue } = useForm();

  const [
    updateStore,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
      data: updateData,
    },
  ] = useUpdateStoreMutation();

  const onSubmit = (data) => {
    if (!store?.store_name || !store?.store_phone || !store?.store_address) {
      toast.error("Please fill in all required fields.", { id: 1 });
      return;
    }

    updateStore({ ...data, id: store?.id });
  };

  const errorMessages = UseErrorMessages(updateError);

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

  useEffect(() => {
    if (store) {
      setValue("store_name", store?.store_name || "");
      setValue("store_email", store?.store_email || "");
      setValue("store_phone", store?.store_phone || "");
      setValue("store_web", store?.store_web || "");
      setValue("store_address", store?.store_address || "");
    }
  }, [store, setValue]);

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
                Update Store
              </p>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-5">
                    <label className="input-group">
                      <span className="font-semibold min-w-[100px]">
                        Name<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Store Name"
                        className="input input-bordered w-full"
                        required
                        {...register("store_name")}
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
                        {...register("store_phone")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold min-w-[100px]">Email</span>
                      <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        {...register("store_email")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold min-w-[100px]">Web</span>
                      <input
                        type="url"
                        placeholder="Customer Web link"
                        className="input input-bordered w-full"
                        {...register("store_web")}
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
                        {...register("store_address")}
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
              {/* Display error messages */}
              {updateIsError &&
                errorMessages?.map((errorMessage, index) => (
                  <p
                    key={index}
                    className="border border-red-400 p-3 sm:w-2/5 my-2 rounded-lg"
                  >
                    {errorMessage}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

EditStore.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
  store: object,
};

export default EditStore;
