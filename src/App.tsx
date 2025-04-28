import React from "react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css"
import "./config/ReactotronConfig";
import GlobalStyle from "./styles/global";
import { store, persistor } from "./store";
import { Routes } from "routes";
import Warden from "Warden";
toast.configure();

const App: React.FC = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Warden />
      <BrowserRouter basename="/base">
        <GlobalStyle />
        <Routes />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

export default App;
