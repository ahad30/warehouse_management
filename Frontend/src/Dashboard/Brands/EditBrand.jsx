import { bool, func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useUpdateBrandMutation } from "../../features/Brand/brandApi";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import useShowAsyncMessage from "../../components/Reusable/UseShowAsyncMessage/useShowAsyncMessage";

const EditBrand = ({ modalIsOpen, setModalIsOpen, brand }) => {
  const { register, handleSubmit, setValue } = useForm();

  const [
    updateBrand,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
      data: updateData,
    },
  ] = useUpdateBrandMutation();

  const onSubmit = (data) => {
    if (!data.brand_name) {
      toast.error("Please fill in all required fields.", { id: 1 });
      return;
    }
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("brand_name", data?.brand_name);
    formData.append("id", brand.id);

    if (data?.brand_img.length > 0) {
      formData.append("brand_img", data?.brand_img[0]);
    }
    const brandId = brand?.id;
    updateBrand({ data: formData, id: brandId });
  };

  UseErrorMessages(updateError);
  useShowAsyncMessage(
    updateIsLoading,
    updateIsError,
    updateError,
    updateIsSuccess,
    updateData,
    "/dashboard/brand",
    setModalIsOpen
  );

  // Set default values using setValue from react-hook-form
  useEffect(() => {
    if (brand) {
      setValue("brand_name", brand?.brand_name || "");
      // setValue("brand_img", brand?.brand_img || "");
    }
  }, [brand, setValue]);

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
                Update Brand
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
                        placeholder="Brand Name"
                        className="input input-bordered w-full"
                        {...register("brand_name")}
                      />
                    </label>
                    <div className="form-control w-full">
                      <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...register("brand_img")}
                      />
                    </div>
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

EditBrand.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
  brand: object,
};

export default EditBrand;
