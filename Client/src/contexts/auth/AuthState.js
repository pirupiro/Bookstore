import React, { useReducer, useState } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../../types/DispatchVar";

const AuthState = (props) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
	});

  const login = async (formData) => {
    try {
      const res = await axios.post("/login", formData);
      const data = res.data;

      if (data.error) {
        alert(data.message);
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => dispatch({ type: LOGOUT });
  console.log(state.isAuthenticated);
  console.log(state.token);
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
