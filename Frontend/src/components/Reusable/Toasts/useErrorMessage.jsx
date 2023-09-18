import { toast } from "react-hot-toast";

const useErrorMessage = (message) => {
  return toast.error(message, { id: 1 });
};

export default useErrorMessage;
