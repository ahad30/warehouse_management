import { toast } from "react-hot-toast";

const useSuccessMessage = (message) => {
  return toast.success(message, { id: 1 });
};

export default useSuccessMessage;
