import { ApproveDeliveryVoucher } from "@/pages/TrackingDelivery/DeliveryVouchers/Approve";
import { CancelApproveDeliveryVoucher } from "@/pages/TrackingDelivery/DeliveryVouchers/CancelApprove";
import { DeliveryVoucherList } from "@/pages/TrackingDelivery/DeliveryVouchers/List";
import { RejectDeliveryVoucher } from "@/pages/TrackingDelivery/DeliveryVouchers/Reject";
import { UploadDeliveryVoucher } from "@/pages/TrackingDelivery/DeliveryVouchers/Upload";
import { DeliveryVoucherView } from "@/pages/TrackingDelivery/DeliveryVouchers/View";
import { TrackingDeliveryDetail } from "@/pages/TrackingDelivery/Detail";
import { TrackingDelivery } from "@/pages/TrackingDelivery/List";
import TrackingDeliveryReports from "@/pages/TrackingDelivery/TrackingDeliveryReports";
import type { RouterProps } from "contracts";
import { Outlet, RouteObject } from "react-router-dom";

export const documentRoutes = ({}: RouterProps): RouteObject => ({
  path: "",
  element: <Outlet />,
  children: [
    {
      path: "",
      element: <Outlet />,
      children: [
        {
          path: "",
          element: <TrackingDelivery />,
        },
        {
          path: "detail/:id",
          element: <TrackingDeliveryDetail />,
        },
        {
          path: "vouchers",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <DeliveryVoucherList />,
            },
            {
              path: "view/:fileName",
              element: <DeliveryVoucherView />,
            },
            {
              path: "approve/:id/:fileName",
              element: <ApproveDeliveryVoucher />,
            },
            {
              path: "cancel-approval/:id/:fileName",
              element: <CancelApproveDeliveryVoucher />,
            },
            {
              path: "reject/:id/:fileName",
              element: <RejectDeliveryVoucher />,
            },
            {
              path: "create/:id",
              element: <UploadDeliveryVoucher />,
            },
          ],
        },
        {
          path: "reports",
          element: <TrackingDeliveryReports />,
        },
      ],
    },
  ],
});
