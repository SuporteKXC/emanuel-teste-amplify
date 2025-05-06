import type { RouterProps } from "contracts";
import { Outlet, RouteObject } from "react-router-dom";
import { Divergence, Snapshot, Dashboard, Transfer } from "pages/Management";
import { DivergenceContextProvider } from "contexts/DivergenceContext";
import { PrivateRoute } from "routes/PrivateRoute";
import { TransferDetail } from "pages/Management/Snapshot/Transfer/Detail";


export const snapshotRoutes = ({}: RouterProps): RouteObject => ({
  path: "snapshot",
  element: <PrivateRoute Element={Outlet} action={["LISTSNAPSHOTS"]}/>,
  children: [
    {
      path: "",
      element: <Snapshot />,
    },
    {
      path: "divergences",
      element: (
        <DivergenceContextProvider>
          <Divergence />
        </DivergenceContextProvider>
      ),
    },
    {
      path: "dashboard",
      element: <Dashboard/>
    }
  ],
});
