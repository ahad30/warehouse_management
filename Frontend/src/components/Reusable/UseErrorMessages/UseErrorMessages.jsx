import { useEffect, useState } from "react";

export const 
UseErrorMessages = (error) => {
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (error && error?.data && error?.data?.errors) {
      const messages = [];

      for (const key in error?.data?.errors) {
        if (Array.isArray(error?.data?.errors[key])) {
          error?.data?.errors[key].forEach((errorMessage) => {
            messages.push(errorMessage);
          });
        }
      }

      setErrorMessages(messages);
    }
  }, [error]);

  return errorMessages;
};
