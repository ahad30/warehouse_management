
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { BiSolidDuplicate } from "react-icons/bi";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import { useGetHistoryQuery } from "../../features/History/historyApi";
import Paginator from "../../components/Paginator/Paginator";
import { useSelector } from "react-redux";
import HIstoryFilter from "./HIstoryFilter";
import Histories from "./Histories";

const HistoryList = () => {
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");
  const ActivePageNumber = useSelector((state) => state?.pageSlice?.value);
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  
  const { data: historiesData, isLoading: historiesIsLoading } =
    useGetHistoryQuery({
      pageNumber: ActivePageNumber,
      query: query,
      brand_id: brandId ,
      category_id: categoryId ,
      warehouse_id: warehouseId,
      starting_date: startDate ,
      ending_date: endDate,
      
    });

    console.log(historiesData)


  useEffect(() => {
    setFilterData(historiesData?.histories);
  }, [historiesData?.histories, historiesData,historiesData?.data, historiesData?.histories?.length]);

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
          setWarehouseId={setWarehouseId}
        ></HIstoryFilter>

        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-3xl mx-auto my-7">

         {
             historiesData.data?.map(product => (
            <>

            <div className="text-center">
            <p className="text-lg font-bold">Date: {product.date}</p>
            <p className="text-lg font-bold">Incoming Products: {product.incomingProducts}</p>
            <p className="text-lg font-bold">Outgoing Products: {product.shiftProducts ?product.shiftProducts : 'Nothing Yet'}</p>
          
            </div>
            
            </>
          ))
         }

        </div>
        {historiesData?.data?.length == 0 && (
            <p className="text-center text-xl my-12 font-bold text-red-600">
              No Incoming & Outgoing Product found
            </p>
          )
        }


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
        <Paginator links={historiesData?.paginator} />
        <br></br>
      </DashboardBackground>
    </>
  );
};

export default HistoryList;
