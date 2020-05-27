import React from "react";
import Nav from "./Nav";
import SideBar from "./SideBar";
import Header from "./Header";
import "../styles/Layout.css";

export default function Layout(props) {
  return (
    <div className={props.class}>
      <Header />
      <div className=" container-fluid ">
        <div className="row flex-xl-nowrap">
          <SideBar />
          <div className="col container">
            <Nav />
            <div className={props.class}>{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
