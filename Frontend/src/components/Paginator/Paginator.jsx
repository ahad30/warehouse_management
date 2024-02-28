import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiCloudLightRain } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetCurrentPage from "../../Hooks/useGetCurrentPage";
import { clear, incrementByAmount } from "../../features/Page/pageSlice";

const Paginator = ({ links }) => {
  const ActivePageNumber = useSelector((state) => state?.pageSlice?.value);
  const dispatch = useDispatch();
  const [current_page, setCurrentPage] = useState(1);
  const pageNumber = useGetCurrentPage();

  useEffect(() => {
    if (pageNumber) {
      if (pageNumber > 1) {
        dispatch(incrementByAmount(ActivePageNumber));
      }
      setCurrentPage(parseInt(pageNumber));
    } else {
      dispatch(clear());
    }
  }, [pageNumber, ActivePageNumber, dispatch, current_page]);

  const pageChangeHandler = (label) => {
    if (label == "&laquo; Previous") {
      if (ActivePageNumber != 1) {
        dispatch(incrementByAmount(ActivePageNumber - 1));
        setCurrentPage(ActivePageNumber - 1);
      }
    } else if (label == "Next &raquo;") {
      if (links?.length - 2 > ActivePageNumber) {
        dispatch(incrementByAmount(ActivePageNumber + 1));
        setCurrentPage(ActivePageNumber + 1);
      }
    } else {
      dispatch(incrementByAmount(label));
      setCurrentPage(label);
    }
  };
  return (
    <nav className="float-right mb-3">
      <ul className="inline-flex -space-x-px text-sm">
        {links?.map((item, index) => {
          return (
            <span key={index}>
              {item?.label == current_page ? (
                <li>
                  <Link
                    to={`?page=${item?.label}`}
                    className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 "
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.label }}
                    ></div>
                  </Link>
                </li>
              ) : item?.label == "Next &raquo;" ? (
                <li onClick={() => pageChangeHandler(item?.label)}>
                  <Link
                    to={`?page=${
                      ActivePageNumber < links?.length - 2
                        ? ActivePageNumber + 1
                        : ActivePageNumber
                    }`}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.label }}
                    ></div>
                  </Link>
                </li>
              ) : item?.label == "&laquo; Previous" ? (
                <li onClick={() => pageChangeHandler(item?.label)}>
                  <Link
                    to={`?page=${
                      ActivePageNumber > 1
                        ? ActivePageNumber - 1
                        : ActivePageNumber
                    }`}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.label }}
                    ></div>
                  </Link>
                </li>
              ) : (
                <li onClick={() => pageChangeHandler(item?.label)}>
                  <Link
                    to={`?page=${item?.label}`}
                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.label }}
                    ></div>
                  </Link>
                </li>
              )}
            </span>
          );
        })}
      </ul>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </nav>
  );
};

Paginator.propTypes = {};

export default Paginator;
