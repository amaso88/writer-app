import React, { Component } from "react";
import { Container, Jumbotron } from "reactstrap";
import { withSetting } from "../../../shared/context";
import Loading from "../../layouts/loading";

class ReportUser extends Component {
  state = {
    loading: false,
    totalBrand: 0,
    totalProduct: 0,
    totalProductLine: 0
  };
  async componentDidMount() {
      this.setState({...this.state, loading: true})
    const { firebase } = this.props.context;
    const totalBrand = await firebase.getService("brand").getCountAll({
      orderByChild: "createdBy",
      equalTo: this.props.context.auth.user.id
    });
    const totalProduct = await firebase.getService("product").getCountAll({
      orderByChild: "createdBy",
      equalTo: this.props.context.auth.user.id
    });
    const totalProductLine = await firebase
      .getService("productLine")
      .getCountAll({
        orderByChild: "createdBy",
        equalTo: this.props.context.auth.user.id
      });

    this.setState({
      totalBrand,
      totalProduct,
      totalProductLine,
      loading: false
    });
  }

  render() {
    return (
      <Container>
        <Jumbotron fluid>
          <Container fluid>              
            <h2 className="display-3">{this.state.totalBrand} {this.state.loading && <Loading />}</h2>
            <p className="lead">Total de marcas</p>
          </Container>
        </Jumbotron>
        <Jumbotron fluid>
          <Container fluid>
          <h2 className="display-3">{this.state.totalProduct} {this.state.loading && <Loading />}</h2>
            <p className="lead">Total de productos</p>
          </Container>
        </Jumbotron>
        <Jumbotron fluid>
          <Container fluid>
          <h2 className="display-3">{this.state.totalProductLine} {this.state.loading && <Loading />}</h2>
            <p className="lead">Total de l&iacute;neas de productos</p>
          </Container>
        </Jumbotron>
      </Container>
    );
  }
}

ReportUser.displayName = "ReportUser";

export default withSetting(ReportUser);
