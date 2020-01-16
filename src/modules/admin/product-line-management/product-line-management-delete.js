import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { goBack } from '../../../shared/util/link-utils'
import history from '../../../config/history';
import { ROUTES_CONSTANTS } from '../../../config/routes-constants';
import { withSetting } from '../../../shared/context';

class ProductLineManagementDelete extends Component {
	handleSubmit = async e => {
    e.preventDefault();
    const { firebase } = this.props.context;

    let uid = this.props.match.params.id;

    let deleteSuccess = await firebase.getService("productLine").removeItem(uid);
    if (deleteSuccess) {
      history.push(ROUTES_CONSTANTS.PRODUCT_LINE.index());
    }
  }
	render() {
		return (
			<Modal show={true} onHide={e => goBack(e)}>
        <ModalHeader closeButton>
          Modal heading
        </ModalHeader>
        <ModalBody>Estas seguro que deseas eliminar este elemento? </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={e => goBack(e)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Eliminar
          </Button>
        </ModalFooter>
      </Modal>
		)
	}
}

export default withSetting( ProductLineManagementDelete)