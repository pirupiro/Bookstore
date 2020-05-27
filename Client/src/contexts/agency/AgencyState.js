import React, { useReducer } from "react";
import axios from "axios";
import AgencyContext from "./AgencyContext";
import AgencyReducer from "./AgencyReducer";
import {
  CREATE_AGENCY,
  GET_AGENCY,
  DELETE_AGENCY,
  UPDATE_AGENCY,
  SEARCH_AGENCY,
  ENV_DOMAIN,
  CONFIG_FORMDATA,
  CONFIG_JSON,
} from "../../types/DispatchVar";

export const AgencyState = (props) => {
  const [state, dispatch] = useReducer(AgencyReducer, {
    agencies: [],
    isLoading: true,
    error: null,
  });

  const getAgency = async () => {
    try {
      const res = await axios.get("/agency");
        dispatch({
          type: GET_AGENCY,
          payload: res.data,
        });
    } catch (err) {
      alert(err);
    }
  };

  const getAllAgency = async () => {
    try {
      const res = await axios.get("/agency", 
      // {
      //   headers: {
      //     "content-type": "application/json",
      //     sender:
      //       '{"username": "test_acc3","password": "test_acc3", "employeeId": 3, "role": "Admin"}',
      //   },
      // }
      );

      dispatch({
        type: GET_AGENCY,
        payload: res.data,
      });
    } catch (err) {
      alert(err);
    }
  };

  const searchAgency = async (filter, status) => {
    const { currentPage, pageSize, name } = filter;
    try {
      const res = await axios.get(`/agency/search`, {
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
          type: SEARCH_AGENCY,
          payload: res.data,
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  const addAgency = async (agency) => {
    try {
      const res = await axios.post("/agency", agency);
      dispatch({
        type: CREATE_AGENCY,
        payload: res.data,
      });
    } catch (err) {
      alert(err);
    }
  };

  const updateAgency = async (id, agency) => {
    try {
      const data = JSON.stringify(agency);
      const res = await axios.put(`/agency/${id}`, data);

      console.log("sended agency");
      // const data = res.data;

      // if (data.error) {
      //   alert(data.message);
      // } else {
      dispatch({
        type: UPDATE_AGENCY,
        payload: res.data,
      });
      // }
    } catch (err) {
      alert(err);
    }
  };

  const deleteAgency = async (id) => {
    try {
      await axios.delete(ENV_DOMAIN + `/agencies/${id}`);

      dispatch({
        type: DELETE_AGENCY,
        payload: id,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <AgencyContext.Provider
      value={{
        agencies: state.agencies,
        isLoading: state.isLoading,
        addAgency,
        deleteAgency,
        updateAgency,
        getAgency,
        getAllAgency,
        searchAgency,
      }}
    >
      {props.children}
    </AgencyContext.Provider>
  );
};

export default AgencyState;
