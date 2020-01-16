import React, { Component } from "react";
import withAuthorization from "../../../shared/session/withAuthorization";
import ReportsAdmin from "./reports-admin";
import ReportUser from "./reports-user";

class HomePage extends Component {
  render() {
    console.log(this.props.context.auth.user);
    if (
      this.props.context.auth.user &&
      this.props.context.auth.user.roles === "admin"
    ) {
      return (
       <ReportsAdmin />
      );
    } else if (
      this.props.context.auth.user &&
      this.props.context.auth.user.roles === "writter"
    ) {
      return (
        <ReportUser />
      )
    } else {
      return <p>Estas presentando problemas con la red?</p>;
    }
  }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
