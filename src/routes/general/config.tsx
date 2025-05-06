import { Outlet, RouteObject } from "react-router-dom";
import {
  Users,
  NewUser,
  UpdateUser,
  DeleteUser,
  ImpersonateUser,
  Roles,
  NewRole,
  UpdateRole,
  ListAlertTypes,
  NewAlertType,
  UpdateAlertType,
  DeleteAlertType,
  CreateCarrier,
  UpdateCarrier,
  ListCarriers,
  ListProducts,
  ListCreditHistory,
  ListResponsible,
  NewResponsible,
  UpdateResponsible,
  UpdateProduct,
  ListJustificationType,
  NewJustificationType,
  UpdateJustificationType,
  Holiday,
} from "pages";
import {
  ListTransitTime,
  CreateTransitTime,
  UpdateTransitTime,
} from "pages/Comex";
import { PrivateRoute } from "routes/PrivateRoute";
import {
  CreateClient,
  ListClients,
  UpdateClient,
} from "pages/General/Configurador/clients";
import { RouterProps } from "contracts";
import {
  CreateTransitTime as CreateTTransitTime,
  ListTransitTimes as ListTTransitTimes,
  UpdateTransitTime as UpdateTTransitTime,
} from "pages/General/Configurador/transitTimes";

import { ListCompanies } from "@/pages/General/Configurador/companies/ListCompanies";
import { CreateCompany } from "@/pages/General/Configurador/companies";

import { Suppliers } from "@/pages/General/Configurador/suppliers/listSuppliers";
import { CreateSupplier } from "@/pages/General/Configurador/suppliers/createSupplier";
import { EditSupplier } from "@/pages/General/Configurador/suppliers/editSupplier";

