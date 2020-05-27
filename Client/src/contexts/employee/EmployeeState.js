import React, { useReducer } from "react";
import axios from "axios";
import EmployeeContext from "./EmployeeContext";
import EmployeeReducer from "./EmployeeReducer";
import {
  CREATE_EMPLOYEE,
  GET_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  SEARCH_EMPLOYEE,
  ENV_DOMAIN,
  CONFIG_FORMDATA,
  CONFIG_JSON
} from "../../types/DispatchVar";

export const EmployeeState = (props) => {
  const [state, dispatch] = useReducer(EmployeeReducer, {
    employees: [],
    isLoading: true,
    error: null,
  });

  const getEmployee = async (filter, status) => {
    const { currentPage, pageSize } = filter;
    try {
      const res = await axios.get("/employee", {
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
        type: GET_EMPLOYEE,
        payload: res.data,
      });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllEmployee = async () => {
    try {
      const res = await axios.get("/employee", {
        headers: {
          "content-type": "application/json",
          sender:
            '{"username": "test_acc3","password": "test_acc3", "employeeId": 3, "role": "Admin"}',
        },
      });

        dispatch({
          type: GET_EMPLOYEE,
          payload: res.data,
        });
    } catch (err) {
      console.log(err);
    }
  };

  const searchEmployee = async (filter, status) => {
    const { currentPage, pageSize, name } = filter;
    try {
      const res = await axios.get(`/employee/search`, {
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
        type: SEARCH_EMPLOYEE,
        payload: res.data,
      });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addEmployee = async (employee) => {
    try {
      const res = await axios.post("/employee", employee);
      dispatch({
        type: CREATE_EMPLOYEE,
        payload: res.data,
      });
    } catch (err) {
      throw err;
    }
  };

  const updateEmployee = async (id, employee) => {
    try {
      const data = JSON.stringify(employee)
      const res = await axios.put(`/employee/${id}`, data, CONFIG_JSON);
      
      console.log(
        'sended employee'
      );
      // const data = res.data;

      // if (data.error) {
      //   alert(data.message);
      // } else {
        dispatch({
          type: UPDATE_EMPLOYEE,
          payload: res.data,
        });
      // }
    } catch (err) {
      throw err;
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(ENV_DOMAIN + `/employees/${id}`);

      dispatch({
        type: DELETE_EMPLOYEE,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees: state.employees,
        isLoading: state.isLoading,
        addEmployee,
        deleteEmployee,
        updateEmployee,
        getEmployee,
        getAllEmployee,
        searchEmployee,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeState;
