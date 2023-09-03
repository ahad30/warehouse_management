import { toast } from "react-hot-toast";

export const useToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.api_token?.plainTextToken;
  if (!token) {
    return toast.error("Your not authorized!");
  }
  return token;
};
