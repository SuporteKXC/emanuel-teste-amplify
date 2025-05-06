import { RouteObject, Outlet, Navigate } from 'react-router-dom';
import type { RouterProps } from 'contracts/Router';
import {
  CompaniesListPage,
  CompanyCreationPage,
  CompanyUpdatePage,
} from 'pages/Companies';

const companiesRoutes = ({
  location,
  userBelongsToAnyOf,
}: RouterProps): RouteObject => ({
  path: 'configuracoes/clientes',
  element: userBelongsToAnyOf('admin') ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
  children: [
    {
      path: '',
      element: <CompaniesListPage />,
    },
    {
      path: 'criar',
      element: <CompanyCreationPage />,
    },
    {
      path: ':id/editar',
      element: <CompanyUpdatePage />,
    },
  ],
});

export default companiesRoutes;
