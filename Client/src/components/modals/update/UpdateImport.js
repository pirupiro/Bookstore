import React, { useContext, useState } from "react";
import ImportContext from "../../../contexts/import/ImportContext";
import useForm from "../../hooks/useForm";
import ImportForm from "../forms/ImportForm";

export default function UpdateImport() {
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name: "",
    imageUri: "",
  });

  const [updateImportModal, setUpdateImportModal] = useState(false);
  const importContext = useContext(ImportContext);
  const { updateImport } = importContext;

  function submit(status) {
    updateImport(formData, status);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setUpdateImportModal(true)}
      >
        Update Import
      </button>
      <ImportForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Update Import"
        modalTitle="Update Import"
        show={updateImportModal}
        onHide={() => setUpdateImportModal(false)}
      />
    </div>
  );
}
