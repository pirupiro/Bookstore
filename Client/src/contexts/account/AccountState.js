import React, { useReducer } from "react";
import axios from "axios";
import AccountContext from "./AccountContext";
import AccountReducer from "./AccountReducer";
import {
  CREATE_ACCOUNT,
  GET_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT,
  SEARCH_ACCOUNT,
  ENV_DOMAIN,
  CONFIG_FORMDATA,
  CONFIG_JSON
} from "../../types/DispatchVar";

export const AccountState = (props) => {
  const [state, dispatch] = useReducer(AccountReducer, {
    accounts: [],
    isLoading: true,
    error: null,
  });

  const getAccount = async (filter, status) => {
    const { currentPage, pageSize } = filter;
    try {
      const res = await axios.get("/account", {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
        headers: {
          "content-type": "application/json",
          sender:
            '{"username": "test_acc3","password": "test_acc3", "employeeId": 3, "role": "Admin"}',
        },
      });
      if (!status.aborted) {
      dispatch({
        type: GET_ACCOUNT,
        payload: res.data,
      });
      }
    } catch (err) {
      alert(err);
    }
  };

  const searchAccount = async (filter, status) => {
    const { currentPage, pageSize, name } = filter;
    try {
      const res = await axios.get(`/account/search`, {
        params: {
          name: name,
          page: currentPage,
          pageSize: pageSize,
        },
        headers: {
          "content-type": "application/json",
          sender:
            '{"username": "test_acc3","password": "test_acc3", "employeeId": 3, "role": "Admin"}',
        },
      });
      if (!status.aborted) {
      dispatch({
        type: SEARCH_ACCOUNT,
        payload: res.data,
      });
      }
    } catch (err) {
      alert(err);
    }
  };

  const addAccount = async (account) => {
    try {
      const res = await axios.post("/account", account);
      dispatch({
        type: CREATE_ACCOUNT,
        payload: res.data,
      });
    } catch (err) {
      alert(err);
    }
  };

  const updateAccount = async (id, account) => {
    try {
      const data = JSON.stringify(account)
      const res = await axios.put(`/account/${id}`, data);
      
      console.log(
        'sended account'
      );
      // const data = res.data;

      // if (data.error) {
      //   alert(data.message);
      // } else {
        dispatch({
          type: UPDATE_ACCOUNT,
          payload: res.data,
        });
      // }
    } catch (err) {
      alert(err);
    }
  };

  const deleteAccount = async (id) => {
    try {
      await axios.delete(ENV_DOMAIN + `/accounts/${id}`);

      dispatch({
        type: DELETE_ACCOUNT,
        payload: id,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <AccountContext.Provider
      value={{
        accounts: state.accounts,
        isLoading: state.isLoading,
        addAccount,
        deleteAccount,
        updateAccount,
        getAccount,
        searchAccount,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountState;
