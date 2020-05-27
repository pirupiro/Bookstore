import React, { useReducer } from "react";
import axios from "axios";
import ItemContext from "./ItemContext";
import ItemReducer from "./ItemReducer";
import {
  CREATE_ITEM,
  GET_ITEM,
  GET_ALL_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  SEARCH_ITEM,
  ENV_DOMAIN,
  CONFIG_FORMDATA,
  CONFIG_JSON,
} from "../../types/DispatchVar";

export const ItemState = (props) => {
  const [state, dispatch] = useReducer(ItemReducer, {
    items: [],
    isLoading: true,
    error: null,
  });

  const getItem = async (filter, status) => {
    const { currentPage, pageSize } = filter;
    try {
      const res = await axios.get("/other", {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      if (!status.aborted) {
        dispatch({
          type: GET_ITEM,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllItem = async () => {
    const currentPage = 1;
    const pageSize = 1;
    try {
      const res = await axios.get("/other", {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      const newPageSize = res.data.rowCount;
      const response = await axios.get("/other", {
        params: {
          page: currentPage,
          pageSize: newPageSize,
        },
      });
        dispatch({
          type: GET_ALL_ITEM,
          payload: response.data,
        });
    } catch (err) {
      console.log(err);
    }
  };

  const searchItem = async (filter, status) => {
    const { currentPage, pageSize, name } = filter;
    try {
      const res = await axios.get(`/other/search`, {
        params: {
          name: name,
          page: currentPage,
          pageSize: pageSize,
        },
      });
      if (!status.aborted) {
        dispatch({
          type: SEARCH_ITEM,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (item) => {
    try {
      const res = await axios.post("/other", item, CONFIG_FORMDATA);
      dispatch({
        type: CREATE_ITEM,
        payload: res.data,
      });
    } catch (err) {
      throw err;
    }
  };

  const updateItem = async (id, item) => {
    try {
      const data = JSON.stringify(item);
      const res = await axios.put(`/other/${id}`, data, CONFIG_JSON);

      console.log("sended item");
      dispatch({
        type: UPDATE_ITEM,
        payload: res.data,
      });
    } catch (err) {
      throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(ENV_DOMAIN + `/items/${id}`);

      dispatch({
        type: DELETE_ITEM,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        isLoading: state.isLoading,
        addItem,
        deleteItem,
        updateItem,
        getItem,
        getAllItem,
        searchItem,
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
