import UseTitle from "../../components/Reusable/UseTitle/UseTitle";

const ForgetPassword = () => {
  UseTitle("Forget-Password");

  const handleForgetPassword = (e) => {
    e.preventDefault();
    const form = e?.target;
    const email = form?.email?.value;
    
  };
  return (
    <div className="min-h-screen flex justify-center items-center  bg-gray-100">
      <div className="max-w-[1440px] w-1/2 flex justify-center items-center  ">
        <form onSubmit={handleForgetPassword} className="  w-1/2 " action="">
          <div>
            <input
              className="input my-1 input-bordered w-full max-w-md"
              type="email"
              name="email"
              id=""
            />
          </div>

          <input
            className="bg-gray-600  my-2 hover:bg-gray-400 text-white p-2 rounded-md btn btn-block max-w-md"
            type="submit"
            value="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
