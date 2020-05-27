import React, { useContext, useState, useEffect } from "react";
import EmployeeContext from "../../../contexts/employee/EmployeeContext";
import WarehouseContext from "../../../contexts/warehouse/WarehouseContext";
import AgencyContext from "../../../contexts/agency/AgencyContext";

import useForm from "../../hooks/useForm";
import EmployeeForm from "../forms/EmployeeForm";

export default function CreateEmployee() {
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name: "",
    birthDate: "",
    identity: "",
    address: "",
    phone: "",
    workFrom: "",
    role: "",
    salary: "",
    warehouse: "",
    warehouseId: "",
    agency: "",
    agencyId: "",
  });
  const [createEmployeeModal, setCreateEmployeeModal] = useState(false);

  const [handleWarehouse, setHandleWarehouse] = useState("")
  const [handleAgency, setHandleAgency] = useState("")
  const employeeContext = useContext(EmployeeContext);
  const warehouseContext = useContext(WarehouseContext);
  const agencyContext = useContext(AgencyContext);

  const { addEmployee } = employeeContext;
  const { warehouses, getWarehouse } = warehouseContext;
  const { agencies, getAgency } = agencyContext;

  useEffect(() => {
    getWarehouse();
    getAgency();
  }, [])

  function submit(status) {
    addEmployee(values, status);
    setCreateEmployeeModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setCreateEmployeeModal(true)}
      >
        Create Employee
      </button>
      <EmployeeForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        warehouses={warehouses}
        agencies={agencies}
        modalType="Create Employee"
        modalTitle="Create Employee"
        show={createEmployeeModal}
        onHide={() => setCreateEmployeeModal(false)}
      />
    </div>
  );
}
