import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import configs from "../utils/configs";
import { get } from "idb-keyval";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    get("user")
      .then((value) => {
        if (value.user_type != configs.USER_TYPES.ADMIN) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      })
      .catch((e) => {
        setIsLoggedIn(false);
      });
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn === true || configs.PRIVATE_ROUTE_ACCESS ? (
          <Component {...props} />
        ) : isLoggedIn === false ? (
          <Redirect
            to={{
              pathname: "/404",
              state: { from: props.location },
            }}
          />
        ) : (
          <></>
        )
      }
    />
  );
};

export default AdminRoute;
