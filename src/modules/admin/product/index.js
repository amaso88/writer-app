import React from "react";
import { Switch } from "react-router-dom";
import ErrorBoundaryRoute from "../../../shared/error/error-boundary-route";
import ProductManagement from "./product-management";
import ProductManagementCreate from "./product-management-create";
import ProductManagementView from "./product-management-view";
import ProductManagementEdit from "./product-management-edit";
import ProductManagementDelete from "./product-management-delete";
import ProductManagementHtml from "./product-management-html";

export default function ProductRoutes({ match }) {
  return (
    <>
      <Switch>
        <ErrorBoundaryRoute
          path={`${match.url}/edit/:id`}
          component={ProductManagementEdit}
        />
        <ErrorBoundaryRoute
          path={`${match.url}/create`}
          component={ProductManagementCreate}
        />
        <ErrorBoundaryRoute
          path={`${match.url}/view/:id`}
          component={ProductManagementView}
        />
        <ErrorBoundaryRoute
          path={`${match.url}/html/:id`}
          component={ProductManagementHtml}
        />
        <ErrorBoundaryRoute
          path={`${match.url}`}
          component={ProductManagement}
        />
      </Switch>
      <ErrorBoundaryRoute
        path={`${match.url}/delete/:id`}
        component={ProductManagementDelete}
      />
    </>
  );
}
