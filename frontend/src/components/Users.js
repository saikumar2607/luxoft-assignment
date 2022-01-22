import { Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/actions/auth";

class Users extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    return (this.props.list || []).length ? (
      <div>
        <div className="page-header">
          <Typography className="page-header">User Details</Typography>
        </div>
        <table>
          <thead style={{ backgroundColor: "#b4cd32" }}>
            <tr>
              <td className="table-header">Name</td>
              <td className="table-header">Email</td>
              <td className="table-header">Role</td>
            </tr>
          </thead>
          <tbody>
            {(this.props.list || []).map((userObj) => (
              <tr>
                <td>{userObj.name}</td>
                <td>{userObj.email}</td>
                <td>{userObj.role.toLowerCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      ""
    );
  }
}
export default connect(({ users }) => ({ ...users }), { fetchUsers })(Users);
