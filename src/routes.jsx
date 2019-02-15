import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from './components/Login';
import Signup from './components/Signup';
import  { Upload }  from './components/Upload';
const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <Route path="/upload" component={Upload}></Route>
        <Route path="/" component={Signup}></Route>
      </Switch>
    </Fragment>
  </Router>
)

export default Routes;
