import React, { useContext, useState } from "react";
import AccountContext from "../../../contexts/account/AccountContext";
import useForm from "../../hooks/useForm";
import AccountForm from "../forms/AccountForm";

export default function CreateAccount(props) {
  const { result } = props

  const { handleChange, handleSubmit, values } = useForm(submit, {
    username: "",
    password: "",
    employeeId: result.id
  });

  // ! Modal
  const [createAccountModal, setCreateAccountModal] = useState(false);
  const accountContext = useContext(AccountContext);
  const { addAccount } = accountContext;
  
  // * pass data with image in form data
  function submit(status) {
    addAccount(values, status);
    setCreateAccountModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setCreateAccountModal(true)}
      >
        Create Account
      </button>
      <AccountForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Create Account"
        modalTitle="Create Account"
        show={createAccountModal}
        onHide={() => setCreateAccountModal(false)}
      />
    </div>
  );
}
