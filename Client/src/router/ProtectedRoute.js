import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../contexts/auth/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, token } = authContext;
    return ( <
        Route {...rest }
        render = {
            (props) =>
            (isAuthenticated == false) && (token == null) ? ( <
                Redirect to = "/login" / >
            ) : ( <
                Component {...props }
                />
            )
        }
        />
    );
};
export default ProtectedRoute;