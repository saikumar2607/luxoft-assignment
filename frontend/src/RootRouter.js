import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";

export default class RootRouter extends Component {
  render() {
    return (
      <div className="auth">
        <Switch>
          <Route path={"/profile"} component={Profile} />
          <Route path={"/user-list"} />
        </Switch>
      </div>
    );
  }
}
