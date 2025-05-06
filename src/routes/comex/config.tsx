import type { RouterProps } from "contracts";
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { 
  ListAlertTypes,
  NewAlertType,
  UpdateAlertType,
  ListProducts,
  ListCreditHistory,
  NewCreditHistory,
  UpdateCreditHistory,
  ListResponsible,
  NewResponsible,
  UpdateResponsible,
  UpdateProduct,
  ListJustificationType,
  NewJustificationType,
  UpdateJustificationType,
  CreateTransitTime,
  ListTransitTime,
  UpdateTransitTime
} from 'pages/Comex/Configurador';
import { PrivateRoute } from 'routes/PrivateRoute';
//
export const comexConfigRoutes = ({
    isLoggedIn,
    location,
  }: RouterProps): RouteObject => ({
    path: 'configuracoes',
    element: <Outlet />,
    children: [
      // {
      //   path:'alert-types',
      //   element: <PrivateRoute Element={ListAlertTypes} action="LISTALERTTYPE"/>
      // },
      // {
      //   path:'alert-types/novo',
      //   element: <PrivateRoute Element={NewAlertType} action={["CREATEALERTTYPE", "LISTROLE"]}/>
      // },
      // {
      //   path:'alert-types/update/:id',
      //   element: <PrivateRoute Element={UpdateAlertType} action={["UPDATEALERTTYPE", "LISTROLE"]}/>
      // },
      {
        path:'products',
        element: <PrivateRoute Element={ListProducts} action={["LISTPRODUCT", "LISTRESPONSIBLE"]}/>
      },
      {
        path:'credit-history',
        element: <PrivateRoute Element={ListCreditHistory} action="LISTCREDITHISTORY"/>
      },
      {
        path:'responsible',
        element: <PrivateRoute Element={ListResponsible} action="LISTRESPONSIBLE"/>
      },
      {
        path:'responsible/novo',
        element: <PrivateRoute Element={NewResponsible} action="CREATERESPONSIBLE"/>
      },
      {
        path:'responsible/update/:id',
        element: <PrivateRoute Element={UpdateResponsible} action="UPDATERESPONSIBLE"/>
      },
      {
        path:'products/update/:id',
        element: <PrivateRoute Element={UpdateProduct} action="UPDATEPRODUCT"/>
      },
      {
        path:'justification-type',
        element: <PrivateRoute Element={ListJustificationType} action="LISTJUSTIFICATIONTYPE"/>
      },
      {
        path:'justification-type/novo',
        element: <PrivateRoute Element={NewJustificationType} action="CREATEJUSTIFICATIONTYPE"/>
      },
      {
        path:'justification-type/update/:id',
        element: <PrivateRoute Element={UpdateJustificationType} action="UPDATEJUSTIFICATIONTYPE"/>
      },
      /*{
        path:'credit-history/novo',
        element: <CRETE/>
      },
      {
        path:'credit-history/update/:id',
        element: <UPDATEy/>
      },*/
       {
        path:'transit-time',
        element: <PrivateRoute Element={ListTransitTime} action="LISTTRANSITTIME"/>
      },
      {
        path:'transit-time/novo',
        element: <PrivateRoute Element={CreateTransitTime} action="CREATETRANSITTIME"/>
      },
      {
        path:'transit-time/update/:id',
        element: <PrivateRoute Element={UpdateTransitTime} action="UPDATETRANSITTIME"/>
      },
    ],
  });