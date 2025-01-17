import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/Auth/authSlice";

import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import DemoLogin from "./DemoLogin";
import { toast } from "react-hot-toast";

const Login = () => {
  // Set the page title using the UseTitle custom hook
  UseTitle("Login");

  // Initialize form control with useForm from react-hook-form
  const { handleSubmit, register } = useForm();

  // Get navigation function for routing
  const navigate = useNavigate();

  // Access the Redux dispatch function
  const dispatch = useDispatch();

  // Get the current route location
  const location = useLocation();

  // Determine the route to redirect to after login
  let from = location.state?.from?.pathname || "/";

  // Get the loading status and error from the Redux store
  const { isLoading, error } = useSelector((state) => state?.auth);

  // Handle form submission
  const handleOnSubmit = async ({ email, password }) => {
    if (!email && !password) {
      return toast.error("Please provide your Login Credentials", { id: 1 });
    }
    // Dispatch the loginUser action with user credentials
    dispatch(loginUser({ email, password }));
  };

  // Check if the user has an access token in local storage
  let access_token = JSON.parse(localStorage.getItem("access_token"));

  if (access_token) {
    // Redirect to the originally requested route after successful login
    navigate(from, { replace: true });
    // return navigate("/");
  }

  return (
    <div className="p-10  bg-white">
      <div className="flex justify-center items-center max-w-[1440px] h-screen mx-auto rounded-md ">
        <div className="w-full lg:min-w-[800px] flex flex-col items-center justify-center border border-transparent lg:border-[#e2e8f0] lg:rounded-lg lg:bg-[#f8fafc] lg:h-[600px]">
          <h2 className="text-center text-3xl mb-5">User Login</h2>
          <form className=" w-full" onSubmit={handleSubmit(handleOnSubmit)}>
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

            <div className="w-full max-w-md mx-auto">
              {/* Forget Password */}
              <p className="text-end my-3">
                <Link
                  to="/forget-password"
                  className="text-blue-700 font-semibold"
                >
                  Forgot password?
                </Link>
              </p>
            </div>

            <div className="flex justify-center my-5">
              <button className="bg-[#0369a1] hover:bg-gray-400 text-white p-2 rounded-md btn btn-block max-w-md">
                {isLoading ? "Logging..." : "Log In"}
              </button>
            </div>
          </form>
          {error && <p className="text-center">{error}</p>}
          <div className="w-full my-5 max-w-md mx-auto">
            {/* <DemoLogin></DemoLogin> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
