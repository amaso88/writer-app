import React, { Component } from "react";
import history from "../../../config/history";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import CompanyManagementForm from "./company-management-form";
import Loading from "../../layouts/loading";
import { withSetting } from "../../../shared/context";

class CompanyManagementEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      item: null
    };
  }

  async componentDidMount() {
    const { firebase } = this.props.context;
    this.setState({ loading: true });
    let uid = this.props.match.params.id;

    let item = await firebase.getService("company").getItem(uid);
    this.setState({
      item,
      loading: false
    });
  }

  saveEntity = async item => {
    const { firebase } = this.props.context;

    let uid = this.props.match.params.id;

    let updateSuccess = await firebase
      .getService("company")
      .updateItem(item, uid);

    if (updateSuccess) {
      history.push(ROUTES_CONSTANTS.COMPANY.index());
    }
  };

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <CompanyManagementForm
        title={"Actualizar compania"}
        saveEntity={this.saveEntity}
        item={this.state.item}
      />
    );
  }
}

export default withSetting(CompanyManagementEdit);
