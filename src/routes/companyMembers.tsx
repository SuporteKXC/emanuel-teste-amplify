import { RouteObject, Outlet, Navigate } from 'react-router-dom';
import type { RouterProps } from 'contracts/Router';
import {
  CompanyMembersListPage,
  CompanyMemberCreationPage,
  CompanyMemberUpdatePage,
} from 'pages/CompanyMembers';

const companyMemberRoutes = ({
  location,
  userBelongsToAnyOf,
}: RouterProps): RouteObject => ({
  path: 'configuracoes/clientes/usuarios',
  element: userBelongsToAnyOf('admin') ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
  children: [
    {
      path: '',
      element: <CompanyMembersListPage />,
    },
    {
      path: 'criar',
      element: <CompanyMemberCreationPage />,
    },
    {
      path: ':id/editar',
      element: <CompanyMemberUpdatePage />,
    },
  ],
});

export default companyMemberRoutes;
