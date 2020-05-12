import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { Container } from './styles';
import Button from '~/components/Button';

function ModalDialog({
  show,
  onHide,
  selectedUser,
  content,
  handleAction,
  children,
  isForm,
}) {
  return (
    <Container>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{content.title}</Modal.Title>
        </Modal.Header>
        {isForm ? (
          <Modal.Body>{children}</Modal.Body>
        ) : (
          <>
            <Modal.Body>
              {content.body}
              <br />
              <br />
              <strong>{selectedUser.name}</strong>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" bg="info" onClick={onHide}>
                Cancelar
              </Button>
              <Button
                type="button"
                bg="danger"
                onClick={() => handleAction(selectedUser.id)}
              >
                Deletar
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
}

ModalDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  selectedUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  content: PropTypes.objectOf(PropTypes.string).isRequired,
  handleAction: PropTypes.func.isRequired,
  children: PropTypes.shape(),
  isForm: PropTypes.bool,
};

ModalDialog.defaultProps = {
  isForm: false,
  children: PropTypes.shape(),
};

export default ModalDialog;
