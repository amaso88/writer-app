import React, { Component } from "react";
import ProductLineManagementForm from "./product-line-management-form";
import history from "../../../config/history";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import { withSetting } from "../../../shared/context";

class ProductLineManagementCreate extends Component {
  state = {
    companies: []
  };

  async componentDidMount() {
    const { firebase } = this.props.context;
    const companies = await firebase.getService("company").getAll();

    this.setState({ companies });
  }

  saveEntity = async item => {
    const { firebase } = this.props.context;

    let saveSuccess = await firebase.getService('productLine').createItem(item, this.props.context.auth.user.id);

    if( saveSuccess) {
      history.push(ROUTES_CONSTANTS.PRODUCT_LINE.index());
    }
  };

  render() {
    return (
      <ProductLineManagementForm
        title={"Crear linea de productos"}
        saveEntity={this.saveEntity}
        companies={this.state.companies}
      />
    );
  }
}

export default withSetting(ProductLineManagementCreate);
