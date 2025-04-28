import Stocks from "pages/Wms/Stocks";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import PendingStocks from "pages/Wms/PendingStocks";
import StocksMovement from "pages/Wms/StocksMovement";
import StocksDashboard from "pages/Wms/Dashboard";

export const WmsRoutes: React.FC = () => {
    return (
      <Switch>
        <PrivateRoute exact path="/wms" component={Stocks} />
        <PrivateRoute exact path="/wmsPending" component={PendingStocks} />
        <PrivateRoute exact path="/wmsMovement" component={StocksMovement} />
        <PrivateRoute exact path="/wmsDashboard" component={StocksDashboard} />
      </Switch>
    );
  };
  