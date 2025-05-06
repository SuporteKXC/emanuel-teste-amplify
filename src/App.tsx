import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "routes";
import GlobalStyles from "styles/global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LoadScript } from "@react-google-maps/api";
import Overlay from "components/management/Tracking/Import/Detail/Overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const KEY = import.meta.env.VITE_GOOGLE_API_KEY_SINERGIA;

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ToastContainer />
          <BrowserRouter>
            <GlobalStyles />
            {KEY && (
              <LoadScript googleMapsApiKey={KEY} mapIds={["87412a572f003751"]}>
                <AppRoutes />
                <Overlay />
              </LoadScript>
            )}
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
