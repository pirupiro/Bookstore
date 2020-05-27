import React, { useContext, useEffect } from "react";
import Layout from "../layouts/Layout";
import BookContext from "../../contexts/book/BookContext";
export default function Test() {
  const { books, getAllBook} = useContext(BookContext)
  useEffect(() => {
    getAllBook();
  }, [])
  return (
    <Layout>
      <pre>{JSON.stringify(books, null, 2)}</pre>
    </Layout>
  );
}
