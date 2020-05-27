import React, { useContext, useState } from "react";
import ItemContext from "../../../contexts/item/ItemContext";
import useForm from "../../hooks/useForm";
import ItemForm from "../forms/ItemForm";

export default function UpdateItem({ item }) {
  const { name, price, material, manufacturer, imageUri } = item;
  const itemContext = useContext(ItemContext);
  const { updateItem } = itemContext;
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name,
    price,
    material,
    manufacturer,
    imageUri,
  });
  const [updateItemModal, setUpdateItemModal] = useState(false);

  async function submit() {
    const newData = {
      id: item.id,
      name: values.name,
      price: values.price,
      material: values.material,
      manufacturer: values.manufacturer,
      imageUri: item.imageUri,
    };
    updateItem(item.id, newData);
    setUpdateItemModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setUpdateItemModal(true)}
      >
        Update Item
      </button>
      <ItemForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Edit"
        modalTitle="Update Item"
        show={updateItemModal}
        onHide={() => setUpdateItemModal(false)}
      />
    </div>
  );
}
