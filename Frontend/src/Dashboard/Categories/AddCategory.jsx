import { BiSolidDuplicate } from "react-icons/bi";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddCategory = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const headers = {
      'Authorization': `Bearer 21|laravel_sanctum_4M6Qd1Hk2Gu7eDzxSXdZAZwlD6Y9LBEq0aBYAlAq649a1543`,
      "content-type": "application/json",

    };
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/categories/store",
        data,
        { headers }
      );
      // const data = res;
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    console.log(data);
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
              {...register("name")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[110px]">Description</span>
            <input
              type="text"
              placeholder="Category Description"
              className="input input-bordered w-full"
              {...register("desc")}
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
