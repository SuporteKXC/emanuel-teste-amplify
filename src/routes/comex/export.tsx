import { Outlet, RouteObject } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { RouterProps } from "@/contracts";
import { OperacionalItem } from "@/pages/ComexExport/OperacionalItem";
import { ShowExportOrderIten } from "@/pages/ComexExport/OperacionalItem/Detail";
import DashboardRender from "@/components/DashboardRender";

export const exportRoutes = ({}: RouterProps): RouteObject => ({
  path: "",
  element: <PrivateRoute Element={Outlet} action={[]} />,
  children: [
    {
      path: "operacional",
      element: <OperacionalItem />,
    },
    {
      path: "operacional/:id",
      element: <ShowExportOrderIten />,
    },
    {
      path: "operacional-item",
      element: <OperacionalItem />,
    },
    {
      path: "operacional-item/:id",
      element: <ShowExportOrderIten />,
    },
    {
      path: "dashboard/:dashboardPageUrl",
      element: <DashboardRender moduleId={6} />,
    },
  ],
});
