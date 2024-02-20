
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BiCloudLightRain } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clear, incrementByAmount}  from "../../features/Page/pageSlice"

const Paginator = ({ links }) => {

  const ActivePageNumber = useSelector((state) => state?.pageSlice?.value)
  const dispatch = useDispatch()



  const [current_page, setCurrentPage] = useState(1);
    // Get the query string from the current URL
    const queryString = window.location.search;
    // Create a URLSearchParams object by passing the query string
    const urlParams = new URLSearchParams(queryString);
    // Use the get method to retrieve the value of a specific parameter
    const pageNumber = urlParams.get('page');

    useEffect(()=>{
      setCurrentPage(pageNumber)
      if(pageNumber > 1){
        dispatch(incrementByAmount(ActivePageNumber))
        // console.log(ActivePageNumber)
      }
    },[pageNumber,ActivePageNumber,dispatch])
    
    const pageChangeHandler = (label) => {
      
    
      if(label== '&laquo; Previous'){
          if(ActivePageNumber!=1){
          dispatch(incrementByAmount(ActivePageNumber-1))
          setCurrentPage(ActivePageNumber-1)
        }
      }else if(label == 'Next &raquo;'){
        console.log(links?.length-2)
        if(links?.length-2>ActivePageNumber){
          dispatch(incrementByAmount(ActivePageNumber+1))
          setCurrentPage(ActivePageNumber+1)
        }
      }
      else{
        dispatch(incrementByAmount(label))
        setCurrentPage(label)
      }
    }
  return (
    <nav className="float-right mb-3">
      <ul className="inline-flex -space-x-px text-sm">
  
        {links?.map((item, index) => (
          <span key={index}>
            {item?.label == current_page  ? (
              <li>
                <Link
                  to={`?page=${item?.label}`}
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                 >
              <div  dangerouslySetInnerHTML={{ __html: item?.label }}></div>
                </Link>
              </li>
            ) : (
              <li onClick={()=> pageChangeHandler(item?.label)}>
                <Link
                  to={`?page=${item?.label}`}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                 <div  dangerouslySetInnerHTML={{ __html: item?.label }}></div>
                </Link>
              </li>
            )}
          </span>
        ))}
      </ul>
    </nav>
  );
};

Paginator.propTypes = {};

export default Paginator;
