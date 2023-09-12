import { BiCartAdd } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useAddProductMutation } from "../../features/Product/productApi";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const [addProduct, { isLoading, error, isSuccess }] = useAddProductMutation();

  const onSubmit = (data) => {
    console.log(data);
    addProduct(data);
  };

  console.log("error", error);
  console.log("isSuccess", isSuccess);

  return (
    <DashboardBackground>
      <h2 className="text-xl my-5 font-semibold">Add Product</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="input-group">
            <span className="font-semibold">
              Name<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Product Name"
              className="input input-bordered w-full"
              required
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
              required
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
              required
              {...register("price")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold">
              Unit<span className="text-red-500 p-0">*</span>
            </span>
            <select
              className="select select-bordered w-full"
              required
              {...register("unit")}
            >
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
              required
              {...register("category_id")}
            >
              <option value={"1"}>Medicine</option>
              <option value={"1"}>Phone</option>
              <option value={"1"}>Grocery</option>
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
          <div className="form-control w-full">
            <input
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>
        </div>
        <SubmitButton
          title={isLoading ? "Saving Product" : "Save Product"}
          icon={<BiCartAdd size={20} />}
        />
      </form>
    </DashboardBackground>
  );
};

export default AddProduct;
