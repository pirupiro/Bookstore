import React, { useReducer } from "react";
import axios from "axios";
import BookContext from "./BookContext";
import BookReducer from "./BookReducer";
import {
  CREATE_BOOK,
  GET_BOOK,
  GET_ALL_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
  SEARCH_BOOK,
  ENV_DOMAIN,
  CONFIG_FORMDATA,
  CONFIG_JSON
} from "../../types/DispatchVar";

export const BookState = (props) => {
  const [state, dispatch] = useReducer(BookReducer, {
    books: [],
    isLoading: true,
    error: null,
  });

  const getBook = async (filter, status) => {
    const { currentPage, pageSize } = filter;
    try {
      const res = await axios.get("/book", {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      if (!status.aborted) {
      dispatch({
        type: GET_BOOK,
        payload: res.data,
      });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllBook = async () => {
    const currentPage = 1;
    const pageSize = 1;
    try {
      const res = await axios.get("/book", {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      const newPageSize = res.data.rowCount;
      const response = await axios.get("/book", {
        params: {
          page: currentPage,
          pageSize: newPageSize,
        },
      });
      // if (!status.aborted) {
        dispatch({
          type: GET_ALL_BOOK,
          payload: response.data,
        });
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const searchBook = async (filter, status) => {
    const { currentPage, pageSize, name } = filter;
    try {
      const res = await axios.get(`/book/search`, {
        params: {
          name: name,
          page: currentPage,
          pageSize: pageSize,
        },
      });
      if (!status.aborted) {
      dispatch({
        type: SEARCH_BOOK,
        payload: res.data,
      });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addBook = async (book) => {
    try {
      const res = await axios.post("/book", book, CONFIG_FORMDATA);
      dispatch({
        type: CREATE_BOOK,
        payload: res.data,
      });
    } catch (err) {
      throw err;
    }
  };

  const updateBook = async (id, book) => {
    try {
      const data = JSON.stringify(book)
      const res = await axios.put(`/book/${id}`, data, CONFIG_JSON);
      
      console.log(
        'sended book'
      );
        dispatch({
          type: UPDATE_BOOK,
          payload: res.data,
        });
    } catch (err) {
      throw err;
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(ENV_DOMAIN + `/books/${id}`);

      dispatch({
        type: DELETE_BOOK,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        isLoading: state.isLoading,
        addBook,
        deleteBook,
        updateBook,
        getBook,
        getAllBook,
        searchBook,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
