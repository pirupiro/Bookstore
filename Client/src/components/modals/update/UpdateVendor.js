import React, { useContext, useState } from "react";
import VendorContext from "../../../contexts/vendor/VendorContext";
import useForm from "../../hooks/useForm";
import CommonForm from "../forms/CommonForm";

export default function UpdateVendor({ vendor }) {
  const { name, address, phone } = vendor;
  const vendorContext = useContext(VendorContext);
  const { updateVendor } = vendorContext;
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name,
    address,
    phone,
  });
  const [updateVendorModal, setUpdateVendorModal] = useState(false);

  async function submit() {
    const newData = {
      id: vendor.id,
      name: values.name,
      address: values.address,
      phone: values.phone,
    };
    updateVendor(vendor.id, newData);
    setUpdateVendorModal(false);
    
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setUpdateVendorModal(true)}
      >
        Update Warehouse
      </button>
      <CommonForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Edit"
        modalTitle="Update Vendor"
        show={updateVendorModal}
        onHide={() => setUpdateVendorModal(false)}
      />
    </div>
  );
}
