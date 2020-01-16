import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Row, Col, Container, Button } from "reactstrap";
import { goBack } from "../../../shared/util/link-utils";
import AutoComplete from "../../layouts/autocomplete";

export default class BrandManagementForm extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    saveEntity: PropTypes.func.isRequired,
    item: PropTypes.object
  };

  state = {
    item: {
      name: "",
      description: "",
      companiesUID: "",
      companiesName: ""
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

  changeCompaniesHandler = value => {
    this.setState({
      item: {
        ...this.state.item,
        companiesUID: value ? value.value : "",
        companiesName: value ? value.label : ""
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // event.target.className = "needs-validation";
    this.props.saveEntity(this.state.item);
  };

  render() {
    const { companies } = this.props;
    return (
      <Container>
        <h2 className="pt-5 pb-2">{this.props.title}</h2>
        <Form
          noValidate
          onSubmit={this.handleSubmit}
          validated={"false"}
          className="pt-2 pb-5"
        >
          <Row>
            <Col md="10" className="btn-back-container">
              <Button onClick={e => goBack(e)} className="btn-back">
                Back
              </Button>
            </Col>
            <Col md="10" className="form-group">
              <label htmlFor="name">Compa&ntilde;ia</label>
              <AutoComplete
                isCreatable={false}
                isMulti={false}
                options={companies}
                defaultLabel="name"
                defaultValue="uid"
                handleChange={this.changeCompaniesHandler}
                selectedOptions={
                  this.state.item
                    ? [
                        {
                          uid: this.state.item.companiesUID,
                          name: this.state.item.companiesName
                        }
                      ]
                    : []
                }
              />
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
              <label htmlFor="description">Descripcion</label>
              <textarea
                className="form-control"
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
            <Button type="submit" className="btn-save btn-success">
              Save
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}
