import React, { useReducer } from "react";
import axios from "axios";
import ExportationContext from "./ExportationContext";
import ExportationReducer from "./ExportationReducer";
import {
  CREATE_EXPORTATION,
  GET_EXPORTATION,
  DELETE_EXPORTATION,
  UPDATE_EXPORTATION,
  SEARCH_EXPORTATION,
  ENV_DOMAIN,
} from "../../types/DispatchVar";

export const ExportationState = (props) => {
  const [state, dispatch] = useReducer(ExportationReducer, {
    exportations: [],
    isLoading: true,
    error: null,
  });

  const getExportation = async (filter, status) => {
    const { currentPage, pageSize } = filter;
    try {
      const res = await axios.get("/export", {
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
        type: GET_EXPORTATION,
        payload: res.data,
      });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const searchExportation = async (filter, status) => {
    const { currentPage, pageSize, name } = filter;
    try {
      const res = await axios.get(`/export/search`, {
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
        type: SEARCH_EXPORTATION,
        payload: res.data,
      });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addExportation = async (exportation) => {
    try {
      const res = await axios.post("/export", exportation);
      dispatch({
        type: CREATE_EXPORTATION,
        payload: res.data,
      });
    } catch (err) {
      throw err;
    }
  };

  const updateExportation = async (id, exportation) => {
    try {
      const data = JSON.stringify(exportation)
      const res = await axios.put(`/export/${id}`, data);
      
      console.log(
        'sended exportation'
      );
      // const data = res.data;

      // if (data.error) {
      //   alert(data.message);
      // } else {
        dispatch({
          type: UPDATE_EXPORTATION,
          payload: res.data,
        });
      // }
    } catch (err) {
      throw err;
    }
  };

  const deleteExportation = async (id) => {
    try {
      await axios.delete(ENV_DOMAIN + `/exportations/${id}`);

      dispatch({
        type: DELETE_EXPORTATION,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ExportationContext.Provider
      value={{
        exportations: state.exportations,
        isLoading: state.isLoading,
        addExportation,
        deleteExportation,
        updateExportation,
        getExportation,
        searchExportation,
      }}
    >
      {props.children}
    </ExportationContext.Provider>
  );
};

export default ExportationState;
