import React, { useState } from "react";
import UseTitle from "../../components/Reusable/UseTitle/UseTitle";
import DashboardBackground from "../../layouts/Dashboard/DashboardBackground";
import Histories from "./Histories";

import toast from "react-hot-toast";
import axios from "axios";

const SearchProducts = () => {
  UseTitle("Find Product");
  const [product, setProduct] = useState(null);

  /**Finding product using axios request */
  const SearchProductHandler = (e) => {
    e.preventDefault();
    axios
      .get(
        `${import.meta.env.VITE_REACT_APP_PORT}/product/search?scan_code=${
          e.target.scanCode.value
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("access_token")
              .replace('"', "")
              .replace('"', "")}`,
          },
        }
      )
      .then((response) => response)
      .then((responseData) => {
        if (responseData?.data?.data) {
          /** Initializing product data */
          setProduct(responseData?.data?.data);
          console.log(product);
        } else {
          /** Showing error message when product is not available */
          toast.error(responseData?.data?.message);
          setProduct(null);
        }
      });
  };

  return (
    <DashboardBackground>
      <div className="mt-10">
        {/* header part start */}
       <div>
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
              required
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
       </div>
        {/* header part end */}
        {product ? (
          <div className="  mt-10">
            <div>
              <div className="mx-auto">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-auto">
                  <a href="#">
                    <img
                      className="p-4 rounded-t-lg ratio-square w-full max-h-[280px]"
                      src={
                        product?.product_images?.length > 0
                          ? `${
                              import.meta.env.VITE_REACT_APP_PUBLIC_IMAGE_PORT
                            }${product?.product_images[0]?.image}`
                          : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                      }
                    />
                  </a>
                  <div className="px-5 pb-5">
                    <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                        {product?.product_name}
                      </h5>
                    </a>
                    <br></br>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 ">
                        ${product?.product_sale_price}
                      </span>
                      <span>
                        <ul className="text-right text-gray-500">
                          <li>
                            Category: {product?.get_category?.category_name}
                          </li>
                          <li>Brand: {product?.get_brand?.brand_name}</li>
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
              <Histories
                histories={product?.histories}
                extraData={{
                  product_name: product?.product_name,
                  scan_code: product?.scan_code,
                }}
              />
              <br />
              <br />
            </div>
          </div>
        ) : (
          <p className="mt-5 text-center">Nothing to show</p>
        )}
      </div>
    </DashboardBackground>

  

  );
};

export default SearchProducts;
