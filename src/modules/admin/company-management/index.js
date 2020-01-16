import React from 'react'
import { Switch  } from 'react-router-dom';
import ErrorBoundaryRoute from '../../../shared/error/error-boundary-route';
import CompanyManagement from './company-management';
import CompanyManagementCreate from "./company-management-create";
import CompanyManagementView from "./company-management-view";
import CompanyManagementEdit from "./company-management-edit";
import CompanyManagementDelete from "./company-management-delete";

export default function CompanyRoutes({match}) {
	return (
		<>
			<Switch>
				<ErrorBoundaryRoute path={`${match.url}/edit/:id`} component={CompanyManagementEdit} />
				<ErrorBoundaryRoute path={`${match.url}/create`} component={CompanyManagementCreate} />
				<ErrorBoundaryRoute path={`${match.url}/view/:id`} component={CompanyManagementView} />
				<ErrorBoundaryRoute path={`${match.url}`} component={CompanyManagement} />
			</Switch>
			<ErrorBoundaryRoute path={`${match.url}/delete/:id`} component={CompanyManagementDelete} />
		</>
	)
}
