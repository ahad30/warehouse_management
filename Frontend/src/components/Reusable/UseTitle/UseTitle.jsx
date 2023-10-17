import { useEffect } from "react";
import { useGetCompanyInfoQuery } from "../../../features/Settings/settingsApi";

const UseTitle = (title) => {
  const { data } = useGetCompanyInfoQuery();

  useEffect(() => {
    document.title = `${title} - ${
      data?.company_info?.company_name || "Invoice Management"
    } `;
  }, [title, data?.company_info?.company_name]);
};

export default UseTitle;
