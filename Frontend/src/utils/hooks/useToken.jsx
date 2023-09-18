import { toast } from "react-hot-toast";

export const useToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.api_token;
  console.log(token);
  if (!token) {
    toast.error("Your not authorized!", { id: 1 });
  }
  return token;
};
