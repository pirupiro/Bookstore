import React, { useContext, useState, useEffect } from "react";
import EmployeeContext from "../../../contexts/employee/EmployeeContext";
import useForm from "../../hooks/useForm";
import EmployeeForm from "../forms/EmployeeForm";
import WarehouseContext from "../../../contexts/warehouse/WarehouseContext";
import AgencyContext from "../../../contexts/agency/AgencyContext";

export default function UpdateEmployee({employee}) {
  const { name,
    birthDate,
    identity,
    address,
    phone,
    workFrom,
    role,
    salary,
    warehouse,
    warehouseId,
    agency,
    agencyId, } = employee;
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name,
    birthDate,
    identity,
    address,
    phone,
    workFrom,
    role,
    salary,
    warehouse,
    warehouseId,
    agency,
    agencyId,
  });
  // ! Modal
  const [updateEmployeeModal, setUpdateEmployeeModal] = useState(false);
  const employeeContext = useContext(EmployeeContext);
  const { updateEmployee } = employeeContext;

  const warehouseContext = useContext(WarehouseContext);
  const agencyContext = useContext(AgencyContext);

  const { warehouses, getWarehouse } = warehouseContext;
  const { agencies, getAgency } = agencyContext;

  useEffect(() => {
    getWarehouse();
    getAgency();
  }, [])

  function submit(status) {
    updateEmployee(values, status);
    setUpdateEmployeeModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setUpdateEmployeeModal(true)}
      >
        Update Employee
      </button>
      <EmployeeForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        warehouses={warehouses}
        agencies={agencies}
        modalType="Update Employee"
        modalTitle="Update Employee"
        show={updateEmployeeModal}
        onHide={() => setUpdateEmployeeModal(false)}
      />
    </div>
  );
}
