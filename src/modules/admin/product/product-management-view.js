import React, { Component } from "react";
import { Container, Button, ListGroup, ListGroupItem, Row, Col } from "reactstrap";
import { goBack } from "../../../shared/util/link-utils";
import Loading from "../../layouts/loading";
import { withSetting } from "../../../shared/context";

class ProductManagementView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      item: null
    };

    this.getItem = this.props.context.firebase.product;
  }

  async componentDidMount() {
    const { firebase } = this.props.context;
    this.setState({ loading: true });
    let uid = this.props.match.params.id;

    let item = await firebase.getService("product").getItem(uid);
    this.setState({
      item,
      loading: false
    });
  }

  render() {
    const { item, loading } = this.state;
    return (
      <Container>
        <Row>
          <Col md="10">
            <h2 className="pt-5 pb-2">Ver Producto</h2>
          </Col>
          <Col md="10">
            {loading && <Loading />}
            <Button onClick={e => goBack(e)} className="btn-back">Atras</Button>
          </Col>
          <Col md="10">
              <ListGroup>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>
                    <strong>Codigo:</strong>
                  </span>
                  {item && item.code}
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>
                    <strong>Nombre:</strong>
                  </span>
                  {item && item.name}
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>
                    <strong>Descripci&oacute;n corta:</strong>
                  </span>
                  {item && item.shortDescription}
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>
                    <strong>Descripci&oacute;n larga:</strong>
                  </span>
                  {item && item.largeDescription}
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>
                    <strong>Linea de producto:</strong>
                  </span>
                  {item && item.productLineName}
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                  <span>
                    <strong>Marca:</strong>
                  </span>
                  {item && item.brandName}
                </ListGroupItem>
              </ListGroup>
            </Col>
        </Row>
      </Container>
    );
  }
}

export default withSetting(ProductManagementView);
