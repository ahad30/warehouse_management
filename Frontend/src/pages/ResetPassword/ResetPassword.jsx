import { useLocation, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  // console.log(token)
  const location = useLocation();
  const queryParams = new URLSearchParams(location?.search);
  const email = queryParams.get("email");
  // console.log(email)

  const handleResetPassword = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form?.email?.value;
    const password = form?.password?.value;
    const password_confirmation = form?.password_confirmation?.value;

    fetch("http://localhost:8000/api/reset-password", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        token: token
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
              Current Password
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
              New Password
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
            value={"submit"}
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
