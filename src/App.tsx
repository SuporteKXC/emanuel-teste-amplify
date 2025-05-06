import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store, persistor } from 'store';
import GlobalStyles from 'styles/global';
import { ProductionApiAlert, HomologAlert } from 'components/Development';
import AppRoutes from './routes';

toast.configure();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ProductionApiAlert />
      <HomologAlert />
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <GlobalStyles />
          <AppRoutes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
