import { ListAlerts } from "@/pages";
import { TrackingDeliveryDetail } from "@/pages/TrackingDelivery/Detail";
import type { RouterProps } from "contracts";
import { TrackingDelivery } from "pages/TrackingDelivery/List";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import {
  configRoutes,
  operationalRoutes,
  panelsRoutes,
  alertsRoutes,
  // antecipationgrRoutes,
  comexConfigRoutes,
  snapshotRoutes,
  trackingRoutes,
  documentRoutes,
  salesRoutes,
  dashboardRoutes,
  exportRoutes
} from "routes";
import { orderFilesRoutes } from "./comex/orderfiles";

import { orderReportRoutes } from "./comex/orderReport";

import { exportOrderReportRoutes } from "./comex/exportOrderReport";


export const routes = (props: RouterProps): RouteObject[] => {
  const { location } = props;
  return [
    {
      path: "/",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: <Outlet />,
          children: [
            {
              path: "/",
              element: null,
            },
          ],
        },
        {
          path: "comex",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <Navigate to="importation" state={{ from: location }} />,
            },
            {
              path: "export",
              element: <Outlet />,
              children: [
                {
                  path: "",
                  element: <Navigate to={'operacional'}/>

                },
                exportRoutes(props),
                exportOrderReportRoutes(props)
              ],
            },
            {
              path: "importation",
              element: <Outlet />,
              children: [
                {
                  path: "",
                  element: (
                    <Navigate to="operacional" state={{ from: location }} />
                  ),
                },
                orderFilesRoutes(props),
                operationalRoutes(props),
                panelsRoutes(props),
                alertsRoutes(props),
                // antecipationgrRoutes(props),
                dashboardRoutes(props),
                orderReportRoutes(props)
              ],
            },
          ],
        },
        {
          path: "config",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <Navigate to="roles" state={{ from: location }} />,
            },
            configRoutes(props),
          ],
        },
        {
          path: "management",
          element: <Outlet />,
          children: [snapshotRoutes(props), trackingRoutes(props)],
        },
        {
          path: "tracking-delivery",
          element: <Outlet />,
          children: [documentRoutes(props), salesRoutes(props)],
        },
        {
          path: "alerts",
          element: <Outlet />,
          children:[{
            path: ":module",
            element: <ListAlerts/>
          }]
        }
      ],
    },
    // Seria bom que este fosse a uma page 404
    {
      path: "*",
      element: <Navigate to="/" state={{ from: location }} />,
    },
  ];
};
