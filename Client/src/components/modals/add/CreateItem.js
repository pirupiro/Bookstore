import React, { useContext, useState } from "react";
import ItemContext from "../../../contexts/item/ItemContext";
import useForm from "../../hooks/useForm";
import ItemForm from "../forms/ItemForm";

export default function CreateItem() {
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name: "",
    price: "",
    material: "",
    manufacturer: "",
    imageUri: "",
  });
  // ! Modal
  const [createItemModal, setCreateItemModal] = useState(false);
  const itemContext = useContext(ItemContext);
  const { addItem } = itemContext;

  // * pass data with image in form data
  const formData = new FormData();
  function submit(status) {
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("material", values.material);
    formData.append("manufacturer", values.manufacturer);
    formData.append("file", values.imageUri);
    addItem(formData, status);
    setCreateItemModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setCreateItemModal(true)}
      >
        Create Item
      </button>
      <ItemForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Create Item"
        modalTitle="Create Item"
        show={createItemModal}
        onHide={() => setCreateItemModal(false)}
      />
    </div>
  );
}
