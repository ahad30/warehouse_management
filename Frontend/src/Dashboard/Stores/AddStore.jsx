import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { UseErrorMessages } from "../../components/Reusable/UseErrorMessages/UseErrorMessages";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import { FaStore } from "react-icons/fa";
import { useAddStoreMutation } from "../../features/Store/storeApi";
import useShowAsyncMessage from "../../components/Reusable/UseShowAsyncMessage/useShowAsyncMessage";

const AddStore = () => {
  UseTitle("Add Warehouse");
  const { register, handleSubmit } = useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [addStore, { isLoading, isError, error, isSuccess, data }] =
    useAddStoreMutation();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("country", data?.country);
    formData.append("city", data?.city);
    formData.append("address", data?.address);
    formData.append("phone", data?.phone);
    formData.append("site_link", data?.site_link);
    formData.append("email", data?.email);
    if (data?.image) {
      formData.append("image", data?.image[0]);
    }
    addStore(formData);
    // console.log(data);
  };

  // const errorMessages = UseErrorMessages(error);
  UseErrorMessages(error);
  useShowAsyncMessage(
    isLoading,
    isError,
    error,
    isSuccess,
    data,
    "/dashboard/store"
  );

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

  return (
    <DashboardBackground>
      <h2 className="text-xl my-5 font-semibold">Add Warehouse</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              Name<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full"
              {...register("name")}
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
              required
              {...register("country")}
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
              required
              {...register("city")}
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
              required
              {...register("address")}
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
              required
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
            <span className="font-semibold min-w-[100px]"> Link</span>
            <input
              type="text"
              placeholder="Web link"
              className="input input-bordered w-full"
              {...register("site_link")}
            />
          </label>
          <label className="input-group  file-input file-input-bordered">
            <span className="font-semibold min-w-[100px] cursor-pointer">
              Image
            </span>
            <input
              type="file"
              className="input input-bordered w-full hidden"
              // {...register("image")}
              {...register("image", {
                onChange: (e) => handleImageChange(e),
              })}
            />
            <p className="py-3 px-2"> {selectedImages.length}</p>
          </label>
        </div>
        <SubmitButton
          icon={<FaStore size={20} />}
          title={isLoading ? "Adding Store..." : "Add Warehouse"}
          isLoading={isLoading}
        />
      </form>
    </DashboardBackground>
  );
};

export default AddStore;
