import React, { Component } from "react";
import { Switch } from "react-router-dom";
import ErrorBoundaryRoute from "./shared/error/error-boundary-route";
import { ROUTES_CONSTANTS } from "./config/routes-constants";

import Home from "./modules/general/home";
import PageNotFound from "./shared/error/page-not-found";
import LoginPage from "./modules/general/login";
import CompanyRoutes from "./modules/admin/company-management";
import ProductLinesRoutes from "./modules/admin/product-line-management";
import BrandRoutes from "./modules/admin/brand-management";
import ProductRoutes from "./modules/admin/product";

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <ErrorBoundaryRoute
            path={ROUTES_CONSTANTS.HOME}
            exact
            component={Home}
          />
          <ErrorBoundaryRoute
            path={ROUTES_CONSTANTS.AUTH.LOGIN}
            component={LoginPage}
          />

          <ErrorBoundaryRoute
            path={ROUTES_CONSTANTS.COMPANY.index()}
            component={CompanyRoutes}
          />

          <ErrorBoundaryRoute
            path={ROUTES_CONSTANTS.PRODUCT_LINE.index()}
            component={ProductLinesRoutes}
          />

          <ErrorBoundaryRoute
            path={ROUTES_CONSTANTS.BRAND.index()}
            component={BrandRoutes}
          />

          <ErrorBoundaryRoute
            path={ROUTES_CONSTANTS.PRODUCT.index()}
            component={ProductRoutes}
          />

          <ErrorBoundaryRoute component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
