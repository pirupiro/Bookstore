import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";

export default function Nav(name, info) {
  const authContext = useContext(AuthContext);
  const { token } = authContext;
  var tokenObj = JSON.parse(token);
  return (
    // navbar  navbar-dark bg-dark
    <nav className="container navbar navbar-dark justify-content-between bg-dark navbar-expand-lg sticky-top">
      <NavLink className="navbar-brand center" to="/">
        Sy la son
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav text-center ">
          {(tokenObj.role === "Admin") ? (
            <>
              <NavLink className="nav-item nav-link" to="/personnel">
                Personnel
              </NavLink>

              <NavLink className="nav-item nav-link" to="/order">
                Cashier
              </NavLink>

              <NavLink className="nav-item nav-link" to="/item">
                Items
              </NavLink>

              <NavLink className="nav-item nav-link " to="/import">
                import
              </NavLink>

              <NavLink className="nav-item nav-link " to="/export">
                Export
              </NavLink>

              <NavLink className="nav-item nav-link " to="/agency">
                Agency
              </NavLink>

              <NavLink className="nav-item nav-link " to="/vendor">
                Vendor
              </NavLink>

              <NavLink className="nav-item nav-link " to="/warehouse">
                Warehouse
              </NavLink>

              <NavLink className="nav-item nav-link " to="/test">
                test
              </NavLink>
            </>
          ) : (tokenObj.role === "Agency Manager") ? (
            <NavLink className="nav-item nav-link " to="/agency">
              Agency
            </NavLink>
          ) : (tokenObj.role === "Warehouse Manager") ? (
            <>
              <NavLink className="nav-item nav-link " to="/vendor">
                Vendor
              </NavLink>
              <NavLink className="nav-item nav-link " to="/warehouse">
                Warehouse
              </NavLink>
            </>
          ) : (
            <NavLink className="nav-item nav-link" to="/order">
              Cashier
            </NavLink>
          )}
          
        </div>
      </div>
    </nav>
  );
}
{
  /* {token.role === "Admin" ? ( */
}
// ) : token.role === "Agency Manager" ? (
//   <>
//     {" "}
//     <NavLink className="nav-item nav-link " to="/agency">
//       Agency
//     </NavLink>
//   </>
// ) : token.role === "Warehouse Manager" ? (
//   <>
//     {" "}
//     <NavLink className="nav-item nav-link " to="/vendor">
//       Vendor
//     </NavLink>
//     <NavLink className="nav-item nav-link " to="/warehouse">
//       Warehouse
//     </NavLink>
//   </>
// ) : (
//   <NavLink className="nav-item nav-link" to="/order">
//     Cashier
//   </NavLink>
// )}
