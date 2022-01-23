import React from "react";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      color: theme.palette.common.red
    }
  }
}));
export default function CustomTextField(props) {
  const classes = useStyles();
  return (
    <div>
      <TextField
        variant="outlined"
        size="medium"
        className={classes.error}
        margin="normal"
        {...props}
        fullWidth={props.fullWidth === false ? false : true}
        type={props.type || "text"}
      />
    </div>
  );
}
