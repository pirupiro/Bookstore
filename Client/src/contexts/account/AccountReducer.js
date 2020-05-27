import {
  CREATE_ACCOUNT,
  GET_ACCOUNT,
  DELETE_ACCOUNT,
	UPDATE_ACCOUNT,
} from "../../types/DispatchVar";

export default (state, action) => {
  switch (action.type) {
    case GET_ACCOUNT:
      return {
        ...state,
        accounts: action.payload,
      };
    case CREATE_ACCOUNT:
      return {
        ...state,
        accounts: [action.payload, ...state.accounts],
      };
    case UPDATE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account._id === action.payload._id ? action.payload : account
        ),
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter((account) => account._id !== action.payload),
      };

    default:
      return state;
  }
};
