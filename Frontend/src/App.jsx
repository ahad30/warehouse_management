import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { useDispatch } from "react-redux";
import { getUser, logOut } from "./features/Auth/authSlice";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "./components/Reusable/useLoading/UseLoading";
import UseTitle from "./components/Reusable/UseTitle/UseTitle";

function App() {
  UseTitle("Invoice Management");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let access_token = localStorage.getItem("access_token");
    access_token = JSON.parse(access_token);

    if (access_token) {
      setLoading(true);

      fetch(`${import.meta.env.VITE_REACT_APP_PORT}/profile/findLoggedInUser`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.status) {
            toast.error(data?.message, { id: 1 });
            dispatch(logOut());
            setLoading(false);
          }
          if (data?.status) {
            setUser(data?.user);
            setLoading(false);
          }
        });
    }
  }, [dispatch]);

  dispatch(getUser(user));

  if (loading) {
    return <UseLoading />;
  }

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
