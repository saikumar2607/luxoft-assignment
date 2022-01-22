import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";

export default class AuthRouter extends Component {
  render() {
    return (
      <div className="auth">
        <Switch>
          <Route path={"/login"} component={Login} />
          {<Route path={"/"} exact /> && <Redirect to={"/login"} />}
        </Switch>
      </div>
    );
  }
}
