import { func } from "prop-types";
import { useEffect, useState } from "react";

const InvoiceDateFiltering = ({
  handleStartDate,
  handleEndDate,
  handleDate,
  handleDateClear,
  endDate,
  startDate,
}) => {
  // State to track the active button
  const [activeButton, setActiveButton] = useState(null);
  useEffect(() => {
    if (startDate || endDate) {
      setActiveButton(null);
    }
  }, [startDate, endDate]);
  return (
    <div className="flex items-center flex-col my-5 w-full lg:justify-between xl:flex-row gap-x-1">
      {/* Week, today, and month filtering */}
      <div className="grid border border-blue-700 rounded-lg p-1 grid-cols-3 gap-2">
        <button
          onClick={() => {
            handleDate(1); // Trigger date filtering for today
            setActiveButton(1); // Set "Today" button as active
          }}
          className={`px-2 border py-1 ${
            activeButton === 1
              ? " border-blue-700 rounded-lg"
              : "border-transparent"
          } text-[#334155] rounded-md text-sm`}
        >
          Today
        </button>
        <button
          onClick={() => {
            handleDate(7); // Trigger date filtering for the last 7 days
            setActiveButton(7); // Set "Last 7 Days" button as active
          }}
          className={`px-2 border  py-1 ${
            activeButton === 7
              ? " border-blue-700 rounded-lg"
              : "border-transparent"
          } text-[#334155] rounded-md text-sm`}
        >
          Last 7 Days
        </button>
        <button
          onClick={() => {
            handleDate(31); // Trigger date filtering for this month
            setActiveButton(31); // Set "This Month" button as active
          }}
          className={`px-2  border  py-1 ${
            activeButton === 31
              ? " border-blue-700 rounded-lg"
              : "border-transparent"
          } text-[#334155] rounded-md text-sm`}
        >
          This Month
        </button>
      </div>

      {/* Date filtering */}
      <div className="grid grid-cols-3 gap-2 mt-2 xl:mt-0">
        <label htmlFor="from">
          <input
            className="input input-sm input-bordered w-full"
            type="date"
            value={startDate}
            onChange={(e) => {
              handleStartDate(e.target.value);
            }} // Call handleStartDate when the "From" date changes
          />
        </label>
        <label htmlFor="to">
          <input
            className="input input-sm input-bordered w-full"
            type="date"
            value={endDate}
            onChange={(e) => {
              handleEndDate(e.target.value);
            }} // Call handleEndDate when the "To" date changes
          />
        </label>
        <button
          onClick={() => {
            handleDateClear(31); // Clear date filtering and set it to default (This Month)
            setActiveButton(null); // Clear the active button
          }}
          className="flex btn-sm justify-center items-center  text-red-600 bg-white rounded-md text-sm border border-red-600 font-bold"
        >
          Reset all
        </button>
      </div>
    </div>
  );
};

// Prop type validation for the InvoiceDateFiltering component
InvoiceDateFiltering.propTypes = {
  handleStartDate: func, // PropTypes validation for handleStartDate function
  handleEndDate: func, // PropTypes validation for handleEndDate function
  handleDate: func, // PropTypes validation for handleDate function
  handleDateClear: func, // PropTypes validation for handleDateClear function
};

export default InvoiceDateFiltering;
