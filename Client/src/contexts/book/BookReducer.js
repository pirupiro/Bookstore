import {
  CREATE_BOOK,
  GET_BOOK,
  GET_ALL_BOOK,
  SEARCH_BOOK,
  DELETE_BOOK,
  UPDATE_BOOK,
} from "../../types/DispatchVar";
// import React from 'react'

export default function BookReducer(state, action) {
  switch (action.type) {
    case GET_ALL_BOOK:
      return {
        ...state,
        books: action.payload,
        isLoading: false,
      };
    case GET_BOOK:
      return {
        ...state,
        books: action.payload,
        isLoading: false,
      };

    case SEARCH_BOOK:
      return {
        ...state,
        books: action.payload,
        isLoading: false,
      };
    case CREATE_BOOK:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
        isLoading: false,
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== action.payload),
      };

    default:
      return state;
  }
}
