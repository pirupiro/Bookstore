import React, { useContext } from "react";
import AgencyContext from "../../contexts/agency/AgencyContext";
import useFetch from "../hooks/useFetch";
import Spinner from "../utilities/Spinner";
import Pagination from "../utilities/Pagination";
// import SearchFilterForm from "../utilities/SearchFilterForm";
import UpdateAgency from '../modals/update/UpdateAgency'

export default function AgencyList() {
  const agencyContext = useContext(AgencyContext);
  const { agencies, getAgency, searchAgency, isLoading } = agencyContext;

  const { postList, pagination, onPageChange, onSearchChange } = useFetch(
    agencies,
    getAgency,
    searchAgency,
    isLoading
  );

  return (
    <div className="container-fluid">
      {/* <SearchFilterForm onSearchChange={onSearchChange} /> */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="row">
          {postList &&
            postList.map((result) => {
              // return <Card item={result} key={result.id} />;
            })}
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
                  {/* <button className="button muted-button">Edit</button> */}
                  <UpdateAgency agency={result}/>
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
