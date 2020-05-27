import React, { useContext } from "react";
import WarehouseContext from "../../contexts/warehouse/WarehouseContext";
import useFetch from "../hooks/useFetch";
import Spinner from "../utilities/Spinner";
import Pagination from "../utilities/Pagination";
// import SearchFilterForm from "../utilities/SearchFilterForm";
import UpdateWarehouse from '../modals/update/UpdateWarehouse';

export default function WarehouseList() {
  const warehouseContext = useContext(WarehouseContext);
  const { warehouses, getWarehouse, searchWarehouse, isLoading } = warehouseContext;

  const { postList, pagination, onPageChange, onSearchChange } = useFetch(
    warehouses,
    getWarehouse,
    searchWarehouse,
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
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
            {postList &&
            postList.map((result) => { 
              return(
              <tr key={result.id}>
                <td>{result.name}</td>
                <td>{result.address}</td>
                <td>{result.phone}</td>
                <td>
                  <UpdateWarehouse warehouse={result}/>
                </td>
              </tr>
              )})}
            </tbody>
          </table>
        </div>
      )}
      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
}
