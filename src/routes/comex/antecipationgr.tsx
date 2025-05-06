import type { RouterProps } from "contracts";
import { AntecipationGr } from "pages/Comex/Dashboard/AntecipationGr";
import { Outlet, RouteObject } from "react-router-dom";

export const antecipationgrRoutes = ({}: RouterProps): RouteObject => ({
  path: "antecipationgr",
  element: <Outlet />,
  children: [
    {
      path: "",
      element: <AntecipationGr />,
    },
  ],
});