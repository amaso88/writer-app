import React, { Component } from 'react'
import { Container, Table, Button, Row, ButtonGroup } from "reactstrap";
import { handleLink } from "../../../shared/util/link-utils";
import { ROUTES_CONSTANTS } from "../../../config/routes-constants";
import Loading from "../../layouts/loading";
import { withSetting } from "../../../shared/context";
import Cursor from "../../layouts/paginator/cursor";
import PaginatorWidget from "../../layouts/paginator";

class ProductManagement extends Component {
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
    
        this.getItems = this.props.context.firebase
          .getService("product")
          .getRefAll();
        this.cursor = new Cursor(
          this.getItems.orderByChild("created"),
          this.state.pagination.itemsPerPage
        );
      }
    
      async componentDidMount() {
        let total = await this.props.context.firebase
          .getService("brand")
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
            <h2 className="pt-5">Productos</h2>
            {loading && <Loading />}
    
            <Row className="justify-content-end pb-1">
              <Button
                className="btn-created"
                onClick={e => handleLink(e, ROUTES_CONSTANTS.PRODUCT.create())}
              >
                Crear
              </Button>
            </Row>
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead className="table-head">
                  <tr>
                    <th>#</th>
                    <th>C&oacute;digo</th>
                    <th>Nombre</th>
                    <th>Descripci&oacute;n corta</th>
                    <th>Linea</th>
                    <th>Marca</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length > 0 &&
                    items.map((item, i) => (
                      <tr key={item.uid}>
                        <td>{i + 1}</td>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.shortDescription}</td>
                        <td>{item.productLineName}</td>
                        <td>{item.brandName}</td>
                        <td className="row-table-actions text-center">
                          <ButtonGroup aria-label="Basic example">
                            <Button
                              className="btn-view"
                              onClick={e =>
                                handleLink(
                                  e,
                                  ROUTES_CONSTANTS.PRODUCT.view(item.uid)
                                )
                              }
                            >
                              View
                            </Button>
                            <Button
                              className="btn-edit"
                              onClick={e =>
                                handleLink(
                                  e,
                                  ROUTES_CONSTANTS.PRODUCT.edit(item.uid)
                                )
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              className="btn-delete"
                              onClick={e =>
                                handleLink(
                                  e,
                                  ROUTES_CONSTANTS.PRODUCT.delete(item.uid)
                                )
                              }
                            >
                              Delete
                            </Button>
                            <Button
                              className="btn-delete"
                              onClick={e =>
                                handleLink(
                                  e,
                                  ROUTES_CONSTANTS.PRODUCT.html(item.uid)
                                )
                              }
                            >
                              Html
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
    
              {this.state.pagination.total > 0 && (
                <PaginatorWidget
                  total={this.state.pagination.total}
                  current={this.state.pagination.activePage}
                  itemsPerPage={this.state.pagination.itemsPerPage}
                  onPageChanged={this.handlePagination}
                />
              )}
            </div>
          </Container>
        );
      }
    }

export default withSetting(ProductManagement)