import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Container, Button, Row, Col } from "reactstrap";
import { goBack } from "../../../shared/util/link-utils";

export default class CompanyManagementForm extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    saveEntity: PropTypes.func.isRequired,
    item: PropTypes.object
  };

  state = {
    item: {
      name: "",
      description: ""
    },
    wordCount: 0
  };

  componentDidMount() {
    const { item } = this.props;
    if (item) {
      this.setState({ item });
    }
  }

  changeHandler = event => {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    let wordCount = this.state.wordCount;

    if (targetName === "description") {
      let texto = targetValue;
      let primerBlanco = /^ /;
      let ultimoBlanco = / $/;
      let variosBlancos = /[ ]+/g;
      texto = texto.replace(variosBlancos, " ");
      texto = texto.replace(primerBlanco, "");
      texto = texto.replace(ultimoBlanco, "");
      wordCount = texto.split(" ").length;
    }
    this.setState({
      ...this.state,
      item: {
        ...this.state.item,
        [targetName]: targetValue
      },
      wordCount
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // event.target.className = "needs-validation";
    this.props.saveEntity(this.state.item);
  };

  render() {
    return (
      <Container>
        <h2 className="pt-5 pb-2">{this.props.title}</h2>
        <Form noValidate onSubmit={this.handleSubmit} validated={false} className="pt-2 pb-5">
            <Row>
              <Col md="10" className="btn-back-container">
                    <Button onClick={e => goBack(e)} className="btn-back">Back</Button>
              </Col>
              <Col md="10" className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.item.name}
                  onChange={this.changeHandler}
                />
              </Col>
              <Col md="10" className="form-group">
                <label htmlFor="description">Descripci&oacute;n</label>
                <textarea
                  className="form-control text-dark"
                  name="description"
                  value={this.state.item.description}
                  onChange={this.changeHandler}
                />
                <small className="form-text text-muted">
                  Palabras: {this.state.wordCount}
                </small>
              </Col>
            </Row>
          <div className="btn-success-container">
            <Button type="submit" className="btn-save btn-success">Save</Button>
          </div>
        </Form>
      </Container>
    );
  }
}
