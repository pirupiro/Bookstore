import React, { useContext, useState } from "react";
import BookContext from "../../../contexts/book/BookContext";
import useForm from "../../hooks/useForm";
import BookForm from "../forms/BookForm";

export default function UpdateBook({ book }) {
  const { name, price, author, category, publisher, imageUri } = book;
  const bookContext = useContext(BookContext);
  const { updateBook } = bookContext;
  const { handleChange, handleSubmit, values } = useForm(submit, {
    name,
    price,
    author,
    category,
    publisher,
    imageUri,
  });
  const [updateBookModal, setUpdateBookModal] = useState(false);

  async function submit() {
    const newData = {
      id: book.id,
      name: values.name,
      price: values.price,
      author: values.author,
      category: values.category,
      publisher: values.publisher,
      imageUri: book.imageUri,
    };
    updateBook(book.id, newData);
    setUpdateBookModal(false);
  }

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setUpdateBookModal(true)}
      >
        Update Book
      </button>
      <BookForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
        modalType="Edit"
        modalTitle="Update Book"
        show={updateBookModal}
        onHide={() => setUpdateBookModal(false)}
      />
    </div>
  );
}
