import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Container,
  Row
} from "reactstrap";

import logo from "../../../logo.svg";
import history from "../../../config/history";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import { withSetting } from "../../../shared/context";

class LoginPage extends Component {
  state = {
    error: null
  };

  loginWithGoogle = async () => {
    const { firebase } = this.props.context;
    const socialAuthUser = await firebase.getService("auth").loginWithGoogle();
    const existUser = await firebase
      .getService("user")
      .getItem(socialAuthUser.id);
    const user = {
      username: socialAuthUser.username,
      email: socialAuthUser.email,
      id: socialAuthUser.id,
      roles: socialAuthUser.roles
    };
    console.log(user)
    if (!existUser) {
      await firebase.getService("user").createItem(user, socialAuthUser.id);
    }
    this.props.context.auth.setUser(user);
    history.push(ROUTES_CONSTANTS.HOME);
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center pt-5">          
          <Card border="default" style={{ width: "18rem" }}>
            <CardImg variant="top" src={logo} />
            <CardBody className="justify-content-center">
              <CardTitle className="text-center">
                Autenticaci&oacute;n
              </CardTitle>
              <Button className="btn-login" onClick={this.loginWithGoogle}>
                Login With Google
              </Button>
            </CardBody>
          </Card>
        </Row>
      </Container>
    );
  }
}

export default withSetting(LoginPage);
