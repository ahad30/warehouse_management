import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { BiSolidDuplicate } from "react-icons/bi";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import { useGetHistoryQuery } from "../../features/History/historyApi";
import Histories from "../SearchProducts/Histories";
import Paginator from "../../components/Paginator/Paginator";
import { useSelector } from "react-redux";

const HistoryList = () => {
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const ActivePageNumber = useSelector((state) => state?.pageSlice?.value);

  const { data: historiesData, isLoading: historiesIsLoading } =
    useGetHistoryQuery({ pageNumber: ActivePageNumber, query: query });

  useEffect(() => {
    setFilterData(historiesData?.data?.histories);
  }, [historiesData?.data]);

  // ALL CATEGORIES
  if (historiesIsLoading) {
    return <UseLoading />;
  }
  /**For Searching */
  const setFiltering = (val) => {
    if (val?.length > 3) {
      setQuery(val);
    }
  };
  return (
    <>
      <DashboardBackground>
        {/* <TableHeadingTitle>
          History {historiesData?.histories?.length}{" "}
   
        </TableHeadingTitle> */}
        {/* SEARCH AND BTN */}
        <SearchAndAddBtn
          setFiltering={setFiltering}
          // btnTitle={"Transfer Product"}
          btnPath={"/dashboard/history/addHistory"}
          btnIcon={<BiSolidDuplicate size={20} />}
        />

        <Histories histories={filterData} />
        <br></br>
        <Paginator links={historiesData?.data?.paginator} />
        <br></br>
      </DashboardBackground>
    </>
  );
};

export default HistoryList;
