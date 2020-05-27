import React, { useContext, useState } from "react";
import WarehouseContext from "../../../contexts/warehouse/WarehouseContext";
import useForm from "../../hooks/useForm";
import CommonForm from "../forms/CommonForm";

export default function UpdateWarehouse({ warehouse }) {
  const { name, address, phone } = warehouse;
  const warehouseContext = useContext(WarehouseContext);
  const { updateWarehouse } = warehouseContext;
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name,
    address,
    phone,
  });
  const [updateWarehouseModal, setUpdateWarehouseModal] = useState(false);

  async function submit() {
    const newData = {
      id: warehouse.id,
      name: values.name,
      address: values.address,
      phone: values.phone,
    };
    updateWarehouse(warehouse.id, newData);
    setUpdateWarehouseModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setUpdateWarehouseModal(true)}
      >
        Update Warehouse
      </button>
      <CommonForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Edit"
        modalTitle="Update Warehouse"
        show={updateWarehouseModal}
        onHide={() => setUpdateWarehouseModal(false)}
      />
    </div>
  );
}
