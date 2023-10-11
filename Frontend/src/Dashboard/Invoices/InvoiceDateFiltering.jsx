import { func } from "prop-types";

const InvoiceDateFiltering = ({ setStartDate, setEndDate, refetch }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-1">
      <button className="px-2 py-1 bg-gray-600 text-white rounded-md">
        Today
      </button>
      <button className="px-2 py-1 bg-gray-600 text-white rounded-md">
        Last 7 Days
      </button>
      <button className="px-2 py-1 bg-gray-600 text-white rounded-md">
        This Month
      </button>
      <label htmlFor="from">
        <input
          className="input mx-2 input-sm input-bordered"
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label htmlFor="to">
        <input
          className="input  mx-2 input-sm input-bordered"
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      {/* <button
        onClick={() => refetch()}
        className="bg-[#0369A1] text-white rounded-md px-3 py-1"
      >
        Go
      </button> */}
    </div>
  );
};

InvoiceDateFiltering.propTypes = {
  setStartDate: func,
  setEndDate: func,
  refetch: func,
};

export default InvoiceDateFiltering;
