import {
  CREATE_ORDER,
  GET_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
} from "../../types/DispatchVar";

export default (state, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
      };
    case CREATE_ORDER:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
        isLoading: false,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.payload),
        isLoading: false,
      };

    default:
      return state;
  }
};
