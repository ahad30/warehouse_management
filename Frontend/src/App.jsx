import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { useDispatch } from "react-redux";
import { getUser } from "./features/Auth/authSlice";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
