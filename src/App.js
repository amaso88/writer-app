import React, { Component } from "react";
import { Router } from "react-router-dom";
import { Container } from "reactstrap";
import history from "./config/history";
import Routes from "./routes";
import Header from "./modules/layouts/header";
import Footer from "./modules/layouts/footer";
import { ROUTES_CONSTANTS } from "./config/routes-constants";
import { withSetting } from "./shared/context";
import { isAdmin, ROLES } from "./shared/session/auth-data";
//import CKEditorWidget from "./modules/layouts/ckeditor";

class App extends Component {
  componentDidMount = () => {
    this.props.context.firebase.auth.onAuthStateChanged(authUser => {
      if( !authUser) return;
      const user = {
        username: authUser.displayName,
        email: authUser.email,
        id: authUser.uid,
        roles: isAdmin(authUser.email) ? ROLES.ADMIN : ROLES.WRITTER
      };
      this.props.context.auth.setUser(user);
      this.forceUpdate();
    });
  };

  logoutWithGoogle = () => {
    this.props.context.firebase.logout().then(() => {
      this.props.context.auth.setUser(null);
      this.forceUpdate();
      history.push(ROUTES_CONSTANTS.AUTH.LOGIN);
    });
  };

  render() {
    const { isAuthenticated } = this.props.context.auth;
    console.log(this.props.context);
    console.log("isAuthenticated");
    console.log(isAuthenticated);
    return (
      <>
        <Container fluid style={{ paddingTop: "60px" }} className="app">
          <Router history={history}>
            <>
              <Header
                isAuthenticated={isAuthenticated}
                logout={this.logoutWithGoogle}
              />
              <Routes isAuthenticated={isAuthenticated} />
            </>
          </Router>
        </Container>
        <Footer isAuthenticated={true} logout={this.logoutWithGoogle} />
      </>
    );
  }
}

export default withSetting(App);
