import React, { useReducer } from "react";
import axios from "axios";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";
import {
  CREATE_ORDER,
  GET_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  SEARCH_ORDER,
  ENV_DOMAIN,
} from "../../types/DispatchVar";

export const OrderState = (props) => {
  const [state, dispatch] = useReducer(OrderReducer, {
    orders: [],
    isLoading: true,
    error: null,
  });

  const getOrder = async (filter, status) => {
    const { currentPage, pageSize } = filter;
    try {
      const res = await axios.get("/order", {
        params: {
          page: currentPage,
          pageSize: pageSize,
        },
      });
      if (!status.aborted) {
        dispatch({
          type: GET_ORDER,
          payload: res.data,
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  const searchOrder = async (filter, status) => {
    const { currentPage, pageSize, name } = filter;
    try {
      const res = await axios.get(`/order/search`, {
        params: {
          name: name,
          page: currentPage,
          pageSize: pageSize,
        },
      });
      if (!status.aborted) {
        dispatch({
          type: SEARCH_ORDER,
          payload: res.data,
        });
      }
    } catch (err) {
      alert(err);
    }
  };

  const addOrder = async (order) => {
    try {
      const res = await axios.post("/order", order);
      dispatch({
        type: CREATE_ORDER,
        payload: res.data,
      });
    } catch (err) {
      alert(err);
    }
  };

  const updateOrder = async (id, order) => {
    try {
      const data = JSON.stringify(order);
      const res = await axios.put(`/order/${id}`, data);

      console.log("sended order");
      dispatch({
        type: UPDATE_ORDER,
        payload: res.data,
      });
    } catch (err) {
      alert(err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(ENV_DOMAIN + `/orders/${id}`);

      dispatch({
        type: DELETE_ORDER,
        payload: id,
      });
    } catch (err) {
      alert(err);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        isLoading: state.isLoading,
        addOrder,
        deleteOrder,
        updateOrder,
        getOrder,
        searchOrder,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
