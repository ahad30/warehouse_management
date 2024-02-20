const useGetCurrentPage = () => {
   // Get the query string from the current URL
   const queryString = window.location.search;
  // Create a URLSearchParams object by passing the query string
  const urlParams = new URLSearchParams(queryString);
  // Use the get method to retrieve the value of a specific parameter
  const pageNumber = urlParams.get("page");

  return pageNumber ? pageNumber : 1;
}

export default useGetCurrentPage