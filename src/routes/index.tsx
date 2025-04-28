import React from 'react';
import { Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';

import { LoginRoutes } from './login';
import { Main } from 'pages/Main';
import { ControlTower } from 'pages/ControlTower';
import { SettingsRoutes } from './settings';
import { WmsRoutes } from './wms';

export const Routes: React.FC = () => {
  return (
    <>
      <Switch>
        <PrivateRoute path="/" exact component={Main} />
        <PrivateRoute path="/base/base" exact component={Main} />
        <PrivateRoute path="/control-tower" exact component={ControlTower} />
      </Switch>
      <LoginRoutes />
      <SettingsRoutes />
      <WmsRoutes/>
    </>
  );
};
