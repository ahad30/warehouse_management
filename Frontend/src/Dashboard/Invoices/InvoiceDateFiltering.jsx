import { func } from "prop-types";
import { useState } from "react";
import { GrPowerReset } from "react-icons/gr";

const InvoiceDateFiltering = ({
  handleStartDate,
  handleEndDate,
  handleDate,
  handleDateClear,
}) => {

  const [activeButton, setActiveButton] =useState(null)
  return (
    <div className="flex flex-col my-5 w-full lg:justify-between xl:flex-row gap-x-1">
      
      {/* week and today and month filtering */}
      <div className="grid border border-blue-700   rounded-lg p-2  grid-cols-3 gap-2">
        <button
          onClick={() => {handleDate(1);setActiveButton(1)}}
          className={`px-2 py-1 ${activeButton == 1 ? 'border border-blue-700 rounded-lg' : ""} text-[#334155] rounded-md text-sm`}
        >
          Today
        </button>
        <button
          onClick={() => {handleDate(7);setActiveButton(7)}}
          className={`px-2 py-1 ${activeButton == 7 ? 'border border-blue-700  rounded-lg' : ""} text-[#334155] rounded-md text-sm`}
        >
          Last 7 Days
        </button>
        <button
          onClick={() => {handleDate(31); setActiveButton(31)}}
          className={`px-2 py-1 ${activeButton == 31 ? 'border border-blue-700  rounded-lg' : ""} text-[#334155] rounded-md text-sm`}
        >
          This Month
        </button>
      </div>
      
      {/* date filtering */}
      <div className="grid  grid-cols-3 gap-2 mt-2 xl:mt-0">
        <label className="" htmlFor="from">
          <input
            className="input input-sm input-bordered w-full"
            type="date"
            onChange={(e) => handleStartDate(e.target.value)}
          />
        </label>
        <label htmlFor="to">
          <input
            className="input input-sm input-bordered w-full"
            type="date"
            onChange={(e) => handleEndDate(e.target.value)}
          />
        </label>
        <button
          onClick={() => handleDateClear(31)}
          className="flex justify-center items-center px-2 py-1 text-red-600 bg-white rounded-md text-sm border border-red-600 font-bold"
        >
          
            {/* <GrPowerReset size={20} /> */}
            Reset all
          
        </button>
      </div>
    </div>
  );
};

InvoiceDateFiltering.propTypes = {
  handleStartDate: func,
  handleEndDate: func,
  handleDate: func,
  handleDateClear: func,
};

export default InvoiceDateFiltering;
