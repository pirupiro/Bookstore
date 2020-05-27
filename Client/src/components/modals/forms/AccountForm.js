import React from "react";
import Modal from "react-bootstrap/Modal";

export default function ItemForm(props) {
  const {
    handleChange,
    handleSubmit,
    values,
    modalType,
    modalTitle,
  } = props;
  const { username, password } = values;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <label>name</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
            />
            <br />
            <label>Password</label>
            <br />
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="modal-footer">
            <button onClick={props.onHide}>Close</button>
            <button
              id="add"
              className="add-btn"
              type="submit"
              value="Submit"
              onClick={props.onHide}
            >
              {modalType}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
