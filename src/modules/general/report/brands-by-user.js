import React, { Component } from "react";
import { withSetting } from "../../../shared/context";
import { Container, Table, Button, Row, Col } from "reactstrap";
import AutoComplete from "../../layouts/autocomplete";
import Loading from "../../layouts/loading";

class BrandsByUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      items: {},
      userUid: null,
      userName: null,
      products: []
    };

    this.getItems = this.props.context.firebase.getService("user").getRefAll();
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });

    this.getItems.on("value", snapshot => {
      const itemsObject = snapshot.val();
      const itemsList = itemsObject
        ? Object.keys(itemsObject).map(key => ({
            ...itemsObject[key],
            uid: key
          }))
        : [];
      this.setState({
        ...this.state,
        items: itemsList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
    this.getItems.off();
  }

  changeProductHandler = value => {
    this.setState({
      ...this.state,
      userUid: value ? value.value : "",
      userName: value ? value.label : ""
    });
  };

  getData = async userId => {
    if (!userId) {
      this.setState({ ...this.state, products: [] });
      return;
    }
    const { firebase } = this.props.context;
    const brands = await firebase.getService("brand").getAll({
      orderByChild: "createdBy",
      equalTo: userId
    });
    this.setState({ ...this.state, products: brands });
  };

  render() {
    return (
      <Container>
        {this.state.loading && <Loading />}
        <h2> Seleccione un usuario</h2>
        <Row>
          {this.state.items && this.state.items.length > 0 && (
            <>
              <Col md="8">
                <AutoComplete
                  isCreatable={false}
                  isMulti={false}
                  options={this.state.items}
                  defaultLabel="username"
                  defaultValue="uid"
                  handleChange={this.changeProductHandler}
                  selectedOptions={
                    this.state.userUid
                      ? [
                          {
                            uid: this.state.userUid,
                            username: this.state.userName
                          }
                        ]
                      : []
                  }
                />
              </Col>
              <Col md="4">
                <Button
                  className="btn-view"
                  onClick={() => {
                    this.getData(this.state.userUid);
                  }}
                >
                  Ver
                </Button>
              </Col>
            </>
          )}
        </Row>
        <Row>
          <h2 className="pt-5">Marcas</h2>

          <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-head">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Descripci&oacute;n</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.length > 0 &&
                  this.state.products.map((item, i) => (
                    <tr key={item.uid}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Row>
      </Container>
    );
  }
}

export default withSetting(BrandsByUser);
