import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { useDispatch } from "react-redux";
import { getUser } from "./features/Auth/authSlice";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import UseLoading from "./components/Reusable/useLoading/UseLoading";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let access_token = localStorage.getItem("access_token");
    access_token = JSON.parse(access_token);
    setLoading(false);

    if (access_token) {
      fetch(`${import.meta.env.VITE_REACT_APP_PORT}/profile/findLoggedInUser`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.status) {
            setUser(data?.user);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

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
