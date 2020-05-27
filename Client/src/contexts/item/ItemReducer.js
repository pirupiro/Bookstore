import {
  CREATE_ITEM,
  GET_ITEM,
  GET_ALL_ITEM,
  SEARCH_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
} from "../../types/DispatchVar";
// import React from 'react'

export default function ItemReducer(state, action) {
  switch (action.type) {
    case GET_ITEM:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case GET_ALL_ITEM:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };

    case SEARCH_ITEM:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case CREATE_ITEM:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        isLoading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
}
