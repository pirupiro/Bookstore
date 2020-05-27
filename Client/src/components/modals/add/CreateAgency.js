import React, { useContext, useState } from "react";
import AgencyContext from "../../../contexts/agency/AgencyContext";
import useForm from "../../hooks/useForm";
import CommonForm from "../forms/CommonForm";

export default function CreateAgency() {
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name: '',
    address: '',
    phone: '',
  });
  // ! Modal
  const [createAgencyModal, setCreateAgencyModal] = useState(false);
  const agencyContext = useContext(AgencyContext);
  const { addAgency } = agencyContext;
  
  // * pass data with image in form data
  function submit(status) {
    addAgency(values, status);
    setCreateAgencyModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setCreateAgencyModal(true)}
      >
        Create Agency
      </button>
      <CommonForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Create Agency"
        modalTitle="Create  Agency"
        show={createAgencyModal}
        onHide={() => setCreateAgencyModal(false)}
      />
    </div>
  );
}
