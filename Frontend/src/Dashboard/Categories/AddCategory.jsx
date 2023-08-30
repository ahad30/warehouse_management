import { BiSolidDuplicate } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addCategory } from "../../features/Category/categorySlice";

const AddCategory = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(addCategory(data));
    /* 
    fetch("http://localhost:8000/api/categories/store", {
      method: "POST",
      headers: {
        Authorization: `Bearer 27|laravel_sanctum_52jgDkVSyFfaOFB0Lbmj9rvbLdYasdndKwXPVPyqf35929a1`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
      */
  };

  return (
    <DashboardBackground>
      <h2 className="text-xl my-5 font-semibold">Add Category</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-5">
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
          title="Add Category"
          icon={<BiSolidDuplicate size={20} />}
        />
      </form>
    </DashboardBackground>
  );
};

export default AddCategory;
