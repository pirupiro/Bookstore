import React from "react";
import Layout from "../layouts/Layout";
import CreateOrder from "../modals/add/CreateOrder";
import OrderList from "../lists/OrderList";

export default function Personnel() {
  return (
    <Layout>
      <CreateOrder />
      <OrderList />
    </Layout>
  );
}
