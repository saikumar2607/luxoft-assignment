import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
// import TemporaryDrawer from './side-menu';
import { PowerSettingsNew } from "@material-ui/icons";
import { Tooltip, AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function Navbar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className="appPrimaryColor">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Luxoft Test
          </Typography>
          {props.token ? (
            <div style={{ display: "flex" }}>
              <Typography variant="h6" className={classes.title} style={{ marginTop: 8, marginRight: 50 }}>
                <span onClick={() => props.history.push("/profile")} style={{ cursor: "pointer" }}>
                  Profile
                </span>
              </Typography>
              {props.role === "ADMIN" ? (
                <Typography variant="h6" className={classes.title} style={{ marginTop: 8, marginRight: 40 }}>
                  <span onClick={() => props.history.push("/users")} style={{ cursor: "pointer" }}>
                    Users
                  </span>
                </Typography>
              ) : (
                ""
              )}
              <Tooltip title="Logout" aria-label="add">
                <IconButton
                  title="Logout"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={props.onLogout}
                  color="inherit"
                >
                  <PowerSettingsNew />
                </IconButton>
              </Tooltip>
            </div>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

class MenuAppBar extends React.Component {
  onLogout = () => {
    this.props.logout();
  };
  render() {
    return <Navbar {...this.props} onLogout={this.onLogout} />;
  }
}
export default connect(({ auth }) => ({ ...auth }), { logout })(MenuAppBar);
