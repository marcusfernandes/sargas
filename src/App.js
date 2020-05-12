import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '~/styles/global';

import AppProvider from '~/contexts';
import Routes from '~/routes';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
        <GlobalStyles />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
