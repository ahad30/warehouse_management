import DataTable from "react-data-table-component";

import { FaStore } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useGetBrandsQuery } from "../../features/Brand/brandApi";
import SearchAndAddBtn from "../../components/Reusable/Inputs/SearchAndAddBtn";
import { BiSolidDuplicate } from "react-icons/bi";

// Sample data

function TestTable() {
  const {
    data: brandsData,
    isLoading: brandsIsLoading,
    isError: brandsIsError,
    error: brandsError,
    isSuccess: brandsIsSuccess,
  } = useGetBrandsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData ,setFilterData]=useState([])
  const itemsPerPage = 3; // Number of items per page
    // console.log(brandsData?.brands)

    useEffect(()=> {
        setFilterData(brandsData?.brands)
    },[brandsData?.brands,brandsData])




  const columns = [
    {
      name: "Serial",
      cell: (row) => {
        // Calculate the serial number based on the current page and items per page
        const serialNumber = (currentPage - 1) * itemsPerPage + filterData.indexOf(row) + 1;
        return <span>{serialNumber}</span>;
      },
    },
    {
      name: "ID",
      selector: "id",
    },
    {
      name: "Name",
      selector: "brand_name",
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.brand_img ? `${import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT}/uploads/brands/${row?.brand_img}` : "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg"}
          alt="User"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button onClick={() => handleEdit(row?.id)}>
            <FaStore></FaStore>
          </button>
          <button onClick={() => handleDelete(row?.id)}>
            <FaStore></FaStore>
          </button>
        </div>
      ),
    },
  ];




  const setFiltering = (search) => {
    const filteredData = brandsData?.brands?.filter((item) =>
      item?.brand_name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilterData(filteredData)
  };



  const handleDelete = (id) => {
    console.log(id);
    // Implement your delete logic here
    // console.log(Delete user with ID: ${id});
  };

  const handleEdit = (id) => {
    console.log(id);
    // Implement your edit logic here
    // console.log(`Edit user with ID` ${id}`);
  };

//   const filteredData = brandsData?.brands?.filter((item) => item?.brand_name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

return (
  <div>
    <input
      type="text"
      placeholder="Search by Name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <SearchAndAddBtn
      btnTitle={"Add brand"}
      btnPath={"/dashboard/brand/add"}
      btnIcon={<BiSolidDuplicate size={20} />}
      setFiltering={setFiltering}
    />

    {filterData?.length > 0 && (
      <DataTable
        columns={columns}
        data={filterData}
        pagination
        paginationPerPage={itemsPerPage}
        paginationRowsPerPageOptions={[itemsPerPage, 5, 10, 15]}
        paginationTotalRows={filterData?.length}
        onChangePage={(page) => setCurrentPage(page)}
      />
    )}
  </div>
);
}

export default TestTable;
