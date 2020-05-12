import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '~/pages/Login';
import RecoveryPassword from '~/pages/Password/RecoveryPassword';
import ResetPassword from '~/pages/Password/ResetPassword';
import Dashboard from '~/pages/Dashboard';
import User from '~/pages/User';
import Profile from '~/pages/User/Profile';

export default function Routes() {
  return (
    <Switch>
      {/* Not authenticaded routes */}
      <Route path="/" exact component={Login} />
      <Route path="/solicitar-recuperacao" component={RecoveryPassword} />
      <Route path="/recuperar-senha" component={ResetPassword} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/usuarios/:page?" component={User} isPrivate />
      <Route path="/perfil" component={Profile} isPrivate />
    </Switch>
  );
}
