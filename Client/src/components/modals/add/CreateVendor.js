import React, { useContext, useState } from "react";
import VendorContext from "../../../contexts/vendor/VendorContext";
import useForm from "../../hooks/useForm";
import CommonForm from "../forms/CommonForm";

export default function CreateVendor() {
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name: '',
    address: '',
    phone: '',
  });
  // ! Modal
  const [createVendorModal, setCreateVendorModal] = useState(false);
  const vendorContext = useContext(VendorContext);
  const { addVendor } = vendorContext;
  function submit(status) {
    addVendor(values, status);
    setCreateVendorModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setCreateVendorModal(true)}
      >
        Create Vendor
      </button>
      <CommonForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Create Vendor"
        modalTitle="Create Vendor"
        show={createVendorModal}
        onHide={() => setCreateVendorModal(false)}
      />
    </div>
  );
}
