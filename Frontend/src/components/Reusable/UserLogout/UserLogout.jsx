import { useEffect } from "react";
import { useUserLogOutMutation } from "../../../features/User/userApi";
import { toast } from "react-hot-toast";
import { logOut } from "../../../features/Auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  // Access the Redux dispatch function
  const dispatch = useDispatch();

  // Access the navigation function for routing
  const navigate = useNavigate();

  // Call the user logout mutation from the API
  const [userLogOut, { isLoading, isError, error, isSuccess, data }] =
    useUserLogOutMutation();

  // Function to initiate the user logout
  const handleLogOut = () => {
    userLogOut();
  };

  useEffect(() => {
    // Show a loading toast while the logout request is in progress
    if (isLoading) {
      toast.loading(<p>Loading...</p>, { id: 1 });
    }

    // Show an error toast if there is an error during logout
    if (isError && !data?.status) {
      toast.error(error?.data?.message);
    }

    // If the logout is successful, update the Redux store, navigate to the login page, and show a success toast
    if (isSuccess && data?.status) {
      dispatch(logOut()); // Dispatch a logout action to update the Redux store
      navigate("/login"); // Redirect to the login page
      toast.success(data?.message, { id: 1 }); // Show a success message
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

  return handleLogOut; // Return the handleLogOut function
};

export default UserLogout;
