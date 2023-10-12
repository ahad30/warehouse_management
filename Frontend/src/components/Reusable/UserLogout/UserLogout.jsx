import { useEffect } from "react";
import { useUserLogOutMutation } from "../../../features/User/userApi";
import { toast } from "react-hot-toast";
import { logOut } from "../../../features/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogOut, { isLoading, isError, error, isSuccess, data }] =
    useUserLogOutMutation();

  const handleLogOut = () => {
    userLogOut();
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading(<p>Loading...</p>, { id: 1 });
    }
    if (isError && !data?.status) {
      toast.error(error?.data?.message);
    }

    if (isSuccess && data?.status) {
      dispatch(logOut());
      navigate("/login");
      toast.success(data?.message, { id: 1 });
    }
  }, [
    data?.message,
    data?.status,
    dispatch,
    error?.data?.message,
    isError,
    isLoading,
    isSuccess,
    navigate,
  ]);

  return handleLogOut;
};

export default UserLogout;
