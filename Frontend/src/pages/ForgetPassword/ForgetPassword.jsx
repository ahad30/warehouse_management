import { useState } from "react";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";

const ForgetPassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataTrue, setDataTrue] = useState(null);
  UseTitle("Forget-Password");

  const handleForgetPassword = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e?.target;
    const email = form?.email?.value;
    fetch(`${import.meta.env.VITE_REACT_APP_PORT}/forgot-password`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.message) {
          setMessage(data?.message);
          setLoading(false);
        }
        if (data?.status) {
          setDataTrue(true);
        }
      });
  };
  return (
    <div className="min-h-screen flex justify-center items-center  bg-gray-100">
      <div className="max-w-[1440px] w-1/2 flex justify-center items-center  ">
        <form onSubmit={handleForgetPassword} className="  w-1/2 " action="">
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              className="input my-1 input-bordered w-full max-w-md"
              type="email"
              name="email"
              id="email"
            />
          </div>

          <input
            className="bg-gray-600  my-2 hover:bg-gray-400 text-white p-2 rounded-md btn btn-block max-w-md"
            type="submit"
            value={loading ? "loading..." : "submit"}
          />

          {message && (
            <p
              className={
                dataTrue
                  ? "text-green-400 font-bold p-4 border border-green-400"
                  : "text-red-400 font-bold p-4 border border-red-400"
              }
            >
              { message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
