import { bool, func, object } from "prop-types";
import { useForm } from "react-hook-form";
import { useUpdateProductMutation } from "../../features/Product/productApi";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useGetCategoriesQuery } from "../../features/Category/categoryApi";
import { useGetBrandsQuery } from "../../features/Brand/brandApi";
import { useGetStoresQuery } from "../../features/Store/storeApi";

const EditProduct = ({ modalIsOpen, setModalIsOpen, product }) => {
  const { register, handleSubmit, setValue } = useForm();

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: brandsData } = useGetBrandsQuery();
  const { data: storesData } = useGetStoresQuery();

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
      setValue("product_name", product?.product_name || "");
      setValue("product_code", product?.product_code || "");
      setValue("product_unit", product?.product_unit || "");
      setValue("product_quantity", product?.product_quantity || "1");
      setValue("product_desc", product?.product_desc || "");
      setValue("product_retail_price", product?.product_retail_price || "");
      setValue("product_sale_price", product?.product_sale_price || "");
      setValue("store_id", product?.store_id || "");
      setValue("category_id", product?.category_id || "");
      setValue("brand_id", product?.brand_id || "");
      setValue("product_img", product?.product_img || "");
    }
  }, [product, setValue]);

  const onSubmit = (data) => {
    console.log(data);
    if (!data.product_name) {
      toast.error("Please fill in all required fields.", { id: 1 });
      return;
    }
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("product_name", data?.product_name);
    formData.append("product_code", data?.product_code);
    formData.append("product_quantity", data?.product_quantity);
    formData.append("product_unit", data?.product_unit);
    formData.append("product_desc", data?.product_desc);
    formData.append("product_retail_price", data?.product_retail_price);
    formData.append("product_sale_price", data?.product_sale_price);
    formData.append("product_sale_price", data?.product_sale_price);
    formData.append("store_id", data?.store_id);
    formData.append("category_id", data?.category_id);
    formData.append("brand_id", data?.brand_id);
    formData.append("id", product.id);
    if (data?.product_img.length > 0) {
      formData.append("product_img", data?.product_img[0]);
    }

    updateProduct(formData);
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
                        {...register("product_name")}
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
                        {...register("product_code")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Retail<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="number"
                        placeholder="Retail"
                        className="input input-bordered w-full"
                        {...register("product_retail_price")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Sold<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="number"
                        placeholder="Sold"
                        className="input input-bordered w-full"
                        {...register("product_sale_price")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Quantity<span className="text-red-500 p-0">*</span>
                      </span>
                      <input
                        type="number"
                        placeholder="Quantity"
                        className="input input-bordered w-full"
                        {...register("product_quantity")}
                      />
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Unit<span className="text-red-500 p-0">*</span>
                      </span>
                      <select
                        className="select select-bordered w-full"
                        {...register("product_unit")}
                      >
                        <option>Select Unit</option>
                        <option value={"pcs"}>Pcs</option>
                        <option value={"box"}>Box</option>
                        <option value={"kg"}>KG</option>
                        <option value={"litre"}>Litre</option>
                      </select>
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Brands<span className="text-red-500 p-0">*</span>
                      </span>
                      <select
                        className="select select-bordered w-full"
                        required
                        {...register("brand_id")}
                      >
                        <option value={""}>Select Brand</option>
                        {brandsData?.brands?.map((brand) => (
                          <option value={brand?.id} key={brand?.id}>
                            {brand?.brand_name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="input-group">
                      <span className="font-semibold">
                        Store<span className="text-red-500 p-0">*</span>
                      </span>
                      <select
                        className="select select-bordered w-full"
                        required
                        {...register("store_id")}
                      >
                        <option value={""}>Select Store Info</option>
                        {storesData?.stores?.map((store) => (
                          <option key={store?.id} value={store?.id}>
                            {store?.store_name}
                          </option>
                        ))}
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
                        {...register("product_desc")}
                      />
                    </label>
                    <div className="form-control w-full">
                      <input
                        type="file"
                        className="file-input file-input-bordered w-full"
                        {...register("product_img")}
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

EditProduct.propTypes = {
  modalIsOpen: bool,
  setModalIsOpen: func,
  product: object,
};

export default EditProduct;
