import React, { useContext, useState } from "react";
import BookContext from "../../../contexts/book/BookContext";
import useForm from "../../hooks/useForm";
import BookForm from "../forms/BookForm";

export default function CreateBook() {
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name: "",
    price: "",
    author: "",
    category: "",
    publisher: "",
    imageUri: "",
  });
  // ! Modal
  const [createBookModal, setCreateBookModal] = useState(false);
  const bookContext = useContext(BookContext);
  const { addBook } = bookContext;
  
  // * pass data with image in form data
  const formData = new FormData();
  function submit(status) {
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("author", values.author);
    formData.append("category", values.category);
    formData.append("publisher", values.publisher);
    formData.append("file", values.imageUri);
    addBook(formData, status);
    setCreateBookModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setCreateBookModal(true)}
      >
        Create Book
      </button>
      <BookForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Create Book"
        modalTitle="Create Book"
        show={createBookModal}
        onHide={() => setCreateBookModal(false)}
      />
    </div>
  );
}
