import React from "react";
import Layout from "../layouts/Layout";
import PersonnelList from '../lists/PersonnelList'
import CreateEmployee from '../modals/add/CreateEmployee'

export default function Personnel() {
  return (
    <Layout>
      <CreateEmployee/>
      <PersonnelList/>
    </Layout>
  );
}
