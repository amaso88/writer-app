import React from "react";
import history from "../../config/history";
import { ROUTES_CONSTANTS } from "../../config/routes-constants";
import { withSetting } from "../context";
import { isAdmin, ROLES } from "./auth-data";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.props.context.firebase.auth.onAuthStateChanged(function(authUser) {
        if( !authUser) {
          history.push(ROUTES_CONSTANTS.AUTH.LOGIN);
          return;
        }
        const user = {
          username: authUser.displayName,
          email: authUser.email,
          roles: isAdmin(authUser.email) ? ROLES.ADMIN : ROLES.WRITTER
        };
        if (!condition(user)) {
          history.push(ROUTES_CONSTANTS.AUTH.LOGIN);
        }
      });
    }

    render() {
      // if (this.props.context.auth.user === null) return null;
      return <Component {...this.props} />;
    }
  }
  return withSetting(WithAuthorization);
};
export default withAuthorization;
