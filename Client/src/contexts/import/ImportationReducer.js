import {
  CREATE_IMPORTATION,
  GET_IMPORTATION,
  DELETE_IMPORTATION,
	UPDATE_IMPORTATION,
} from "../../types/DispatchVar";

export default (state, action) => {
  switch (action.type) {
    case GET_IMPORTATION:
      return {
        ...state,
        importations: action.payload,
        isLoading: false,
      };
    case CREATE_IMPORTATION:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_IMPORTATION:
      return {
        ...state,
        importations: state.importations.map((importation) =>
          importation.id === action.payload.id ? action.payload : importation
        ),
        isLoading: false,
      };
    case DELETE_IMPORTATION:
      return {
        ...state,
        importations: state.importations.filter((importation) => importation.id !== action.payload),
        isLoading: false,
      };

    default:
      return state;
  }
};
