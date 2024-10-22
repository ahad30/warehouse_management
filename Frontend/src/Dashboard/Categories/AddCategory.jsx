import { BiSolidDuplicate } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useAddCategoryMutation } from "../../features/Category/categoryApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import useShowAsyncMessage from "../../components/Reusable/UseShowAsyncMessage/useShowAsyncMessage";
// import { useGetStoresQuery } from "../../features/Store/storeApi";

const AddCategory = () => {
  UseTitle("Add Category");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);
  // const { data: storesData } = useGetStoresQuery();
  const [addCategory, { isLoading, isError, error, isSuccess, data }] =
    useAddCategoryMutation();

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("category_name", data?.category_name);

    if (data?.image?.length > 0) {
      formData.append("image", data?.image[0]);
    }
    if (data?.description) {
      formData.append("description", data?.description);
    }
    addCategory(formData);
  };

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

  UseErrorMessages(error);
  useShowAsyncMessage(
    isLoading,
    isError,
    error,
    isSuccess,
    data,
    "/dashboard/category"
  );

  return (
    <DashboardBackground>
      <h2 className="text-xl my-5 font-semibold">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-5">
          <label className="input-group  file-input file-input-bordered">
            <span className="font-semibold min-w-[100px] cursor-pointer">
              Image
            </span>
            <input
              type="file"
              className="input input-bordered w-full hidden "
              // {...register("image")}
              {...register("image", {
                onChange: (e) => handleImageChange(e),
              })}
            />
            <p className="py-3 px-2"> {selectedImages.length}</p>
          </label>

          <label className="input-group">
            <span className="font-semibold min-w-[110px]">
              Name<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Category Name"
              className="input input-bordered w-full"
              required
              {...register("category_name")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[110px]">Description</span>
            <input
              type="text"
              placeholder="Category Description"
              className="input input-bordered w-full"
              {...register("description")}
            />
          </label>
        </div>
        <SubmitButton
          title={isLoading ? "Adding Category..." : "Add Category"}
          icon={<BiSolidDuplicate size={20} />}
          isLoading={isLoading}
        />
      </form>
    </DashboardBackground>
  );
};

export default AddCategory;
