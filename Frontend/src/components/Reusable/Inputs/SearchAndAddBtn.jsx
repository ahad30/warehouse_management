import { func, node, string } from "prop-types";
import { Link } from "react-router-dom";

const SearchAndAddBtn = ({ setFiltering, btnTitle, btnIcon, btnPath }) => {
  return (
    <>
      <div className="flex justify-between my-5 w-full gap-x-2 border bg-[#F3F4F6] border-gray-300 rounded-lg p-3">
        <input
          type="text"
          className="input input-bordered rounded-full mb-3 lg:mb-0 w-full sm:w-1/2 md:w-1/3"
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search by name"
        />

        <Link
          to={btnPath}
          className="btn bg-gray-600 text-white hover:bg-gray-600 hover:text-white"
        >
          <span className="flex items-center gap-x-2">
            <span>{btnIcon}</span>
            <span className="hidden sm:block">
              {btnTitle ? btnTitle : "Add New"}
            </span>
          </span>
        </Link>
      </div>
    </>
  );
};

SearchAndAddBtn.propTypes = {
  setFiltering: func,
  btnTitle: string,
  btnPath: string,
  btnIcon: node,
};

export default SearchAndAddBtn;
