import {
  CREATE_AGENCY,
  GET_AGENCY,
  DELETE_AGENCY,
	UPDATE_AGENCY,
} from "../../types/DispatchVar";

export default (state, action) => {
  switch (action.type) {
    case GET_AGENCY:
      return {
        ...state,
        agencies: action.payload,
        isLoading: false
      };
    case CREATE_AGENCY:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_AGENCY:
      return {
        ...state,
        agencies: state.agencies.map((agency) =>
          agency._id === action.payload._id ? action.payload : agency
        ),
        isLoading: false
      };
    case DELETE_AGENCY:
      return {
        ...state,
        agencies: state.agencies.filter((agency) => agency._id !== action.payload),
        isLoading: false
      };

    default:
      return state;
  }
};
