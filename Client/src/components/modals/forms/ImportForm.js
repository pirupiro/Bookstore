import React, { useState, Fragment, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function TestDynamicForm2(props) {
  const {
    handleAddFields,
    handleRemoveFields,
    handleInputChange,
    handleSubmit,
    items,
    books,
    vendors,
    details,
    setData
  } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Import Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">
                  Vendor
                </label>
              </div>
              <select
                class="custom-select"
                id="vendorId"
                value={vendors.id}
                onChange={(event) => setData(event.target.value)}
                name="vendorId"
              >
                <option selected>Choose...</option>
                {vendors.map((vendor) => (
                  <option value={vendor.id}>{vendor.name}</option>
                ))}
              </select>
            </div>
            {details.map((detail, index) => (
              <Fragment key={`${detail}~${index}`}>
                {/* <div className="form-group col-sm-6">
                <label htmlFor="itemId">itemId</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemId"
                  name="itemId"
                  value={detail.itemId}
                  onChange={(event) => handleInputChange(index, event)}
                />
              </div> */}

                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">
                      Item
                    </label>
                  </div>
                  <select
                    class="custom-select"
                    id="itemId"
                    value={detail.itemId}
                    onChange={(event) => handleInputChange(index, event)}
                    name="itemId"
                  >
                    <option selected>Choose...</option>
                    {books.results.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group col-sm-4">
                  <label htmlFor="price">price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={detail.price}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="quantity">quantity</label>
                  <input
                    type="text"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    value={detail.quantity}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>
                <div className="form-group col-sm-2">
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleRemoveFields(index)}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() => handleAddFields()}
                  >
                    +
                  </button>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="submit-button">
            <button
              className="btn btn-primary mr-2"
              type="submit"
              onSubmit={handleSubmit}
            >
              Save
            </button>
          </div>
          <br />
          <pre>{JSON.stringify(details, null, 2)}</pre>
        </form>
      </Modal.Body>
    </Modal>
  );
}
