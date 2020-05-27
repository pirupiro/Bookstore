import React from "react";
import Layout from "../layouts/Layout";
import CreateImport from "../modals/add/CreateImport";
import ImportList from '../lists/ImportList'

export default function Import() {
  return (
    <Layout>
      <CreateImport/>
      <ImportList/>
    </Layout>
  );
}
