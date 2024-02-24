import React, { useState } from "react";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import Histories from "./Histories";
import { useGetSingleProductQuery } from "../../features/FindProducts/findProductsSlice";

const SearchProducts = () => {
  UseTitle("Find Product");
  const [scanCode, setScanCode] = useState(null);

  const { data, isLoading, isError } = useGetSingleProductQuery({ scanCode });
  const SearchProductHandler = (e) => {
    e.preventDefault();
    setScanCode(e.target.scanCode.value);
  };

  return (
    <DashboardBackground>
      <div className="mt-10">
        <p className="text-center font-semibold text-lg mb-3 ">
          Product Search
        </p>
        <form
          className="flex items-center max-w-sm mx-auto"
          onSubmit={SearchProductHandler}
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  "
              name="scanCode"
              placeholder="Search Product code..."
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ms-2 text-sm font-medium text-white bg-[#e74c3c] rounded-lg border border-[#e74c3c]"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>

        <div className="  mt-10">
          <div>
            <div className="mx-auto">
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-auto">
                <a href="#">
                  <img
                    className="p-8 rounded-t-lg"
                    src="https://images.unsplash.com/photo-1517329782449-810562a4ec2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                      Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
                    </h5>
                  </a>
                  <br></br>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 ">
                      $599
                    </span>
                    <span>
                      <ul className="text-right text-gray-500">
                        <li>Category: Category</li>
                        <li>Brand: Category</li>
                      </ul>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <h2 className="text-xl p-3 font-semibold uppercase border-b-2 mb-2">
              Siftings
            </h2>
            <Histories />
            <br />
            <br />
          </div>
        </div>
      </div>
    </DashboardBackground>
  );
};

export default SearchProducts;
