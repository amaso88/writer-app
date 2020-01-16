import React, { Component } from "react";
import ProductLineManagementForm from "./product-line-management-form";
import history from "../../../config/history";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import Loading from "../../layouts/loading";
import { withSetting } from "../../../shared/context";

class ProductLineManagementEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      item: null,
      companies: []
    };
  }

  async componentDidMount() {
    const { firebase } = this.props.context;
    this.setState({ loading: true });
    let uid = this.props.match.params.id;

    let item = await firebase.getService("productLine").getItem(uid);
    const companies = await firebase.getService("company").getAll();
    this.setState({
      item,
      loading: false,
      companies
    });
  }

  saveEntity = async item => {
    const { firebase } = this.props.context;

    let uid = this.props.match.params.id;

    let updateSuccess = await firebase
      .getService("productLine")
      .updateItem(item, uid);

    if (updateSuccess) {
      history.push(ROUTES_CONSTANTS.PRODUCT_LINE.index());
    }
  };

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <ProductLineManagementForm
        title={"Actualizar linea de productos"}
        saveEntity={this.saveEntity}
        item={this.state.item}
        companies={this.state.companies}
      />
    );
  }
}

export default withSetting(ProductLineManagementEdit);