export const configRoutes = ({}: RouterProps): RouteObject => {
  return {
    path: "",
    element: <Outlet />,
    children: [
      {
        path: "users",
        element: <PrivateRoute Element={Users} action="LISTUSER" />,
      },
      {
        path: "users/novo",
        element: (
          <PrivateRoute
            Element={NewUser}
            action={[
              "CREATEUSER",
              "LISTROLE",
              "LISTCOMPANY",
              "LISTRESPONSIBLE",
            ]}
          />
        ),
      },
      {
        path: "users/update/:id",
        element: (
          <PrivateRoute
            Element={UpdateUser}
            action={[
              "UPDATEUSER",
              "LISTROLE",
              "LISTCOMPANY",
              "LISTRESPONSIBLE",
            ]}
          />
        ),
      },
      {
        path: "users/delete/:id",
        element: <PrivateRoute Element={DeleteUser} action={["DELETEUSER"]} />,
      },
      {
        path: "users/impersonate/:id",
        element: (
          <PrivateRoute Element={ImpersonateUser} action={["DELETEUSER"]} />
        ),
      },
      {
        path: "roles",
        element: <PrivateRoute Element={Roles} action="LISTROLE" />,
      },
      {
        path: "roles/novo",
        element: (
          <PrivateRoute
            Element={NewRole}
            action={["CREATEROLE", "LISTACTION"]}
          />
        ),
      },
      {
        path: "roles/update/:id",
        element: (
          <PrivateRoute
            Element={UpdateRole}
            action={["UPDATEROLE", "LISTACTION"]}
          />
        ),
      },
      {
        path: "alert-types",
        element: (
          <PrivateRoute Element={ListAlertTypes} action="LISTALERTTYPE" />
        ),
      },
      {
        path: "alert-types/novo",
        element: (
          <PrivateRoute
            Element={NewAlertType}
            action={["CREATEALERTTYPE", "LISTROLE"]}
          />
        ),
      },
      {
        path: "alert-types/update/:id",
        element: (
          <PrivateRoute
            Element={UpdateAlertType}
            action={["UPDATEALERTTYPE", "LISTROLE"]}
          />
        ),
      },
      {
        path: "alert-types/delete/:id",
        element: (
          <PrivateRoute
            Element={DeleteAlertType}
            action={["DELETEALERTTYPE", "LISTROLE"]}
          />
        ),
      },
      {
        path: "carriers",
        element: <PrivateRoute Element={ListCarriers} action="LISTCARRIER" />,
      },
      {
        path: "carriers/new",
        element: (
          <PrivateRoute Element={CreateCarrier} action="CREATECARRIER" />
        ),
      },
      {
        path: "carriers/:id",
        element: (
          <PrivateRoute Element={UpdateCarrier} action="UPDATECARRIER" />
        ),
      },
      {
        path: "clients",
        element: <PrivateRoute Element={ListClients} action="LISTCLIENT" />,
      },
      {
        path: "clients/new",
        element: <PrivateRoute Element={CreateClient} action="CREATECLIENT" />,
      },
      {
        path: "clients/:id",
        element: <PrivateRoute Element={UpdateClient} action="UPDATECLIENT" />,
      },
      {
        path: "tracking-transit-times",
        element: (
          <PrivateRoute Element={ListTTransitTimes} action="LISTTTRANSITTIME" />
        ),
      },
      {
        path: "tracking-transit-times/new",
        element: (
          <PrivateRoute
            Element={CreateTTransitTime}
            action="CREATETTRANSITTIME"
          />
        ),
      },
      {
        path: "tracking-transit-times/:id",
        element: (
          <PrivateRoute
            Element={UpdateTTransitTime}
            action="UPDATETTRANSITTIME"
          />
        ),
      },
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
        path: "products",
        element: (
          <PrivateRoute
            Element={ListProducts}
            action={["LISTPRODUCT", "LISTRESPONSIBLE"]}
          />
        ),
      },
      {
        path: "credit-history",
        element: (
          <PrivateRoute
            Element={ListCreditHistory}
            action="LISTCREDITHISTORY"
          />
        ),
      },
      {
        path: "responsible",
        element: (
          <PrivateRoute Element={ListResponsible} action="LISTRESPONSIBLE" />
        ),
      },
      {
        path: "responsible/novo",
        element: (
          <PrivateRoute Element={NewResponsible} action="CREATERESPONSIBLE" />
        ),
      },
      {
        path: "responsible/update/:id",
        element: (
          <PrivateRoute
            Element={UpdateResponsible}
            action="UPDATERESPONSIBLE"
          />
        ),
      },
      {
        path: "products/update/:id",
        element: (
          <PrivateRoute Element={UpdateProduct} action="UPDATEPRODUCT" />
        ),
      },
      {
        path: "justification-type",
        element: (
          <PrivateRoute
            Element={ListJustificationType}
            action="LISTJUSTIFICATIONTYPE"
          />
        ),
      },
      {
        path: "justification-type/novo",
        element: (
          <PrivateRoute
            Element={NewJustificationType}
            action="CREATEJUSTIFICATIONTYPE"
          />
        ),
      },
      {
        path: "justification-type/update/:id",
        element: (
          <PrivateRoute
            Element={UpdateJustificationType}
            action="UPDATEJUSTIFICATIONTYPE"
          />
        ),
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
        path: "transit-time",
        element: (
          <PrivateRoute Element={ListTransitTime} action="LISTTRANSITTIME" />
        ),
      },
      {
        path: "transit-time/novo",
        element: (
          <PrivateRoute
            Element={CreateTransitTime}
            action="CREATETRANSITTIME"
          />
        ),
      },
      {
        path: "transit-time/update/:id",
        element: (
          <PrivateRoute
            Element={UpdateTransitTime}
            action="UPDATETRANSITTIME"
          />
        ),
      },
      {
        path: "companies",
        element: (
          <PrivateRoute Element={ListCompanies} action="COMPANIES.INDEX" />
        ),
      },
      {
        path: "companies/new",
        element: (
          <PrivateRoute Element={CreateCompany} action="COMPANIES.INDEX" />
        ),
      },
      {
        path: "companies/:id",
        element: <PrivateRoute Element={CreateCompany} action="LISTCARRIER" />,
      },
      {
        path: "suppliers",
        element: <PrivateRoute Element={Suppliers} action="LISTSUPPLIER" />,
      },
      {
        path: "suppliers/novo",
        element: (
          <PrivateRoute Element={CreateSupplier} action="LISTSUPPLIER" />
        ),
      },
      {
        path: "suppliers/edit/:id",
        element: <PrivateRoute Element={EditSupplier} action="LISTSUPPLIER" />,
      },
      {
        path: "holidays/",
        element: <PrivateRoute Element={Holiday.List} action={"LISTHOLIDAY"}/>
      },
      {
        path: "holidays/:id",
        element: <PrivateRoute Element={Holiday.Update} action={"UPDATEHOLIDAY"}/>
      },
      {
        path: "holidays/novo",
        element: <PrivateRoute Element={Holiday.Create} action={"CREATEHOLIDAY"}/>
      },
      {
        path: "holidays/delete/:id",
        element: <PrivateRoute Element={Holiday.Delete} action={"DELETEHOLIDAY"}/>
      }
    ],
  };
};
