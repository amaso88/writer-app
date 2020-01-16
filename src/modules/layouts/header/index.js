import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink,} from "reactstrap";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import { handleLink } from "../../../shared/util/link-utils";
import "../../../index.css"

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
  render() {
    const { isAuthenticated } = this.props;
    console.log(isAuthenticated)
    if (!isAuthenticated) return null;
    const homeRoute = ROUTES_CONSTANTS.HOME;
    const companiesRoute = ROUTES_CONSTANTS.COMPANY.index();
    const productLinesRoute = ROUTES_CONSTANTS.PRODUCT_LINE.index();
    const brandRoute = ROUTES_CONSTANTS.BRAND.index();
    const productRoute = ROUTES_CONSTANTS.PRODUCT.index();
    return (
      <Navbar fixed="top" className="navbar fixed-top bg-white text-dark text-uppercase navbar-home" expand="lg">
        <NavbarBrand href={homeRoute} onClick={e => handleLink(e, homeRoute)}>
          Writter App Management
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} >
            <div className="item-toggler"/>
            <div className="item-toggler"/>
            <div className="item-toggler"/>
        </NavbarToggler>
        <Collapse id="basic-navbar-nav" isOpen={this.state.isOpen} navbar >
          <Nav className="nav-header" navbar>
            <NavLink href={homeRoute} onClick={e => handleLink(e, homeRoute)}>
              Home
            </NavLink>
            <NavLink
              href={companiesRoute}
              onClick={e => handleLink(e, companiesRoute)}
            >
              Compa&ntilde;ias
            </NavLink>
            <NavLink
              href={productLinesRoute}
              onClick={e => handleLink(e, productLinesRoute)}
            >
              Linea de productos
            </NavLink>
            <NavLink
              href={brandRoute}
              onClick={e => handleLink(e, brandRoute)}
            >
              Marca
            </NavLink>
            <NavLink
              href={productRoute}
              onClick={e => handleLink(e, productRoute)}
            >
              Productos
            </NavLink>
            <NavLink //Poner a la derecha
              href="/logout"
              onClick={e => {
                e.preventDefault();
                this.props.logout();
              }}
            >
              Cerrar sessi&oacute;n
            </NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
