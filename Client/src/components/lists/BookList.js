import React, { useContext } from "react";
import BookContext from "../../contexts/book/BookContext";
import useFetch from "../hooks/useFetch";
import Card from "./Card";
import Spinner from "../utilities/Spinner";
import Pagination from "../utilities/Pagination";
import SearchFilterForm from "../utilities/SearchFilterForm";

export default function Books() {
  const bookContext = useContext(BookContext);
  const { books, getBook, searchBook, isLoading } = bookContext;

  const { postList, pagination, onPageChange, onSearchChange } = useFetch(
    books,
    getBook,
    searchBook,
    isLoading
  );

  return (
    <div className="container-fluid">
      <SearchFilterForm onSearchChange={onSearchChange} />
      {isLoading ? (
        <Spinner/>
      ) : (
        <div className="row">
          {postList &&
            postList.map((result) => {
              return <Card item={result} listType="Book" key={result.id} />;
            })}
        </div>
      )}
      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
}
