import { useDispatch } from "react-redux";
import { loginUser } from "../../features/Auth/authSlice";
import { useState } from "react";

const DemoLogin = () => {
  const [emailPassword, setEmailPassword] = useState({});
  const dispatch = useDispatch();

  const handleLogin = async () => {
    dispatch(loginUser({email: emailPassword?.email, password:emailPassword?.password}));
  };

  console.log(emailPassword)
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <p className="border-t border-gray-400 flex-grow"></p>
        <p className="text-gray-500">Or , Sing as</p>
        <p className="border-t border-gray-400 flex-grow"></p>
      </div>

      <div className="grid grid-cols-3 my-5 gap-2">
        {/* individual button */}
        <div
          onMouseOver={() =>
            setEmailPassword({ email: "admin@mail.com", password: "password" })
          }
          className="w-full"
        >
          <button
            onClick={handleLogin}
            className="btn border w-full border-blue-700 bg-white text-blue-700"
          >
            Admin
          </button>
        </div>
        {/* individual button */}
        <div
          onMouseOver={() =>
            setEmailPassword({ email: "admin@mail.com", password: "password" })
          }
          className="w-full"
        >
          <button
            onClick={handleLogin}
            className="btn border w-full border-blue-700 bg-white text-blue-700"
          >
            Admin
          </button>
        </div>
        {/* individual button */}
        <div
          onMouseOver={() =>
            setEmailPassword({ email: "admin@mail.com", password: "password" })
          }
          className="w-full"
        >
          <button
            onClick={handleLogin}
            className="btn border w-full border-blue-700 bg-white text-blue-700"
          >
            Admin
          </button>
        </div>
        {/* individual button */}
        <div
          onMouseOver={() =>
            setEmailPassword({ email: "admin@mail.com", password: "password" })
          }
          className="w-full"
        >
          <button
            onClick={handleLogin}
            className="btn border w-full border-blue-700 bg-white text-blue-700"
          >
            Admin
          </button>
        </div>
        {/* individual button */}
        <div
          onMouseOver={() =>
            setEmailPassword({ email: "admin@mail.com", password: "password" })
          }
          className="w-full"
        >
          <button
            onClick={handleLogin}
            className="btn border w-full border-blue-700 bg-white text-blue-700"
          >
            Admin
          </button>
        </div>
        {/* individual button */}
        <div
          onMouseOver={() =>
            setEmailPassword({ email: "admin@mail.com", password: "password" })
          }
          className="w-full"
        >
          <button
            onClick={handleLogin}
            className="btn border w-full border-blue-700 bg-white text-blue-700"
          >
            Admin
          </button>
        </div>


      </div>
    </div>
  );
};

export default DemoLogin;
