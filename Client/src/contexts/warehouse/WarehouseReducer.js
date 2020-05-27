import {
  CREATE_WAREHOUSE,
  GET_WAREHOUSE,
  DELETE_WAREHOUSE,
	UPDATE_WAREHOUSE,
} from "../../types/DispatchVar";

export default (state, action) => {
  switch (action.type) {
    case GET_WAREHOUSE:
      return {
        ...state,
        warehouses: action.payload,
        isLoading: false
      };
    case CREATE_WAREHOUSE:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_WAREHOUSE:
      return {
        ...state,
        warehouses: state.warehouses.map((warehouse) =>
          warehouse._id === action.payload._id ? action.payload : warehouse
        ),
        isLoading: false
      };
    case DELETE_WAREHOUSE:
      return {
        ...state,
        warehouses: state.warehouses.filter((warehouse) => warehouse._id !== action.payload),
        isLoading: false
      };

    default:
      return state;
  }
};
