import React, { useCallback } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { AuthState } from "store/ducks/auth";

interface GuestRouteProps {
  [propName: string]: any;
}

export const GuestRoute: React.FC<GuestRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const auth = useSelector<RootStateOrAny>(
    (state) => state.auth
  ) as AuthState;

  const redirect = useCallback(() => {
    if (auth.loggedIn && auth.data?.new_password) return "/new-password";
    return "/";
  }, [auth]);

  // Evita renderização em branco enquanto auth carrega
  if (auth === undefined || auth === null || auth.loggedIn === undefined) {
    return null; // ou um loader: <Loading />
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: redirect() }} />
        )
      }
    />
  );
};
