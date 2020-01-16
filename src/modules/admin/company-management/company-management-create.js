import React, { Component } from "react";
import history from "../../../config/history";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import CompanyManagementForm from "./company-management-form";
import { withSetting } from "../../../shared/context";

class CompanyManagementCreate extends Component {
  saveEntity = async item => {
    const { firebase } = this.props.context;

    let saveSuccess = await firebase.getService('company').createItem(item, this.props.context.auth.user.uid);

    if( saveSuccess) {
      history.push(ROUTES_CONSTANTS.COMPANY.index());
    }
  };

  render() {
    return (
      <CompanyManagementForm title={"Crear Compania"} saveEntity={this.saveEntity} />
    );
  }
}

export default withSetting(CompanyManagementCreate);
