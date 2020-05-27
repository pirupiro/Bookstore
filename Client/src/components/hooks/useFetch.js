import { useState } from "react";
import useAbortableEffect from "./useAbortableEffect";

const useFetch = (payload, getData, searchData, isLoading) => {
  const [postList, setPostList] = useState([]);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 24,
    pageCount: "",
  });
  const [filter, setFilter] = useState({
    currentPage: 1,
    pageSize: 24,
    pageCount: "",
    name: "",
  });

  useAbortableEffect(
    (status) => {
      const fetchData = async (callback) => {
        isLoading = true;
        try {
          await callback(filter, status)
            .then(() => {
              // console.log("work thus far")
              if (!status.aborted) {
                const { currentPage, pageSize, pageCount, results } = payload;
                payload.hasOwnProperty( 'results' )
                  ? setPostList(results)
                  : setPostList(payload);

                setPagination({
                  ...pagination,
                  currentPage,
                  pageSize,
                  pageCount,
                });
              }
              
              // console.log("work thus far again")
            })
            .catch((err) => {
              console.error(err);
              console.error("promises then error");
              setError(err);
            });
        } catch (err) {
          console.error(err);
          console.error("fetchData");
          setError(err);
        }
      };
      //if search form empty this will load item
      !filter.name ? fetchData(getData) : fetchData(searchData);
      isLoading = false;
    },
    [payload, filter, pagination]
  );

  // ! Function for all component includes
  const onPageChange = (currentPage) => {
    setFilter({
      ...filter,
      currentPage,
    });
  };

  const onSearchChange = (newFilter) => {
    console.log("new search: " + newFilter);
    setFilter({
      ...filter,
      currentPage: 1,
      name: newFilter.searchTerm,
    });
  };

  return {
    postList,
    pagination,
    error,
    isLoading,
    onPageChange,
    onSearchChange,
  };
};

export default useFetch;
