
import { BiSolidDuplicate } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardBackground from "../../../layouts/Dashboard/DashboardBackground";
import UseLoading from "../../../components/Reusable/useLoading/UseLoading";
import SearchAndAddBtn from "../../../components/Reusable/Inputs/SearchAndAddBtn";
import HIstoryFilter from "../../History/HIstoryFilter";
import Paginator from "../../../components/Paginator/Paginator";
import SoldReportTable from "../../SearchProducts/SoldReportTable";
import { useGetSoldReportQuery } from "../../../features/SoldReport/SoldReportApi";

const SoldReport = () => {
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const ActivePageNumber = useSelector((state) => state?.pageSlice?.value);
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [productCode, setProductCode] = useState("");

  const { data: soldData, isLoading: historiesIsLoading, isError, error } =
    useGetSoldReportQuery({
      pageNumber: ActivePageNumber,
      brand_id: brandId ? brandId : "",
      category_id: categoryId ? categoryId : "",
      starting_date: startDate ? startDate : "",
      ending_date: endDate ? endDate : "",
      warehouse_id: warehouseId ? warehouseId : "",
      product_code : productCode ? productCode : ""
    });

    console.log(historiesIsLoading, soldData, isError, error);
    
  useEffect(() => {
    setFilterData(soldData?.data?.histories);
    console.log(soldData?.data?.histories);

  }, [soldData?.data, soldData, soldData?.data?.length]);

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
          History {soldData?.histories?.length}{" "}
        </TableHeadingTitle> */}

        <HIstoryFilter
          setBrandId={setBrandId}
          setCategoryId={setCategoryId}
          setWarehouseId={setWarehouseId}
          setProductCode ={setProductCode}
        ></HIstoryFilter>
        <div className="flex justify-between my-7">
          <p className="text-xl font-medium">Incoming Product</p>
          <p className="text-xl font-medium">Outgoing Product</p>
        </div>
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

        <SoldReportTable histories={filterData} />
        <br></br>
        <Paginator links={soldData?.data?.paginator} />
        <br></br>
      </DashboardBackground>
    </>
  );
};

export default SoldReport;
