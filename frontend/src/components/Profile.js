import { Box, Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
class Profile extends React.Component {
  render() {
    return (
      <Box>
        <div className="page-header">
          <Typography className="page-header">Profile</Typography>
        </div>
        <div className="profile">
          <div className="profile-content">
            <Typography style={{ fontWeight: "bold" }}>Name:</Typography>
            <Typography>{this.props.name}</Typography>
          </div>
          <div className="profile-content">
            <Typography style={{ fontWeight: "bold" }}>Email:</Typography>
            <Typography>{this.props.email}</Typography>
          </div>
          <div className="profile-content">
            <Typography style={{ fontWeight: "bold" }}>Role:</Typography>
            <Typography style={{ textTransform: "capitalize" }}>{this.props.role.toLowerCase()}</Typography>
          </div>
        </div>
      </Box>
    );
  }
}

export default connect(({ auth }) => ({ ...auth }), {})(Profile);
