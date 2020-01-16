import React, { Component } from "react";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import ProductManagementForm from "./product-management-form";
import history from "../../../config/history";
import { withSetting } from "../../../shared/context";

class ProductManagementCreate extends Component {
  state = {
    companies: []
  };

  saveEntity = async item => {
    const { firebase } = this.props.context;

    let saveSuccess = await firebase
      .getService("product")
      .createItem(item, this.props.context.auth.user.id);

    if (saveSuccess) {
      history.push(ROUTES_CONSTANTS.PRODUCT.index());
    }
  };

  async componentDidMount() {
    const { firebase } = this.props.context;
    const companies = await firebase.getService("company").getAll();

    this.setState({ companies });
  }

  render() {
    return (
      <ProductManagementForm
        title={"Crear Producto"}
        saveEntity={this.saveEntity}
        companies={this.state.companies}
      />
    );
  }
}

export default withSetting(ProductManagementCreate);
