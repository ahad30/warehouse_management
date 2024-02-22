import TableHeadingTitle from "../../components/Reusable/Titles/TableHeadingTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import { BiSolidDuplicate } from "react-icons/bi";
import { useEffect, useState } from "react";
import UseLoading from "../../components/Reusable/useLoading/UseLoading";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import DataTable from "react-data-table-component";
import { useGetHistoryQuery } from "../../features/History/historyApi";

const HistoryList = () => {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [category, setCategory] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const itemsPerPage = 11;

  const {
    data: historiesData,
    isLoading: historiesIsLoading,
  } =  useGetHistoryQuery();



  useEffect(() => {
    setFilterData(historiesData?.data);
  }, [historiesData?.data]);

// console.log(historiesData);
  


  // SEARCH FILTERING STARTS
  // const setFiltering = (search) => {
  //   const filteredData = historiesData?.data?.filter((item) =>
  //     item?.category_name?.toLowerCase().includes(search.toLowerCase())
  //   );
  //   if (filteredData) {
  //     setFilterData(filteredData);
  //   }
  // };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const columns = [
    {
      name: "Serial",
      cell: (row) => {
        // Calculate the serial number based on the current page and items per page
        const serialNumber =
          (currentPage - 1) * itemsPerPage + filterData?.indexOf(row) + 1;
        return <span>{serialNumber}</span>;
      },
    },

    
    {
      name: "Category Name",
      selector: (row) => <>{row?.category_name}</>,
    },
    // {
    //   name: "Warehouse Name",
    //   selector: (row) => <>{row?.warehouse_name}</>,
    // },
    {
      name: "Description",

      selector: (row) => <>{row?.description}</>,
    },

  ];

  // SEARCH FILTERING ENDS

  // ALL CATEGORIES
  if (historiesIsLoading) {
    return <UseLoading />;
  }

  return (
    <>
      <DashboardBackground>
        <TableHeadingTitle>
          History {historiesData?.histories?.length}{" "}
          {/* Change the table title */}
        </TableHeadingTitle>
        {/* SEARCH AND BTN */}
        <SearchAndAddBtn
          btnTitle={"Transfer Product"}
          btnPath={"/dashboard/history/addHistory"}
          btnIcon={<BiSolidDuplicate size={20} />}
          // setFiltering={setFiltering}
        />
        {/* Categories Table */}

        {/* {filterData?.length > 0 && ( */}
          <DataTable
            columns={columns}
            data={filterData}
            pagination
            responsive
            paginationPerPage={itemsPerPage}
            paginationRowsPerPageOptions={[itemsPerPage, 5, 10, 15]}
            paginationTotalRows={filterData?.length}
            onChangePage={(page) => setCurrentPage(page)}
            keyField="id"
          />
        {/* )} */}

      
      </DashboardBackground>
    </>
  );
};

export default HistoryList;

