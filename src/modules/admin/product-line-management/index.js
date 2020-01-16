import React from "react";
import { Switch } from "react-router-dom";
import ErrorBoundaryRoute from "../../../shared/error/error-boundary-route";
import ProductLineManagement from "./product-line-management";
import ProductLineManagementCreate from "./product-line-management-create";
import ProductLineManagementView from "./product-line-management-view";
import ProductLineManagementEdit from "./product-line-management-edit";
import ProductLineManagementDelete from "./product-line-management-delete";

export default function ProductLinesRoutes({ match }) {
  return (
    <>
      <Switch>
        <ErrorBoundaryRoute
          path={`${match.url}/edit/:id`}
          component={ProductLineManagementEdit}
        />
        <ErrorBoundaryRoute
          path={`${match.url}/create`}
          component={ProductLineManagementCreate}
        />
        <ErrorBoundaryRoute
          path={`${match.url}/view/:id`}
          component={ProductLineManagementView}
        />
        <ErrorBoundaryRoute
          path={`${match.url}`}
          component={ProductLineManagement}
        />
      </Switch>
      <ErrorBoundaryRoute
        path={`${match.url}/delete/:id`}
        component={ProductLineManagementDelete}
      />
    </>
  );
}
