import React, { useCallback } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { AuthState } from "store/ducks/auth";
import { usePermissions } from "hooks";
import { notify } from "services";

import { NewPassword } from "pages/NewPassword";
interface Props {
  [propName: string]: any;
}

export const PrivateRoute: React.FC<Props> = ({
  component: Component,
  hasAnyPermission = [],
  hasEveryPermission = [],
  ...rest
}) => {
  const {
    hasAnyPermission: _hasAnyPermission,
    hasEveryPermission: _hasEveryPermission,
  } = usePermissions();

  const auth = useSelector<RootStateOrAny>((state) => state.auth) as AuthState;

  const canAccess = useCallback(() => {
    if (!auth.loggedIn) return false;

    if (hasAnyPermission.length >= 1) {
      const anyPermission = _hasAnyPermission(hasAnyPermission);
      if (!anyPermission) {
        notify("error", "Acesso negado");
      }
      return anyPermission;
    } else if (hasEveryPermission.length >= 1) {
      const everyPermission = _hasEveryPermission(hasEveryPermission);
      if (!everyPermission) {
        notify("error", "Acesso negado");
      }
      return everyPermission;
    } else {
      return true;
    }
  }, [
    _hasAnyPermission,
    _hasEveryPermission,
    auth,
    hasAnyPermission,
    hasEveryPermission,
  ]);

  const renderComponent = useCallback(
    (props) => {
      if (canAccess() && auth.data) {
        const { days_left_password } = auth.data;
        const isPasswordExpired = days_left_password !== null && days_left_password <= 0;

        if (auth.data.new_password || isPasswordExpired) {
          return <NewPassword {...props} />;
        }
        if (!auth.data.new_password) {
          return <Component {...props} />;
        }
      }

      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    },
    [Component, auth, canAccess]
  );

  return <Route {...rest} render={(props) => renderComponent(props)} />;
};
