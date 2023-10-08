import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const { token } = useParams();

  const [loading, setLoading] = useState(false);

  // console.log(token)
  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const email = queryParams.get("email");
  const navigate = useNavigate();
  // console.log(email)

  const handleResetPassword = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form?.email?.value;
    const password = form?.password?.value;
    const password_confirmation = form?.password_confirmation?.value;

    fetch(`${import.meta.env.VITE_REACT_APP_PORT}/reset-password`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        token: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status && data?.message) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: data?.message,
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/login");
          setLoading(false)
        }
        if (!data?.status && data?.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data?.message,
          });
        }
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center  bg-gray-100">
      <div className="max-w-[1440px] w-1/2 flex justify-center items-center  ">
        <form onSubmit={handleResetPassword} className="  w-1/2 " action="">
          {/* email field */}
          <div>
            <label htmlFor="email" className="block label text-gray-700">
              Email
            </label>
            <input
              className="input my-1 input-bordered w-full max-w-md"
              type="email"
              name="email"
              id="email"
              value={email}
            />
          </div>

          {/* current password field */}
          <div>
            <label htmlFor="password" className="block label text-gray-700">
              New password
            </label>
            <input
              className="input my-1 input-bordered w-full max-w-md"
              type="password"
              name="password"
              id="password"
            />
          </div>

          {/* new password field */}
          <div>
            <label htmlFor="new_password" className="block label text-gray-700">
              confirm password
            </label>

            <input
              className="input my-1 input-bordered w-full max-w-md"
              type="password"
              name="password_confirmation"
              id="new_password"
            />
          </div>

          <input
            className="bg-gray-600  my-3 hover:bg-gray-400 text-white p-2 rounded-md btn btn-block max-w-md"
            type="submit"
            value={loading ? "loding..." : "submit"}
          />

          {/* {message && (
            <p
              className={
                dataTrue
                  ? "text-green-400 font-bold p-4 border border-green-400"
                  : "text-red-400 font-bold p-4 border border-red-400"
              }
            >
              {message}
            </p>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
