import React, { Component } from 'react'
import { Container } from 'reactstrap'
import TabsWidget from '../../layouts/tabs'
import ProductByUser from "../report/product-by-user";
import ProductLineByUser from "../report/product-line-by-user";
import BrandsByUser from "../report/brands-by-user";

export default class ReportsAdmin extends Component {
    render() {
        return (
            <Container>
            <TabsWidget>
              <div label="Productos por usuario">
                <ProductByUser />
              </div>
              <div label="Lineas por usuario">
                <ProductLineByUser />
              </div>
              <div label="Marcas por usuario">
                <BrandsByUser />
              </div>
            </TabsWidget>
          </Container>
        )
    }
}
