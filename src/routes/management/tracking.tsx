import type { RouterProps } from "contracts";
import { Outlet, RouteObject } from "react-router-dom";
import { Import, ImportDetail, Reports, Transfer, Complaint } from "pages/Management";
import { Dashboard } from "pages/Management/Tracking/Dashboard";
import { TransferDetail } from "pages/Management/Snapshot/Transfer/Detail";
import { NovoComplaint } from "@/pages/Management/Tracking/Complaint";
// import Complaint from "@/pages/Management/Tracking/Complaint";

export const trackingRoutes = ({}: RouterProps): RouteObject => ({
  path: "tracking",
  element: <Outlet />,
  children: [
    {
      path: "import",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: <Import />,
        },
        {
          path: "detail/:id",
          element: <ImportDetail />,
        },
      ],
    },
    {
      path: "reports",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: <Reports />,
        },
      ],
    },
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: "transfer",
      element: <Outlet/>,
      children: [
        {
          path: "",
          element: <Transfer />
        },
        {
          path: "detail/:id",
          element: <TransferDetail />
        }
      ]
    },
    {
      path: "complaint",
      element: <Outlet/>,
      children: [
        {
          path: "",
          element: <Complaint />
        },
        {
          path: "new",
          element: <NovoComplaint />
        },
        {
          path: "new?order=:orderId&product=:productId",
          element: <NovoComplaint />
        },
        {
          path: "new/:id",
          element: <NovoComplaint />
        }
      ]
    }
  ],
});
