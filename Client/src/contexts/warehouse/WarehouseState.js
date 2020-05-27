import React, { useReducer } from "react";
import axios from "axios";
import WarehouseContext from "./WarehouseContext";
import WarehouseReducer from "./WarehouseReducer";
import {
  CREATE_WAREHOUSE,
  GET_WAREHOUSE,
  DELETE_WAREHOUSE,
  UPDATE_WAREHOUSE,
  SEARCH_WAREHOUSE,
  ENV_DOMAIN,
  CONFIG_FORMDATA,
  CONFIG_JSON
} from "../../types/DispatchVar";

export const WarehouseState = (props) => {
  const [state, dispatch] = useReducer(WarehouseReducer, {
    warehouses: [],
    isLoading: true,
    error: null,
  });

  const getWarehouse = async () => {
    try {
      const res = await axios.get("/warehouse");
      dispatch({
        type: GET_WAREHOUSE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const searchWarehouse = async (filter, status) => {
    const { currentPage, pageSize, name } = filter;
    try {
      const res = await axios.get(`/warehouse/search`, {
        params: {
          name: name,
          page: currentPage,
          pageSize: pageSize,
        },
      });
      if (!status.aborted) {
      dispatch({
        type: SEARCH_WAREHOUSE,
        payload: res.data,
      });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addWarehouse = async (warehouse) => {
    try {
      const res = await axios.post("/warehouse", warehouse);
      dispatch({
        type: CREATE_WAREHOUSE,
        payload: res.data,
      });
    } catch (err) {
      throw err;
    }
  };

  const updateWarehouse = async (id, warehouse) => {
    try {
      const data = JSON.stringify(warehouse)
      const res = await axios.put(`/warehouse/${id}`, data);
      
      console.log(
        'sended warehouse'
      );
        dispatch({
          type: UPDATE_WAREHOUSE,
          payload: res.data,
        });
    } catch (err) {
      throw err;
    }
  };

  const deleteWarehouse = async (id) => {
    try {
      await axios.delete(ENV_DOMAIN + `/warehouses/${id}`);

      dispatch({
        type: DELETE_WAREHOUSE,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WarehouseContext.Provider
      value={{
        warehouses: state.warehouses,
        isLoading: state.isLoading,
        addWarehouse,
        deleteWarehouse,
        updateWarehouse,
        getWarehouse,
        searchWarehouse,
      }}
    >
      {props.children}
    </WarehouseContext.Provider>
  );
};

export default WarehouseState;
