import React, { Component } from "react";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Row,
  Col
} from "reactstrap";
import { goBack } from "../../../shared/util/link-utils";
import Loading from "../../layouts/loading";
import { withSetting } from "../../../shared/context";

class ProductLineManagementView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      item: null
    };

    this.getItem = this.props.context.firebase.productLine;
  }
  async componentDidMount() {
    const { firebase } = this.props.context;
    this.setState({ loading: true });
    let uid = this.props.match.params.id;

    let item = await firebase.getService("productLine").getItem(uid);
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
            <h2 className="pt-5 pb-2">Ver linea de productos</h2>
          </Col>
          <Col md="10" className="btn-loading mb-1">
            {loading && <Loading />}
            <Button onClick={e => goBack(e)} className="btn-back">
              Back
            </Button>
          </Col>
          <Col md="10">
            <ListGroup>
              <ListGroupItem className="d-flex justify-content-between">
                <span>
                  <strong>Nombre:</strong>
                </span>
                {item && item.name}
              </ListGroupItem>
              <ListGroupItem className="d-flex justify-content-between">
                <span>
                  <strong>Descripci&oacute;n:</strong>
                </span>
                {item && item.description}
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withSetting(ProductLineManagementView);
