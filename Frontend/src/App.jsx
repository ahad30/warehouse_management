import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { useDispatch } from "react-redux";
import { getUser } from "./features/Auth/authSlice";

function App() {
  const dispatch = useDispatch();
  dispatch(getUser());
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
