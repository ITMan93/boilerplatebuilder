import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Library from 'containers/Library';
import Documents from 'containers/Documents';
import Dashboard from 'containers/Dashboard';
import LogIn from 'containers/LogIn';
import { userIsNotAuthenticatedRedir, userIsAuthenticatedRedir } from 'utils/authHelper';

const Routes = () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="documents" />
      <Route exact path="/library" component={userIsAuthenticatedRedir(Library)} />
      <Route exact path="/documents" component={userIsAuthenticatedRedir(Documents)} />
      <Route exact path="/support" component={userIsAuthenticatedRedir(Dashboard)} />
      <Route path="/login" component={userIsNotAuthenticatedRedir(LogIn)} />
    </Switch>
  </Router>
);

export default Routes;
