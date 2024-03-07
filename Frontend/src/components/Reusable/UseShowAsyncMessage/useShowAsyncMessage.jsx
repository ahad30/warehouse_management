import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useShowAsyncMessage = (
  isLoading,
  isError,
  error,
  isSuccess,
  data,
  path,
  setModalIsOpen = false
) => {
  const navigate = useNavigate();
  return useEffect(() => {
    if (isLoading) {
      toast.loading(<p>Loading...</p>, { id: 1 });
    }
    // if (isError || error) {
    //   const errorMsg = error?.data?.message;

    //   // const errorMessa;
    //   toast.error(errorMsg, { id: 1 });
    // }
    else if (isSuccess && data?.status) {
      //   setAddedProduct([]);
      //   setTax("");
      //   setDiscount("");
      //   setShipping("");
      toast.success(data?.message, { id: 1 });
      if (setModalIsOpen) {
        setModalIsOpen(false);
      }
      if (path) {
        navigate(path);
      }
      // return navigate("/dashboard/product");
    }
  }, [isLoading, isError, error, isSuccess, data, path]);
};

export default useShowAsyncMessage;
