import React, { useReducer } from "react";
import axios from "axios";
import VendorContext from "./VendorContext";
import VendorReducer from "./VendorReducer";
import {
  CREATE_VENDOR,
  GET_VENDOR,
  DELETE_VENDOR,
  UPDATE_VENDOR,
  SEARCH_VENDOR,
  ENV_DOMAIN,
} from "../../types/DispatchVar";

export const VendorState = (props) => {
  const [state, dispatch] = useReducer(VendorReducer, {
    vendors: [],
    isLoading: true,
    error: null,
  });

  const getVendor = async () => {
    try {
      const res = await axios.get("/vendor");
        dispatch({
          type: GET_VENDOR,
          payload: res.data,
        });
    } catch (err) {
      console.log(err);
    }
  };

  const searchVendor = async (filter, status) => {
    const { currentPage, pageSize, name } = filter;
    try {
      const res = await axios.get(`/vendor/search`, {
        params: {
          name: name,
          page: currentPage,
          pageSize: pageSize,
        },
      });
      if (!status.aborted) {
        dispatch({
          type: SEARCH_VENDOR,
          payload: res.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addVendor = async (vendor) => {
    try {
      const res = await axios.post("/vendor", vendor);
      dispatch({
        type: CREATE_VENDOR,
        payload: res.data,
      });
    } catch (err) {
      throw err;
    }
  };

  const updateVendor = async (id, vendor) => {
    try {
      const data = JSON.stringify(vendor);
      const res = await axios.put(`/vendor/${id}`, data);

      console.log("sended vendor");
      dispatch({
        type: UPDATE_VENDOR,
        payload: res.data,
      });
    } catch (err) {
      throw err;
    }
  };

  const deleteVendor = async (id) => {
    try {
      await axios.delete(ENV_DOMAIN + `/vendors/${id}`);

      dispatch({
        type: DELETE_VENDOR,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VendorContext.Provider
      value={{
        vendors: state.vendors,
        isLoading: state.isLoading,
        addVendor,
        deleteVendor,
        updateVendor,
        getVendor,
        searchVendor,
      }}
    >
      {props.children}
    </VendorContext.Provider>
  );
};

export default VendorState;
