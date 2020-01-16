import React, { Component } from "react";
import history from "../../../config/history";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import ProductManagementForm from "./product-management-form";
import { withSetting } from "../../../shared/context";

class ProductManagementEdit extends Component {
  state = {
    product: null,
    companies: []
  };

  saveEntity = async item => {
    const { firebase } = this.props.context;

    let uid = this.props.match.params.id;

    let updateSuccess = await firebase
      .getService("product")
      .updateItem(item, uid);

    if (updateSuccess) {
      history.push(ROUTES_CONSTANTS.PRODUCT.index());
    }
  };

  async componentDidMount() {
    const { firebase } = this.props.context;
    let uid = this.props.match.params.id;
    const product = await firebase.getService("product").getItem(uid);
    const companies = await firebase.getService("company").getAll();

    this.setState({ companies, product });
  }

  render() {
    return (
      this.state.product && (
        <ProductManagementForm
          title={"Actualizar Producto"}
          saveEntity={this.saveEntity}
          item={this.state.product}
          companies={this.state.companies}
        />
      )
    );
  }
}

export default withSetting(ProductManagementEdit);
