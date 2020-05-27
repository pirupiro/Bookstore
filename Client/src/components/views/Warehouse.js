import React from "react";
import Layout from "../layouts/Layout";
import WarehouseList from "../lists/WarehouseList";
import CreateWarehouse from "../modals/add/CreateWarehouse";

export default function Warehouse() {
  return (
    <Layout>
      <CreateWarehouse />
      <WarehouseList />
    </Layout>
  );
}
