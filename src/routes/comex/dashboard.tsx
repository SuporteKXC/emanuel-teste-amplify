import DashboardRender from "@/components/DashboardRender";
import type { RouterProps } from "contracts";
import { Outlet, RouteObject } from "react-router-dom";

export const dashboardRoutes = ({}: RouterProps): RouteObject => {

  const routes = {
    path: "",
    element: < Outlet />,
    children: [
      { path: ':dashboardPageUrl', element: <DashboardRender moduleId={2} /> }
    ]
  }

  return routes
}
