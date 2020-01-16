import React from "react";
import { Switch } from "react-router-dom";
import ErrorBoundaryRoute from "../../../shared/error/error-boundary-route";
import BrandManagement from "./brand-management";
import BrandManagementCreate from "./brand-management-create";
import BrandManagementView from "./brand-management-view";
import BrandManagementEdit from "./brand-management-edit";
import BrandManagementDelete from "./brand-management-delete";

export default function BrandRoutes({ match }) {
  return (
    <>
      <Switch>
        <ErrorBoundaryRoute
          path={`${match.url}/edit/:id`}
          component={BrandManagementEdit}
        />
        <ErrorBoundaryRoute
          path={`${match.url}/create`}
          component={BrandManagementCreate}
        />
        <ErrorBoundaryRoute
          path={`${match.url}/view/:id`}
          component={BrandManagementView}
        />
        <ErrorBoundaryRoute
          path={`${match.url}`}
          component={BrandManagement}
        />
      </Switch>
      <ErrorBoundaryRoute
        path={`${match.url}/delete/:id`}
        component={BrandManagementDelete}
      />
    </>
  );
}
