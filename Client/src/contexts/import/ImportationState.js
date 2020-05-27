import React, { useReducer } from "react";
import axios from "axios";
import ImportationContext from "./ImportationContext";
import ImportationReducer from "./ImportationReducer";
import {
  CREATE_IMPORTATION,
  GET_IMPORTATION,
  DELETE_IMPORTATION,
  UPDATE_IMPORTATION,
  SEARCH_IMPORTATION,
  ENV_DOMAIN,
  CONFIG_FORMDATA,
  CONFIG_JSON
} from "../../types/DispatchVar";

export const ImportationState = (props) => {
  const [state, dispatch] = useReducer(ImportationReducer, {
    importations: [],
    isLoading: true,
    error: null,
  });

  const getImportation = async (filter, status) => {
    const { currentPage, pageSize } = filter;
    try {
      const res = await axios.get("/import", {
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
        type: GET_IMPORTATION,
        payload: res.data,
      });
      }
    } catch (err) {
      alert(err);
    }
  };

  const searchImportation = async (filter, status) => {
    const { currentPage, pageSize, name } = filter;
    try {
      const res = await axios.get(`/import/search`, {
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
        type: SEARCH_IMPORTATION,
        payload: res.data,
      });
      }
    } catch (err) {
      alert(err);
    }
  };

  const addImportation = async (importation) => {
    try {
      const res = await axios.post("/import", importation);
      dispatch({
        type: CREATE_IMPORTATION,
        payload: res.data,
      });
    } catch (err) {
      throw err;
    }
  };

  const updateImportation = async (id, importation) => {
    try {
      const data = JSON.stringify(importation)
      const res = await axios.put(`/import/${id}`, data);
      
      console.log(
        'sended importation'
      );
      // const data = res.data;

      // if (data.error) {
      //   alert(data.message);
      // } else {
        dispatch({
          type: UPDATE_IMPORTATION,
          payload: res.data,
        });
      // }
    } catch (err) {
      throw err;
    }
  };

  const deleteImportation = async (id) => {
    try {
      await axios.delete(ENV_DOMAIN + `/importations/${id}`);

      dispatch({
        type: DELETE_IMPORTATION,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ImportationContext.Provider
      value={{
        importations: state.importations,
        isLoading: state.isLoading,
        addImportation,
        deleteImportation,
        updateImportation,
        getImportation,
        searchImportation,
      }}
    >
      {props.children}
    </ImportationContext.Provider>
  );
};

export default ImportationState;
