import {
  CREATE_EMPLOYEE,
  GET_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from "../../types/DispatchVar";

export default (state, action) => {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employees: action.payload,
        isLoading: false,
      };
    case CREATE_EMPLOYEE:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        ),
        isLoading: false,
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};
