import { bool, func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { useUpdateProductMutation } from "../../features/Product/productApi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useGetCategoriesQuery } from "../../features/Category/categoryApi";

const EditProduct = ({ modalIsOpen, setModalIsOpen, product }) => {
  const { register, handleSubmit, setValue } = useForm();

  const [
    updateProduct,
    {
      isLoading: updateIsLoading,
      isError: updateIsError,
      error: updateError,
      isSuccess: updateIsSuccess,
      data: updateData,
    },
  ] = useUpdateProductMutation();

  const { data: categoriesData } = useGetCategoriesQuery();

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
    if (product) {
      setValue("name", product.name || "");
      setValue("code", product.code || "");
      setValue("price", product.price || "");
      setValue("unit", product.unit || "pcs");
      setValue("category_id", product.category_id || "1");
      setValue("desc", product.desc || "");
    }
  }, [product, setValue]);

  // const onSubmit = (data) => {
  //   console.log(data);
  //   updateProduct(product?.id, data);
  // };

  const onSubmit = (data) => {
    console.log(data);
    // Ensure all required fields have values
    if (
      !data.name ||
      !data.code ||
      !data.price ||
      !data.unit ||
      !data.category_id
    ) {
      toast.error("Please fill in all required fields.", { id: 1 });
      return; // Exit early if any required field is missing
    }

    updateProduct({ ...data, id: product?.id });
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
                        Code<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="text"
                        placeholder="Product Code"
                        className="input input-bordered w-full"
                        {...register("code")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Price<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="number"
                        placeholder="Product Price"
                        className="input input-bordered w-full"
                        {...register("price")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Unit<span className="text-red-500 p-0">*</span>
                      </span>
                      <select
                        className="select select-bordered w-full"
                        {...register("unit")}
                      >
                        <option>Select Unit</option>
                        <option value={"pcs"}>Pcs</option>
                        <option value={"box"}>Box</option>
                        <option value={"kg"}>KG</option>
                      </select>
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Category<span className="text-red-500 p-0">*</span>
                      </span>
                      <select
                        className="select select-bordered w-full"
                        {...register("category_id")}
                      >
                        <option>Select Category</option>
                        {categoriesData?.categories?.map((category, idx) => (
                          <option key={idx} value={category?.id}>
                            {category?.category_name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">Description</span>
                      <input
                        type="text"
                        placeholder="Product Description"
                        className="input input-bordered w-full"
                        {...register("desc")}
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

EditProduct.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
  product: object,
};

export default EditProduct;
