import React, { useContext } from "react";
import EmployeeContext from "../../contexts/employee/EmployeeContext";
import useFetch from "../hooks/useFetch";
import Spinner from "../utilities/Spinner";
import Pagination from "../utilities/Pagination";
import SearchFilterForm from "../utilities/SearchFilterForm";
import CreateAccount from '../modals/add/CreateAccount'
import UpdateEmployee from '../modals/update/UpdateEmployee'

export default function EmployeeList() {
  const employeeContext = useContext(EmployeeContext);
  const { employees, getEmployee, searchEmployee, isLoading } = employeeContext;

  const { postList, pagination, onPageChange, onSearchChange } = useFetch(
    employees,
    getEmployee,
    searchEmployee,
    isLoading
  );

  return (
    <div className="container-fluid">
      <SearchFilterForm onSearchChange={onSearchChange} />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="row">
          <table className="table table-hover table-responsive">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Birthdate</th>
                <th scope="col">Identity</th>
                <th scope="col">Address</th>
                <th scope="col">WorkFrom</th>
                <th scope="col">Role</th>
                <th scope="col">Salary</th>
                <th scope="col">Account</th>
                <th scope="col">AgencyId</th>
                <th scope="col">Agency</th>
                <th scope="col">WarehouseId</th>
                <th scope="col">Warehouse</th>
                <th scope="col">Create Acc</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {postList &&
                postList.map((result) => (
                  <tr key={result.id}>
                    <td>{result.name}</td>
                    <td>{result.birthdate}</td>
                    <td>{result.identity}</td>
                    <td>{result.address}</td>
                    <td>{result.phone}</td>
                    <td>{result.workFrom}</td>
                    <td>{result.role}</td>
                    <td>{result.salary}</td>
                    <td>{result.account}</td>
                    <td>{result.agencyId}</td>
                    <td>{result.agency}</td>
                    <td>{result.warehouseId}</td>
                    <td>{result.warehouse}</td>
                    <td>
                      <CreateAccount result={result}/>
                    </td>

                    <td>
                      <UpdateEmployee employee={result}/>
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
