import React, { useContext, useState } from "react";
import AgencyContext from "../../../contexts/agency/AgencyContext";
import useForm from "../../hooks/useForm";
import CommonForm from "../forms/CommonForm";

export default function UpdateAgency({ agency }) {
  const { name, address, phone } = agency;
  const agencyContext = useContext(AgencyContext);
  const { updateAgency } = agencyContext;
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name,
    address,
    phone,
  });
  const [updateAgencyModal, setUpdateAgencyModal] = useState(false);

  async function submit() {
    const newData = {
      id: agency.id,
      name: values.name,
      address: values.address,
      phone: values.phone,
    };
    updateAgency(agency.id, newData);
    setUpdateAgencyModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setUpdateAgencyModal(true)}
      >
        Update Agency
      </button>
      <CommonForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Edit"
        modalTitle="Update Agency"
        show={updateAgencyModal}
        onHide={() => setUpdateAgencyModal(false)}
      />
    </div>
  );
}
