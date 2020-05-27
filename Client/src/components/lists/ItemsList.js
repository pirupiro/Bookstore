import React, { useContext } from "react";
import ItemContext from "../../contexts/item/ItemContext";
import useFetch from "../hooks/useFetch";
import Card from "./Card";
import Spinner from "../utilities/Spinner";
import Pagination from "../utilities/Pagination";
import SearchFilterForm from "../utilities/SearchFilterForm";

export default function Items() {
  const itemContext = useContext(ItemContext);
  const { items, getItem, searchItem, isLoading } = itemContext;

  const { postList, pagination, onPageChange, onSearchChange } = useFetch(
    items,
    getItem,
    searchItem,
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
              return <Card item={result} listType="Item" key={result.id} />;
            })}
        </div>
      )}
      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
}
