import React, { useContext, useState } from "react";
import ExportContext from "../../../contexts/export/ExportContext";
import useForm from "../../hooks/useForm";
import ExportForm from "../forms/ExportForm";

export default function UpdateExport() {
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name: "",
    imageUri: "",
  });
  // ! Modal
  const [updateExportModal, setUpdateExportModal] = useState(false);
  const exportContext = useContext(ExportContext);
  const { addExport } = exportContext;
  /**
   * * pass data with image in form data
   */
  const formData = new FormData();
  function submit(status) {
    formData.append("name", values.name);
    formData.append("file", values.imageUri);
    addExport(formData, status);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setUpdateExportModal(true)}
      >
        Update Export
      </button>
      <ExportForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Update Export"
        modalTitle="Update Export"
        show={updateExportModal}
        onHide={() => setUpdateExportModal(false)}
      />
    </div>
  );
}
