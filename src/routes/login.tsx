import { Route, Switch } from "react-router-dom";
import { Login } from "pages/Login";

export const LoginRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
    </Switch>
  );
};
