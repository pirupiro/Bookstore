import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../../types/DispatchVar";
import setToken from "../../router/setToken";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const obj = {
        id: action.payload.id,
        role: action.payload.role,
        agencyId: action.payload.agencyId,
        warehouseId: action.payload.warehouseId,
      };
      const sender = JSON.stringify(obj);
      console.log(sender);
      localStorage.setItem("sender", sender);

      return {
        ...state,
        ...action.payload,
        token: setToken(localStorage.sender),
        isAuthenticated: true,
				isLoading: false,
				
      };
    case (LOGIN_FAIL, LOGOUT):
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
