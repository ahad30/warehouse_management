import { func } from "prop-types";

const InvoiceDateFiltering = ({
  handleStartDate,
  handleEndDate,
  handleDate,
  refetch,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-1">
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
      <label htmlFor="from">
        <input
          className="input mx-2 input-sm input-bordered"
          type="date"
          onChange={(e) => handleStartDate(e.target.value)}
        />
      </label>
      <label htmlFor="to">
        <input
          className="input  mx-2 input-sm input-bordered"
          type="date"
          onChange={(e) => handleEndDate(e.target.value)}
        />
      </label>
    </div>
  );
};

InvoiceDateFiltering.propTypes = {
  handleStartDate: func,
  handleEndDate: func,
  handleDate: func,
};

export default InvoiceDateFiltering;
