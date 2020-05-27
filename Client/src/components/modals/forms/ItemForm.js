import React from "react";
import Modal from "react-bootstrap/Modal";

export default function ItemForm(props) {
  const { handleChange, handleSubmit, values, modalType, modalTitle } = props;
  const { 
    name,
    price,
    material,
    manufacturer,
    imageUri 
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

          <label>price</label>
          <br />
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
          />
          <br />

          <label>material</label>
          <br />
          <input
            type="text"
            id="material"
            name="material"
            value={material}
            onChange={handleChange}
          />
          <br />

          <label>manufacturer</label>
          <br />
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={manufacturer}
            onChange={handleChange}
          />
          <br />

          

          {modalType !== "Edit" ? (
            <div>
              <label>Upload Image</label>
              <input
                // required
                accept="image/*"
                multiple
                type="file"
                id="imageUri"
                name="imageUri"
                // files={imageUri}
                // value={imageUri}
                onChange={handleChange}
              />
              <br />
            </div>
          ) : null}
          <br />
          <br />
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
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
