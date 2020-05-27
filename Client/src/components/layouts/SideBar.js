import React, { useContext } from "react";
import "../styles/SideBar.css";
import AuthContext from '../../contexts/auth/AuthContext';

export default function SideBar() {
  // const [open, setOpen] = useState(false);
  // const openSide = (open) => {
  //   if (open) {
  //     setOpen = !open;
  //   }
  // };

  const authContext = useContext(AuthContext);
  const { logout } = authContext;

  return (
    <div id="sidebar-container" className="sidebar-expanded d-none d-md-block container">
      <ul className="list-group sticky-top" >
        <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
          <small>MAIN MENU</small>
        </li>
        <a
          href="#submenu1"
          data-toggle="collapse"
          aria-expanded="false"
          className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
        >
          <div className="d-flex w-100 justify-content-start align-items-center">
            <span className="fa fa-dashboard fa-fw mr-3"></span>
            <span className="menu-collapsed">Dashboard</span>
            <span className="submenu-icon ml-auto"></span>
          </div>
        </a>
        <div id="submenu1" className="collapse sidebar-submenu">
          <a
            href="#"
            className="list-group-item list-group-item-action bg-dark text-white"
          >
            <span className="menu-collapsed">Charts</span>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action bg-dark text-white"
          >
            <span className="menu-collapsed">Reports</span>
          </a>
          <a
            href="#"
            className="list-group-item list-group-item-action bg-dark text-white"
          >
            <span className="menu-collapsed">Tables</span>
          </a>
        </div>

        <a
          className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
          href="/"
          onClick={logout}
        >
          <div className="d-flex w-100 justify-content-start align-items-center">
            <span className="fa fa-dashboard fa-fw mr-3"></span>
            <span>Logout</span>
          </div>
        </a>
        

        <li className="list-group-item sidebar-separator menu-collapsed"></li>
        <a
          href="#"
          data-toggle="sidebar-colapse"
          className="bg-dark list-group-item list-group-item-action d-flex align-items-center"
        >
          <div className="d-flex w-100 justify-content-start align-items-center">
            <span id="collapse-icon" className="fa fa-2x mr-3"></span>
            <span id="collapse-text" className="menu-collapsed">
              Collapse
            </span>
          </div>
        </a>
      </ul>
    </div>
  );
}
