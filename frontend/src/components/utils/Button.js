import React from "react";
import { Button } from "@material-ui/core";

export default function CustomButton(props) {
  return (
    <Button
      className={"btn".concat(props.color ? "" : " btnPrimaryColor").concat(` ${props.className || ""}`)}
      onClick={props.onClick}
      style={{
        opacity: props.disalbed ? 0.5 : 1,
        borderRadius: 5,
        marginTop: 24,
        marginBottom: 16,
        ...props.styles
      }}
      type="submit"
      fullWidth
      variant={props.variant || "contained"}
      color={props.color || "primary"}
      {...props}
    >
      {props.label || "Submit"}
    </Button>
  );
}
