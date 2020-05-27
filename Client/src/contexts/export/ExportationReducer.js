import {
  CREATE_EXPORTATION,
  GET_EXPORTATION,
  DELETE_EXPORTATION,
	UPDATE_EXPORTATION,
} from "../../types/DispatchVar";

export default (state, action) => {
  switch (action.type) {
    case GET_EXPORTATION:
      return {
        ...state,
        exportations: action.payload,
        isLoading: false,
      };
    case CREATE_EXPORTATION:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_EXPORTATION:
      return {
        ...state,
        exportations: state.exportations.map((exportation) =>
          exportation.id === action.payload.id ? action.payload : exportation
        ),
        isLoading: false,
      };
    case DELETE_EXPORTATION:
      return {
        ...state,
        exportations: state.exportations.filter((exportation) => exportation.id !== action.payload),
        isLoading: false,
      };

    default:
      return state;
  }
};
