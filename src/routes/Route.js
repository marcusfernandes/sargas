import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import api from '~/services/api';
import { useAuth } from '~/contexts/auth';

import DefaultLayout from '~/pages/_layout/default';
import AuthLayout from '~/pages/_layout/auth';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const sotarageToken = localStorage.getItem('@SGAuth:token');

  if (!sotarageToken && isPrivate) return <Redirect to="/" />;

  if (sotarageToken && !isPrivate) return <Redirect to="/dashboard" />;

  const Layout = sotarageToken ? DefaultLayout : AuthLayout;

  api.defaults.headers.Authorization = `bearer ${sotarageToken}`;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
