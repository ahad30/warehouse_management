import { func } from "prop-types";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";

const Search = ({ setSingleScanCode }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const search = form.search.value;
    if (search) {
      setSingleScanCode(search);
    } else {
      setSingleScanCode("");
    }
  };

  return (
    <div className="relative flex">
      <div className="w-full">
        <label htmlFor="Search" className="sr-only">
          Search
        </label>
        <form className="" onSubmit={handleSubmit} action="">
          <input
            type="text"
            id="Search"
            name="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search for Scan code..."
            className="w-full rounded-lg py-4 border-gray-200 pe-10 shadow-sm sm:text-sm"
          />
        </form>

        <div className="absolute right-2 top-0 bottom-0 flex justify-center items-center gap-x-3">
          <RxCross2
            className={`cursor-pointer duration-700 ${text ? "" : "w-0"}`}
            onClick={() => {
              setText("");
              setSingleScanCode("");
            }}
            size={25}
          ></RxCross2>
          <CiSearch
            className="hover cursor-pointer hover:text-red-500"
            onClick={() => setSingleScanCode(text)}
            size={40}
          ></CiSearch>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Search;
Search.propTypes = {
  setSingleScanCode: func,
};
