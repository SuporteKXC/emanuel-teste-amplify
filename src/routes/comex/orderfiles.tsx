import { RouterProps } from "@/contracts";
import { Outlet, RouteObject } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { OrderFiles } from "@/pages";
import { CreateOrderFile } from "@/pages/Comex/OrderFiles/Create";
import { UpdateOrderFile } from "@/pages/Comex/OrderFiles/Update";

export const orderFilesRoutes = (props: RouterProps): RouteObject => ({
    path: 'documentos',
    element: <PrivateRoute Element={Outlet} action={["LISTORDERITEM", "LISTRESPONSIBLE"]}/>,
    children: [
        {
            path: '',
            element: <OrderFiles />,
        },
        {
            path: 'criar',
            element: <CreateOrderFile />
        },
        {
            path: ':id',
            element: <UpdateOrderFile />
        }
    ],
})