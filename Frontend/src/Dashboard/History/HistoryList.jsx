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
import HIstoryFilter from "./HIstoryFilter";

const HistoryList = () => {
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const ActivePageNumber = useSelector((state) => state?.pageSlice?.value);
  const [categoyrId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fromWarehouse, setFromWarehouse] = useState("");
  const [toWarehouse, setToWarehouse] = useState("");
  const { data: historiesData, isLoading: historiesIsLoading } =
    useGetHistoryQuery({
      pageNumber: ActivePageNumber,
      query: query,
      brand_id: brandId ? brandId : "",
      category_id: categoyrId ? categoyrId : "",
      to_warehouse: toWarehouse ? toWarehouse : "",
      starting_date: startDate ? startDate : "",
      ending_date: endDate ? endDate : "",
      from_warehouse: fromWarehouse ? fromWarehouse : "",
    });
  useEffect(() => {
    setFilterData(historiesData?.data?.histories);
  }, [historiesData?.data, historiesData, historiesData?.data?.length]);

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

  const handleResetAll = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <>
      <DashboardBackground>
        {/* <TableHeadingTitle>
          History {historiesData?.histories?.length}{" "}
        </TableHeadingTitle> */}

        <HIstoryFilter
          setBrandId={setBrandId}
          setCategoryId={setCategoryId}
          setToWarehouse={setToWarehouse}
          setFromWarehouse={setFromWarehouse}
        ></HIstoryFilter>
        {/* SEARCH AND BTN */}
        <SearchAndAddBtn
          setFiltering={setFiltering}
          btnPath={"/dashboard/history/addHistory"}
          btnIcon={<BiSolidDuplicate size={20} />}
          conditionalKey={"history"}
          setEndDate={setEndDate}
          endDate={endDate}
          setStartDate={setStartDate}
          startDate={startDate}
          handleResetAll={handleResetAll}
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
