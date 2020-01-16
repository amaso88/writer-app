import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Button, Form, Row, Col } from "reactstrap";
import { goBack } from "../../../shared/util/link-utils";
import AutoComplete from "../../layouts/autocomplete";
import { getWordCount } from "../../../shared/util/string-utils";
import { withSetting } from "../../../shared/context";

class ProductManagementForm extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    saveEntity: PropTypes.func.isRequired,
    item: PropTypes.object
  };

  state = {
    loading: false,
    item: {
      code: "",
      name: "",
      shortDescription: "",
      largeDescription: "",
      htmlDescription: "",
      productLineUID: "",
      productLineName: "",
      brandUID: "",
      brandName: ""
    },
    wordCountShortDescription: 0,
    wordCountLargeDescription: 0,
    active: false,
    productLines: [],
    brands: []
  };

  componentDidMount() {
    const { item } = this.props;
    if (item) {
      let wordCountShortDescription = this.state.wordCountShortDescription;
      let wordCountLargeDescription = this.state.wordCountLargeDescription;

      if (item.shortDescription) {
        let texto = item.shortDescription;
        wordCountShortDescription = getWordCount(texto);
      }
      if (item.largeDescription) {
        let texto = item.largeDescription;
        wordCountLargeDescription = getWordCount(texto);
      }
      this.setState({
        ...this.state,
        item,
        wordCountShortDescription,
        wordCountLargeDescription
      });
    }
  }

  changeHandler = event => {
    let targetName = event.target.name;
    let targetValue = event.target.value;
    let wordCountShortDescription = this.state.wordCountShortDescription;
    let wordCountLargeDescription = this.state.wordCountLargeDescription;

    if (targetName === "shortDescription") {
      let texto = targetValue;
      wordCountShortDescription = getWordCount(texto);
    } else if (targetName === "largeDescription") {
      let texto = targetValue;
      wordCountLargeDescription = getWordCount(texto);
    }
    this.setState({
      ...this.state,
      item: {
        ...this.state.item,
        [targetName]: targetValue
      },
      wordCountShortDescription,
      wordCountLargeDescription
    });
  };

  changeProductLineHandler = value => {
    this.setState({
      item: {
        ...this.state.item,
        productLineUID: value ? value.value : "",
        productLineName: value ? value.label : ""
      }
    });
  };

  changeBrandHandler = value => {
    this.setState({
      item: {
        ...this.state.item,
        brandUID: value ? value.value : "",
        brandName: value ? value.label : ""
      }
    });
  };

  changeCompaniesHandler = value => {
    this.setState(
      {
        item: {
          ...this.state.item,
          companiesUID: value ? value.value : "",
          companiesName: value ? value.label : ""
        }
      },
      () => {
        this.getProductLinesAndBrandsData();
      }
    );
  };

  getProductLinesAndBrandsData = async () => {
    const { firebase } = this.props.context;
    console.log(this.state.item.companiesUID);
    const productLines = await firebase
      .getService("productLine")
      .getAll({ orderByChild: 'companiesUID', equalTo: this.state.item.companiesUID });
    const brands = await firebase
      .getService("brand")
      .getAll({ orderByChild: 'companiesUID', equalTo: this.state.item.companiesUID });
      console.log(brands)

    this.setState({
      ...this.state,
      productLines,
      brands
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // event.target.className = "needs-validation";
    this.props.saveEntity(this.state.item);
  };

  render() {
    const { productLines, brands } = this.state;
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
            <Col lg="10" className="btn-back-container px-0">
              <Button onClick={e => goBack(e)} className="btn-back">
                Back
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="10" lg="10" className="px-sm-0 pl-md-0 pr-md-1 col-info">
              <div className="form-group">
                <label htmlFor="company">Compa&ntilde;&iacute;a</label>
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
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6" lg="5" className="px-sm-0 pl-md-0 pr-md-1 col-info">
              <div className="form-group">
                <label htmlFor="productLine">Linea de productos</label>
                <AutoComplete
                  isCreatable={false}
                  isMulti={false}
                  options={productLines}
                  defaultLabel="name"
                  defaultValue="uid"
                  handleChange={this.changeProductLineHandler}
                  selectedOptions={
                    this.state.item
                      ? [
                          {
                            uid: this.state.item.productLineUID,
                            name: this.state.item.productLineName
                          }
                        ]
                      : []
                  }
                />
              </div>
            </Col>
            <Col md="6" lg="5" className="px-sm-0 pr-md-0 pl-md-1 col-info">
              <div className="form-group">
                <label htmlFor="marca">Marca</label>
                <AutoComplete
                  isCreatable={false}
                  isMulti={false}
                  options={brands}
                  defaultLabel="name"
                  defaultValue="uid"
                  handleChange={this.changeBrandHandler}
                  selectedOptions={
                    this.state.item
                      ? [
                          {
                            uid: this.state.item.brandUID,
                            name: this.state.item.brandName
                          }
                        ]
                      : []
                  }
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6" lg="5" className="px-sm-0 pl-md-0 pr-md-1 col-info">
              <div className="form-group">
                <label htmlFor="name">C&oacute;digo</label>
                <input
                  type="text"
                  className="form-control"
                  name="code"
                  value={this.state.item.code}
                  onChange={this.changeHandler}
                />
              </div>
            </Col>
            <Col md="6" lg="5" className="px-sm-0 pl-md-1 pr-md-0 col-info">
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.item.name}
                  onChange={this.changeHandler}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="10" className="form-group col-info">
              <label htmlFor="shortDescription">Descripci&oacute;n corta</label>
              <textarea
                className="form-control"
                name="shortDescription"
                value={this.state.item.shortDescription}
                onChange={this.changeHandler}
              />
              <small className="form-text text-muted">
                Palabras: {this.state.wordCount}
              </small>
            </Col>
            <Col lg="10" className="form-group col-info">
              <label htmlFor="description">Descripci&oacute;n larga</label>
              <textarea
                className="form-control"
                name="largeDescription"
                value={this.state.item.largeDescription}
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

export default withSetting(ProductManagementForm);
