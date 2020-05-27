import React, { useContext, useEffect } from "react";
import OrderContext from "../../contexts/order/OrderContext";
import useFetch from "../hooks/useFetch";
import Spinner from "../utilities/Spinner";
import Pagination from "../utilities/Pagination";
import SearchFilterForm from "../utilities/SearchFilterForm";

export default function OrderList() {
  const orderContext = useContext(OrderContext);
  const { orders, getOrder, searchOrder, isLoading } = orderContext;

  const { postList, pagination, onPageChange, onSearchChange } = useFetch(
    orders,
    getOrder,
    searchOrder,
    isLoading
  );

  return (
    <div className="container-fluid">
      {/* <SearchFilterForm onSearchChange={onSearchChange} /> */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="row">
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">employeeId</th>
                <th scope="col">totalPrice</th>
                <th scope="col">time</th>
              </tr>
            </thead>
            <tbody>
              {postList &&
                postList.map((result) => (
                  <tr key={result.id}>
                    <td>{result.id}</td>
                    <td>{result.employeeId}</td>
                    <td>{result.totalPrice}</td>
                    <td>{result.time}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
}
