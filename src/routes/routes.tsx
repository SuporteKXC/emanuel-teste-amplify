import { RouteObject, Outlet, Navigate } from 'react-router-dom';
import React from 'react';
import type { RouterProps } from 'contracts/Router';

// guest
import loginRoute from './guest/login';
import forgotMyPasswordRoute from './guest/forgotMyPassword';
import passwordResetRoute from './guest/passwordReset';
// authenticated
import adminsRoutes from './admins';
import companiesRoutes from './companies';
import companyMemberRoutes from './companyMembers';
import dashboardRoutes from './dashboard';
import warehousesRoutes from './warehouses';
import warehouseMemberRoutes from './warehouseMembers';
import stocksRoutes from './stocks';
import stockOrdersRoutes from './stockOrders';

import { MyAccountPage } from 'pages/Account';

const routes = (props: RouterProps): RouteObject[] => {
  const { isLoggedIn, location } = props;

  return [
    {
      path: '/',
      element: isLoggedIn ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      ),
      children: [
        adminsRoutes(props),
        companiesRoutes(props),
        companyMemberRoutes(props),
        dashboardRoutes(props),
        warehousesRoutes(props),
        warehouseMemberRoutes(props),
        stocksRoutes(props),
        stockOrdersRoutes(props),
        {
          path: 'meus-dados',
          element: <MyAccountPage />,
        },
        {
          path: 'configuracoes',
          element: <Navigate to="/configuracoes/clientes" />,
        },
      ],
    },
    loginRoute(props),
    forgotMyPasswordRoute(props),
    passwordResetRoute(props),
  ];
};

export default routes;
