import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

function AppProvider({ children }) {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
