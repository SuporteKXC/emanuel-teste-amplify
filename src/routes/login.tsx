import React from "react";
import { Switch } from "react-router-dom";

import { GuestRoute } from "./GuestRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Login } from "pages/Login";
import { NewPassword } from "pages/NewPassword";
import { PasswordSuccess } from "pages/NewPassword/PasswordSuccess";
import { ForgotPassword } from "pages/ForgotPassword";
import { ForgotSuccess } from "pages/ForgotPassword/ForgotSuccess";

interface Props {}

export const LoginRoutes: React.FC<Props> = () => {
  return (
    <Switch>
      <GuestRoute exact path="/login" component={Login} />
      <GuestRoute exact path="/forgot" component={ForgotPassword} />
      <GuestRoute exact path="/forgot-success" component={ForgotSuccess} />
      <PrivateRoute exact path="/new-password" component={NewPassword} />
      <GuestRoute exact path="/password-success" component={PasswordSuccess} />
    </Switch>
  );
};
