import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Profile from "./components/Profile";
import Users from "./components/Users";
import NavBar from "./components/utils/NavBar";
export default class RootRouter extends Component {
  render() {
    return (
      <div className="auth">
        <NavBar {...this.props} />
        <div style={{ marginTop: 65 }}>
          <Switch>
            <Route path={"/profile"} component={Profile} />
            <Route path={"/users"} component={Users} />
          </Switch>
        </div>
      </div>
    );
  }
}
