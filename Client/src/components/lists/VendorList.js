import React, { useContext, useEffect } from "react";
import VendorContext from "../../contexts/vendor/VendorContext";
import useFetch from "../hooks/useFetch";
import Spinner from "../utilities/Spinner";
import Pagination from "../utilities/Pagination";
// import SearchFilterForm from "../utilities/SearchFilterForm";
import UpdateVendor from "../modals/update/UpdateVendor";
export default function VendorList() {
  const vendorContext = useContext(VendorContext);
  const { vendors, getVendor, searchVendor, isLoading } = vendorContext;

  const { postList, pagination, onPageChange, onSearchChange } = useFetch(
    vendors,
    getVendor,
    searchVendor,
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
                postList.map((result) => (
                  <tr key={result.id}>
                    <td>{result.name}</td>
                    <td>{result.address}</td>
                    <td>{result.phone}</td>
                    <td>
                      <UpdateVendor vendor={result} />
                    </td>
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
