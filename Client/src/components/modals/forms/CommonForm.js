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
  const { name, address, phone } = values;

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
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
            />
            <br />
            <label>Address</label>
            <br />
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleChange}
            />
            <br />
            <label>Phone</label>
            <br />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="modal-footer">
            <button onClick={props.onHide}>Close</button>
            <button id="add" className="add-btn" type="submit" value="Submit">
              {modalType}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
