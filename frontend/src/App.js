import "./App.scss";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Loading from "./components/utils/Loading";
import RootRouter from "./RootRouter";
import AuthRouter from "./AuthRouter";

const SwitchRouter = ({ tokenExists }) => {
  if (tokenExists) {
    return (
      <Route
        path="/"
        render={(routerProps) => {
          return <RootRouter {...routerProps} />;
        }}
      />
    );
  }
  return (
    <Route
      path="/"
      render={(routerProps) => {
        return <AuthRouter {...routerProps} />;
      }}
    />
  );
};

function App(props) {
  const { token } = props;
  return (
    <BrowserRouter>
      <SwitchRouter tokenExists={!!token} />
      {props.loader ? <Loading /> : ""}
      {props.toaster ? (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={props.toaster ? true : false}
          autoHideDuration={3000}
        >
          <Alert variant="filled" severity={props.severity || "error"}>
            {props.errorMessage || `Something went wrong`}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </BrowserRouter>
  );
}

export default connect(({ auth, loaders }) => {
  const { token } = auth;
  return {
    token,
    ...loaders
  };
})(App);
