import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/Auth/authSlice";

const Login = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.auth);

  const handleOnSubmit = async ({ email, password }) => {
    dispatch(loginUser({ email, password }));
  };
  let user = JSON.parse(localStorage.getItem("user"));
  let token = user?.api_token;

  if (token) {
    return navigate("/dashboard");
  }

  // const url = import.meta.env.VITE_REACT_APP_PORT;
  // https://laptop-hunter-server-mmorshedulislam.vercel.app/users
  // http://127.0.0.1:8000/api/login
  // https://jsonplaceholder.typicode.com/posts

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
              {isLoading ? "Logging..." : "Log In"}
            </button>
          </div>
        </form>
        {error && <p className="text-center">{error}</p>}
        <p className="text-center">
          <Link to="/" className="text-blue-700 font-semibold">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
