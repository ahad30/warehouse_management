import { func, node, string } from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchAndAddBtn = ({
  setFiltering,
  btnTitle,
  btnIcon,
  btnPath,
  conditionalKey,
  setEndDate,
  endDate,
  setStartDate,
  startDate,
  handleResetAll,
}) => {
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (startDate && !endDate) {
      setError({
        name: "End",
        message: "Please select To date",
      });
    } else if (endDate && !startDate) {
      setError({
        name: "From",
        message: "Please select From date",
      });
    }
    else {
      setError("")
    }
  }, [startDate, endDate]);
  
  return (
    <>
      <div className="flex justify-between items-center my-5 w-full gap-x-2 border bg-[#F3F4F6] border-gray-300 rounded-lg p-3">
        <input
          type="text"
          className="input input-bordered rounded-lg mb-3 lg:mb-0 w-full sm:w-1/2 md:w-1/3"
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search"
        />
        {user?.get_role?.role === "Sub Admin" &&
        (btnTitle === "Add brand" ||
          btnTitle === "Add Category" ||
          btnTitle === "Add Warehouse")
          ? ""
          : btnTitle && (
              <Link
                to={btnPath}
                className="bg-red-500 grid place-content-center text-white focus:ring-1 px-3 rounded-md"
              >
                <span className="flex items-center gap-x-2">
                  <span>{btnIcon}</span>
                  <span className="hidden sm:block">
                    {btnTitle ? btnTitle : "Add New"}
                  </span>
                </span>
              </Link>
            )}

        {/* Date filtering */}
        {conditionalKey === "history" && (
          <div className="grid grid-cols-3 gap-2 mt-2 xl:mt-0">
            <label htmlFor="from">
              <input
                className="input input-sm input-bordered w-full"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {error?.name === "From" && (
                <p className="text-red-500 my-1">{error?.message || ""}</p>
              )}
            </label>
            <label htmlFor="to">
              <input
                className="input input-sm input-bordered w-full"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {error?.name === "End" && (
                <p className="text-red-500 my-1">{error?.message || ""}</p>
              )}
            </label>
            <button
              onClick={() => handleResetAll()}
              className="flex btn-sm justify-center items-center  text-red-600 bg-white rounded-md text-sm border border-red-600 font-bold"
            >
              Reset all
            </button>
          </div>
        )}
      </div>
    </>
  );
};

SearchAndAddBtn.propTypes = {
  setFiltering: func,
  btnTitle: string,
  btnPath: string,
  btnIcon: node,
  conditionalKey: string,
  setEndDate: func,
  endDate: string,
  setStartDate: func,
  startDate: string,
  handleResetAll: func,
};

export default SearchAndAddBtn;
