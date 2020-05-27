import React from "react";
import Layout from "../layouts/Layout";
import CreateExport from "../modals/add/CreateExport";
import ExportList from "../lists/ExportList";
export default function Export() {
  return (
    <Layout>
      <CreateExport />
      <ExportList />
    </Layout>
  );
}
