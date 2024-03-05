import { bool, func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../features/Category/categoryApi";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import useShowAsyncMessage from "../../components/Reusable/UseShowAsyncMessage/useShowAsyncMessage";

const EditCategory = ({ modalIsOpen, setModalIsOpen, category }) => {
  const { register, handleSubmit, setValue } = useForm();
  // const { data: storesData } = useGetStoresQuery();
  const [selectedImages, setSelectedImages] = useState([]);
  const [
    updateCategory,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
      data: updateData,
    },
  ] = useUpdateCategoryMutation();
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
    if (!data.category_name) {
      toast.error("Please fill in all required fields.", { id: 1 });
      return;
    }

    let formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("id", category?.id);
    formData.append("category_name", data?.category_name);

    if (data?.new_image?.length > 0) {
      formData.append("image", data?.new_image[0]);
    }
    if (data?.description) {
      formData.append("description", data?.description);
    }

    updateCategory({ data: formData, id: category?.id });
    console.log(data);
  };

  UseErrorMessages(updateError);
  useShowAsyncMessage(
    updateIsLoading,
    updateIsError,
    updateError,
    updateIsSuccess,
    updateData,
    "/dashboard/category",
    setModalIsOpen
  );

  // Set default values using setValue from react-hook-form
  useEffect(() => {
    if (category) {
      setValue("category_name", category?.category_name || "");
      setValue("description", category?.description || "");

      setValue("image", category?.image || "");
    }
  }, [category, setValue]);

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
                Update Category
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
                        placeholder="Category Name"
                        className="input input-bordered w-full"
                        {...register("category_name")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">Description</span>
                      <input
                        type="text"
                        placeholder="Category Description"
                        className="input input-bordered w-full"
                        {...register("description")}
                      />
                    </label>

                    <label className="input-group  file-input file-input-bordered">
                      <span className="font-semibold min-w-[100px] cursor-pointer">
                        Image
                      </span>
                      <input
                        type="file"
                        className="input input-bordered w-full hidden "
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

EditCategory.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
  category: object,
};

export default EditCategory;
