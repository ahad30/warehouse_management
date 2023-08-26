import { AiOutlineUserAdd } from "react-icons/ai";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import SubmitButton from "../../components/Reusable/Buttons/SubmitButton";
import { useForm } from "react-hook-form";

const AddCustomer = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <DashboardBackground>
      <h2 className="text-xl my-5 font-semibold">Add Customer</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              Name<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="text"
              placeholder="Full Name"
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
              required
              {...register("phone")}
            />
          </label>
          <label className="input-group">
            <span className="font-semibold min-w-[100px]">
              Email<span className="text-red-500 p-0">*</span>
            </span>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
              {...register("email")}
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
            <span className="font-semibold min-w-[100px]">Notes</span>
            <input
              type="text"
              placeholder="Notes"
              className="input input-bordered w-full"
              {...register("notes")}
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
          icon={<AiOutlineUserAdd size={20} />}
          title="Add Customer"
        />
      </form>
    </DashboardBackground>
  );
};

export default AddCustomer;
