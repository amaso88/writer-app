import React, { Component } from "react";
import {
  Container,
  Table,
  Button,
  Row,
  ButtonGroup
} from "reactstrap";
import { handleLink } from "../../../shared/util/link-utils";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import Loading from "../../layouts/loading";
import { withSetting } from "../../../shared/context";
import '../../../index.css'
import Cursor from "../../layouts/paginator/cursor";

class BrandManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      items: {},
      pagination: {
        itemsPerPage: 2,
        total: 0,
        cursor: "",
        activePage: 0
      }
    };

    this.getItems = this.props.context.firebase.getService("company").getRefAll();
    this.cursor = new Cursor(
      this.getItems.orderByChild("created"),
      this.state.pagination.itemsPerPage
    );
  }

  async componentDidMount() {
    let total = await this.props.context.firebase
      .getService("company")
      .getCountAll();
    this.setState({
      ...this.state,
      pagination: {
        ...this.state.pagination,
        total
      }
    });
    this.moveForward();
  }

  handlePagination = activePage => {
    let isForward = this.state.pagination.activePage < activePage;
    this.setState(
      {
        ...this.state,
        pagination: {
          ...this.state.pagination,
          activePage
        }
      },
      () => this.sortEntities(isForward)
    );
  };

  sortEntities = isForward => {
    if (isForward) {
      this.moveForward();
    } else {
      this.moveBackward();
    }
  };

  moveForward = () => {
    this.cursor.next().then(data => {
      this.setState({
        items: data
      });
    });
  };

  moveBackward = () => {
    this.cursor.previous().then(data => {
      this.setState({
        items: data
      });
    });
  };

  componentWillUnmount() {
    this.getItems.off();
  }

  render() {
    const { items, loading } = this.state;
    return (
      <Container>
        <h2 className="pt-5">Compa&ntilde;ias</h2>
        {loading && <Loading />}
        <Row className="justify-content-end pb-1">
            <Button className="btn-created"
              onClick={e => handleLink(e, ROUTES_CONSTANTS.COMPANY.create())}
            >
              Crear
            </Button>
        </Row>
        <div className="table-responsive">
            <Table striped bordered hover>
              <thead className="table-head">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Descripci&oacute;n</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 &&
                  items.map((item, i) => (
                    <tr key={item.uid}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td className="row-table-actions text-center">
                        <ButtonGroup aria-label="Basic example">
                          <Button
                            className="btn-view"
                            onClick={e =>
                              handleLink(e, ROUTES_CONSTANTS.COMPANY.view(item.uid))
                            }
                          >
                            View
                          </Button>
                          <Button
                            className="btn-edit"
                            onClick={e =>
                              handleLink(e, ROUTES_CONSTANTS.COMPANY.edit(item.uid))
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            className="btn-delete"
                            onClick={e =>
                              handleLink(
                                e,
                                ROUTES_CONSTANTS.COMPANY.delete(item.uid)
                              )
                            }
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
        </div>
      </Container>
    );
  }
}

export default withSetting(BrandManagement);
