import React from "react";
import Layout from "../layouts/Layout";
import AgencyList from "../lists/AgencyList";
import CreateAgency from "../modals/add/CreateAgency";

export default function Agency() {
  return (
    <Layout>
      <CreateAgency />
      <AgencyList />
    </Layout>
  );
}
