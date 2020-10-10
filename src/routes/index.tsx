import React from 'react';
import { Switch } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Route from './Route';
import Dashboard from '../pages/Dashboard';
import Edit from '../pages/Edit';
import Create from '../pages/Create';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/create" component={Create} isPrivate />
    <Route path="/edit/:id" component={Edit} isPrivate />
  </Switch>
);

export default Routes;
