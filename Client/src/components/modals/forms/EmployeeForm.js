import React from "react";
import Modal from "react-bootstrap/Modal";

export default function EmployeeForm(props) {
  const { handleChange, handleSubmit, values, warehouses, agencies, modalType, modalTitle, onHide } = props;
  const {
    name,
    birthDate,
    identity,
    address,
    phone,
    workFrom,
    role,
    salary,
  } = values;

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

            <label>birthDate</label>
            <br />
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={birthDate}
              onChange={handleChange}
            />
            <br />

            <label>identity</label>
            <br />
            <input
              type="text"
              id="identity"
              name="identity"
              value={identity}
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

            <label>workFrom</label>
            <br />
            <input
              type="date"
              id="workFrom"
              name="workFrom"
              value={workFrom}
              onChange={handleChange}
            />
                        
            <br />
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Role
                </label>
              </div>
              <select
                class="custom-select"
                id="role"
                value={role}
                onChange={handleChange}
                name="role"
              >
                <option selected>Choose...</option>
                <option value="Admin">Admin</option>
                <option value="Agency Manager">Agency Manager</option>
                <option value="Warehouse manager">Warehouse manager</option>
                <option value="Cashier">Cashier</option>
              </select>
            </div>

            <label>salary</label>
            <br />
            <input
              type="number"
              id="salary"
              name="salary"
              value={salary}
              onChange={handleChange}
            />
            <br />

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Warehouse
                </label>
              </div>
              <select
                class="custom-select"
                id="warehouseId"
                // value={warehouses.id}
                onChange={handleChange}
                name="warehouseId"
              >
                <option selected>Choose...</option>
                  {warehouses.map((warehouse) => (
                    <option value={warehouse.id}>{warehouse.name}</option>
                  ))}
              </select>
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Agency
                </label>
              </div>
              <select
                class="custom-select"
                id="agencyId"
                // value={agencies.id}
                onChange={handleChange}
                name="agencyId"
              >
                <option selected>Choose...</option>
                {agencies.map((agency) => (
                    <option value={agency.id}>{agency.name}</option>
                  ))}
              </select>
            </div>
            
          </div>
          <div className="modal-footer">
            <button onClick={props.onHide}>Close</button>
            <button
              id="add"
              className="add-btn"
              type="submit"
              value="Submit"
            >
              {modalType}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
