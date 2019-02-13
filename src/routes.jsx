import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import  { Upload }  from './components/Upload';
import  { withAuth } from './components/withAuth';
const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route path="/upload" component={Upload}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/auth" component={withAuth}></Route>
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
