import { func } from "prop-types";
import { GrPowerReset } from "react-icons/gr";

const InvoiceDateFiltering = ({
  handleStartDate,
  handleEndDate,
  handleDate,
  handleDateClear,
}) => {
  return (
    <div className="flex flex-col xl:flex-row gap-x-1">
      <div className="grid grid-cols-3 gap-1">
        <button
          onClick={() => handleDate(1)}
          className="px-2 py-1 bg-gray-600 text-white rounded-md text-sm"
        >
          Today
        </button>
        <button
          onClick={() => handleDate(7)}
          className="px-2 py-1 bg-gray-600 text-white rounded-md text-sm"
        >
          Last 7 Days
        </button>
        <button
          onClick={() => handleDate(31)}
          className="px-2 py-1 bg-gray-600 text-white rounded-md text-sm"
        >
          This Month
        </button>
      </div>
      <div className="grid grid-cols-[45%_45%_10%] gap-1 mt-2 xl:mt-0">
        <label htmlFor="from">
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
          
            <GrPowerReset size={20} />
          
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
