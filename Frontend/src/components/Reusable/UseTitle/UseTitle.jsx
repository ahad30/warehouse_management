import { useEffect } from "react";

const UseTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Invoice Management`;
  }, [title]);
};

export default UseTitle;
