import {
  CREATE_VENDOR,
  GET_VENDOR,
  DELETE_VENDOR,
	UPDATE_VENDOR,
} from "../../types/DispatchVar";

export default (state, action) => {
  switch (action.type) {
    case GET_VENDOR:
      return {
        ...state,
        vendors: action.payload,
        isLoading: false,
      };
    case CREATE_VENDOR:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_VENDOR:
      return {
        ...state,
        vendors: state.vendors.map((vendor) =>
          vendor._id === action.payload._id ? action.payload : vendor
        ),
        isLoading: false,
      };
    case DELETE_VENDOR:
      return {
        ...state,
        vendors: state.vendors.filter((vendor) => vendor._id !== action.payload),
        isLoading: false,
      };

    default:
      return state;
  }
};
