import React, { Component } from "react";
import { withSetting } from "../../../shared/context";
import Loading from "../../layouts/loading";
import { goBack } from "../../../shared/util/link-utils";
import { Container, Row, Col, Button } from "reactstrap";
import CKEditorWidget from "../../layouts/ckeditor";
import moment from "moment";
import history from "../../../config/history";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";

class ProductManagementHtml extends Component {
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
    const item = await firebase.getService("product").getItem(uid);
    this.setState({
      item,
      loading: false
    });
  }

  changeHandler = content => {
    this.setState({
      ...this.state,
      item: {
        ...this.state.item,
        htmlDescription: content
      }
    });
  };

  saveHtmlContent = async () => {
    const { firebase } = this.props.context;
    const { item } = this.state;
    let uid = this.props.match.params.id;

    let updateSuccess = await firebase
      .getService("product")
      .updateItem(item, uid);

    if (updateSuccess) {
      history.push(ROUTES_CONSTANTS.PRODUCT.index());
    }
  };

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
            <Button onClick={e => goBack(e)} className="btn-back">
              Atras
            </Button>
          </Col>
          <Col md="10">
            <h2>Producto: {item && item.name}</h2>
          </Col>
          <Col md="12">
            {item && (
              <CKEditorWidget
                html={item.htmlDescription}
                short={item.shortDescription}
                large={item.largeDescription}
                changeHandler={this.changeHandler}
              />
            )}
          </Col>
          <Col md="10">
            <Button onClick={this.saveHtmlContent} className="btn btn-warning">
              Guardar
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withSetting(ProductManagementHtml);
