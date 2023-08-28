import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const handleOnSubmit = async (data) => {
    // const url = import.meta.env.VITE_REACT_APP_PORT;
    // https://laptop-hunter-server-mmorshedulislam.vercel.app/users
    const userData = {
      name: "test",
      email: "test@mail.com",
      password: "12345678",
      password_confirmation: "12345678",
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        userData
      );
      const token = response?.data?.plainTextToken;
      console.log(token);

      localStorage.setItem("accessToken", token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center max-w-[1440px] h-screen mx-auto bg-gray-100 rounded-md p-10">
      <div className="w-full">
        <h2 className="text-center text-3xl mb-5">User Login</h2>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
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
          <div className="flex justify-center my-5">
            <button className="bg-gray-600 hover:bg-gray-400 text-white p-2 rounded-md btn btn-block max-w-md">
              Log In
            </button>
          </div>
        </form>
        <p className="text-center">
          You don't have an account?{" "}
          <Link to="/register" className="text-blue-700 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
