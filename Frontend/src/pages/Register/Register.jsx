import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";

const Register = () => {
  UseTitle("Register");
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const handleOnSubmit = (data) => {
    if (data.email === "admin@mail.com" && data.password === "123456") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center max-w-[1440px] h-screen mx-auto bg-gray-100 rounded-md p-10">
      <div className="w-full">
        <h2 className="text-center text-3xl mb-5">User Register</h2>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-md"
              {...register("name")}
            />
          </div>
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Email or Username</span>
            </label>
            <input
              type="email"
              placeholder="Email or Username"
              className="input input-bordered w-full max-w-md"
              {...register("email")}
            />
          </div>
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="******"
              className="input input-bordered w-full max-w-md"
              {...register("password")}
            />
          </div>
          <div className="form-control w-full max-w-md mx-auto">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="******"
              className="input input-bordered w-full max-w-md"
              {...register("password_confirm")}
            />
          </div>
          <div className="flex justify-center my-5">
            <button className="bg-gray-600 hover:bg-gray-400 text-white p-2 rounded-md btn btn-block max-w-md">
              Register
            </button>
          </div>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
