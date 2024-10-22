import { bool, func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useUpdateStoreMutation } from "../../features/Store/storeApi";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import useShowAsyncMessage from "../../components/Reusable/UseShowAsyncMessage/useShowAsyncMessage";

const EditStore = ({ modalIsOpen, setModalIsOpen, store }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [selectedImages, setSelectedImages] = useState([]);

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

console.log(updateData);

  const handleImageChange = (e) => {
    const files = e.target.files;
    console.log(files.length);
    if (files.length > 5) {
      console.log("succeed");
      return alert("maximum upload 5");
    } else {
      console.log("You can not more then five image");
      const imagesArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedImages(imagesArray);
    }
  };
  const onSubmit = (data) => {
    if (!store?.name || !store?.phone || !store?.address) {
      toast.error("Please fill in all required fields.", { id: 1 });
      return;
    }

    let formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("name", data?.name);
    formData.append("country", data?.country);
    formData.append("city", data?.city);
    formData.append("address", data?.address);
    formData.append("phone", data?.phone);
    formData.append("site_link", data?.site_link);
    formData.append("email", data?.email);
    if (data?.image.length > 0) {
      formData.append("image", data?.image[0]);
    }

    updateStore({ data: formData, id: store?.id });
    // updateStore(formData);
    console.log(data);
  };

  UseErrorMessages(updateError);
  useShowAsyncMessage(
    updateIsLoading,
    updateIsError,
    updateError,
    updateIsSuccess,
    updateData,
    "/dashboard/store",
    setModalIsOpen
  );

  useEffect(() => {
    if (store) {
      setValue("name", store?.name || "");
      setValue("email", store?.email || "");
      setValue("phone", store?.phone || "");
      setValue("site_link", store?.site_link || "");
      setValue("address", store?.address || "");
      setValue("city", store?.city || "");
      setValue("country", store?.country || "");
      setValue("image", store?.image || "");
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
                        placeholder="Warehouse Name"
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
                        {...register("phone")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold min-w-[100px]">Email</span>
                      <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        {...register("email")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold min-w-[100px]">Web</span>
                      <input
                        type="text"
                        placeholder="Warehouse Web link"
                        className="input input-bordered w-full"
                        {...register("site_link")}
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
                        {...register("address")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold min-w-[100px]">
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
                      <span className="font-semibold min-w-[100px]">
                        Country<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Country"
                        className="input input-bordered w-full"
                        {...register("country")}
                      />
                    </label>
                    <label className="input-group  file-input file-input-bordered">
                      <span className="font-semibold min-w-[100px] cursor-pointer">
                        Image
                      </span>
                      <input
                        type="file"
                        className="input input-bordered w-full hidden"
                        {...register("image", {
                          onChange: (e) => handleImageChange(e),
                        })}
                      />
                      <p className="py-3 px-2"> {selectedImages.length}</p>
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

EditStore.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
  store: object,
};

export default EditStore;
