import React from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import { useAuth } from 'hooks';
import routes from './routes';

const AppRoutes: React.FC = () => {
  const auth = useAuth();
  const location = useLocation();
  const myRoutes = useRoutes(routes({ location, ...auth }));

  return <React.Fragment>{myRoutes}</React.Fragment>;
};

export default AppRoutes;
