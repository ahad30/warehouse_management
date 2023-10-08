import { useEffect, useState } from "react";
import { useGetDashboardSummaryQuery } from "../../../../features/Dashboard/dashboardSummary";
import { AiOutlineSetting,AiOutlineDollarCircle } from "react-icons/ai";
import { BiCategory, BiGrid, BiLogOut, BiUserCircle } from "react-icons/bi";
import { FaFileInvoiceDollar, FaStore } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BsFillCartFill } from "react-icons/bs";
import { VscGraph} from "react-icons/vsc";
import { SiBrandfolder } from "react-icons/si";

const TotalCalculations = () => {
  const { data } = useGetDashboardSummaryQuery();


  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalSales: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    if (data?.status) setSummary(data?.data);
  }, [data?.status, data?.data]);

 if(data?.data) console.log(data?.data)

  const items = [
    {
      img: <AiOutlineDollarCircle className="text-white" size={30}></AiOutlineDollarCircle>,
      count: `$${summary?.totalRevenue}`,
      text: "Total Revenue",
      
      
    },

    {
      img: <VscGraph className="text-white" size={30}></VscGraph>,
      count: summary?.totalSales,
      text: "Total Sales",
      
    },
    
    {
      img: <BiUserCircle className="text-white" size={30}></BiUserCircle>,
      count: summary?.totalUsers,
      text: "Total Users",
      
    },
    {
      img: <FiUsers className="text-white" size={30}></FiUsers>,
      count: summary?.totalCustomers,
      text: "Total Customers",
     
    },
    {
      img: <BsFillCartFill className="text-white" size={30}></BsFillCartFill>,
      count: summary?.totalProducts,
      text: "Total Products",
      
    },
    {
      img: <BiCategory className="text-white" size={30}></BiCategory>,
      count: summary?.totalCategory,
      text: "Total Category",
      
    },
    {
      img: <SiBrandfolder className="text-white" size={30}></SiBrandfolder>,
      count: summary?.totalBrand,
      text: "Total Brand",
     
    },
    {
      img: <FaStore className="text-white" size={30}></FaStore>,
      count: summary?.totalStore,
      text: "Total Store",
      
    },
   
   

   
  ];

  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10 my-2 p-2">
      {items?.map((item, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row gap-y-5 justify-between items-center py-5 md:py-7 px-3 md:px-5 rounded-xl bg-[#f0f9ff] border border-[#BAE6FD]"
        >
          <div className="h-[60px] p-5 bg-[#0369A1] rounded-lg flex justify-center items-center w-[60px]">
            {/* <img className="w-12 h-12" src={item?.img} alt="" /> */}
            {item?.img}
          </div>
          <div className="flex flex-col justify-center items-center text-center gap-y-2">
            <span className="font-bold text-3xl">{item?.count}</span>
            <span>{item?.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalCalculations;
