import React, { useContext, useEffect } from "react";
import ExportationContext from "../../contexts/export/ExportationContext";
import useFetch from "../hooks/useFetch";
import Spinner from "../utilities/Spinner";
import Pagination from "../utilities/Pagination";
import SearchFilterForm from "../utilities/SearchFilterForm";

export default function ExportationList() {
  const exportationContext = useContext(ExportationContext);
  const { exportations, getExportation, searchExportation, isLoading } = exportationContext;

  const { postList, pagination, onPageChange, onSearchChange } = useFetch(
    exportations,
    getExportation,
    searchExportation,
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
