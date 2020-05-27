import React, { Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import history from "./history.js";

import Home from "../components/views/Home";
import Agency from "../components/views/Agency";
import Dashboard from "../components/views/Dashboard";
import Export from "../components/views/Export";
import Import from "../components/views/Import";
import Item from "../components/views/Item";
import Login from "../components/views/Login";
import Order from "../components/views/Order";
import Personnel from "../components/views/Personnel";
import Vendor from "../components/views/Vendor";
import Warehouse from "../components/views/Warehouse";
import Test from "../components/views/Test";

export default function AppRouter() {
  return (
    <Router history={history}>
      <Fragment>
        <div className="App">
          <Switch>
            <Route path="/login" exact component={Login} />
            <ProtectedRoute path="/Test" exact component={Test} />
            <ProtectedRoute path="/" exact component={Home} />
            <ProtectedRoute path="/item" exact component={Item} />
            <ProtectedRoute path="/agency" exact component={Agency} />
            <ProtectedRoute path="/dashboard" exact component={Dashboard} />
            <ProtectedRoute path="/export" exact component={Export} />
            <ProtectedRoute path="/import" exact component={Import} />
            <ProtectedRoute path="/order" exact component={Order} />
            <ProtectedRoute path="/personnel" exact component={Personnel} />
            <ProtectedRoute path="/vendor" exact component={Vendor} />
            <ProtectedRoute path="/warehouse" exact component={Warehouse} />
            <ProtectedRoute path="*" component={() => "404 not found"} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}
