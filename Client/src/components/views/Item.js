import React, { useState } from "react";
import Layout from "../layouts/Layout";
import CreateItem from "../modals/add/CreateItem";
import ItemsList from "../lists/ItemsList";
import CreateBook from "../modals/add/CreateBook";
import BookList from "../lists/BookList";

export default function Item() {
  const [isBook, setIsBook] = useState(true);
  return (
    <Layout>
      {isBook ? (
        <>
          <button
            type="button"
            onClick={() => {
              setIsBook(false)
            }}
            className="container btn btn-outline-success btn-lg btn-block"
          >
            Switch to Item View
          </button>
          <h1 className="container font-weight-bold-italic text-center"> BOOK VIEW </h1>
          <CreateBook />
          <BookList />
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              setIsBook(true)
            }}
            className="container btn btn-outline-success btn-lg btn-block"
          >
            Switch to Book View
          </button>
          <h1 className="container font-weight-bold-italic text-center"> ITEM VIEW </h1>
          <CreateItem />
          <ItemsList />
        </>
      )}
    </Layout>
  );
}
