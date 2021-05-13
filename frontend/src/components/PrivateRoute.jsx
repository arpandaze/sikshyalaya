import React from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import { useContext } from "react";
import configs from "../utils/configs";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn || configs.PRIVATE_ROUTE_ACCESS ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
