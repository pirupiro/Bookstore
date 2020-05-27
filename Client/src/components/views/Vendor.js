import React from "react";
import Layout from "../layouts/Layout";
import VendorList from "../lists/VendorList";
import CreateVendor from "../modals/add/CreateVendor";

export default function Vendor() {
  return (
    <Layout>
      <CreateVendor />
      <VendorList />
    </Layout>
  );
}
