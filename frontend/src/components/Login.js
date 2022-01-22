import React from "react";
import { connect } from "react-redux";
import { Paper, Typography } from "@material-ui/core";
import CustomTextField from "./utils/TextField";
import CustomButton from "./utils/Button";
import { EMAIL_REGEX } from "./utils/messages";
import { login } from "../store/actions/auth";
class Login extends React.Component {
  state = {
    email: { value: "", error: false, helperText: "" },
    password: { value: "", error: false, helperText: "" }
  };
  runValidators = () => {
    const { email, password } = this.state;
    let errors = {};
    if (!email.value) {
      errors = { ...errors, email: { value: email.value.trim(), error: true, helperText: "Email is required" } };
    } else {
      if (!EMAIL_REGEX.test(email.value)) {
        errors = {
          ...errors,
          email: { value: email.value.trim(), error: true, helperText: "Please enter valid email" }
        };
      }
    }
    if (!password.value) {
      errors = {
        ...errors,
        password: { value: password.value.trim(), error: true, helperText: "Password is required" }
      };
    }
    return errors;
  };
  onSubmit = (e) => {
    e.preventDefault();
    const erroredFields = this.runValidators();
    if (Object.keys(erroredFields).length) {
      this.setState({ ...this.state, ...erroredFields });
    } else {
      this.props.login({ email: this.state.email.value, password: this.state.password.value });
    }
  };
  render() {
    const { email, password } = this.state;
    return (
      <Paper className="login">
        <Typography style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>Login</Typography>
        <CustomTextField
          type="email"
          {...email}
          // value={email.value}
          // error={email.error}
          // helperText={email.helperText}
          label="Email"
          onChange={(e) =>
            this.setState({
              email: { ...this.state.email, value: e.target.value.trim(), error: false, helperText: "" }
            })
          }
        />
        <CustomTextField
          type="password"
          label="Password"
          value={password.value}
          error={password.error}
          helperText={password.helperText}
          onChange={(e) =>
            this.setState({
              password: { ...this.state.password, value: e.target.value.trim(), error: false, helperText: "" }
            })
          }
        />
        <CustomButton onClick={this.onSubmit} />
      </Paper>
    );
  }
}

export default connect(null, { login })(Login);
