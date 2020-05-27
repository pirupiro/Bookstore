import React, { useContext, useState } from "react";
import WarehouseContext from "../../../contexts/warehouse/WarehouseContext";
import useForm from "../../hooks/useForm";
import CommonForm from "../forms/CommonForm";

export default function CreateWarehouse() {
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name: '',
    address: '',
    phone: '',
  });
  // ! Modal
  const [createWarehouseModal, setCreateWarehouseModal] = useState(false);
  const warehouseContext = useContext(WarehouseContext);
  const { addWarehouse } = warehouseContext;

  function submit(status) {
    addWarehouse(values, status);
    setCreateWarehouseModal(false)
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setCreateWarehouseModal(true)}
      >
        Create Warehouse
      </button>
      <CommonForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Create Warehouse"
        modalTitle="Create  Warehouse"
        show={createWarehouseModal}
        onHide={() => setCreateWarehouseModal(false)}
      />
    </div>
  );
}
