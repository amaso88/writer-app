import React, { Component } from "react";
import history from "../../../config/history";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import BrandManagementForm from "./brand-management-form";
import { withSetting } from "../../../shared/context";

class BrandManagementCreate extends Component {
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

    let saveSuccess = await firebase
      .getService("brand")
      .createItem(item, this.props.context.auth.user.id);

    if (saveSuccess) {
      history.push(ROUTES_CONSTANTS.BRAND.index());
    }
  };

  render() {
    return (
      <BrandManagementForm
        title={"Crear Marca"}
        saveEntity={this.saveEntity}
        companies={this.state.companies}
      />
    );
  }
}

export default withSetting(BrandManagementCreate);
