import { SalesAlerts } from "@/pages/TrackingDelivery/Sales/Alerts";
import { Sales } from "@/pages/TrackingDelivery/Sales/List";
import type { RouterProps } from "contracts";
import { Outlet, RouteObject } from "react-router-dom";

export const salesRoutes = ({}: RouterProps): RouteObject => ({
  path: "sales",
  element: <Outlet />,
  children: [
    {
      path: "",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: <Sales />,
        },
        {
          path: "alerts",
          element: <SalesAlerts />,
        }
      ],
    },
  ],
});
