import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationDialog = ({ show, text, fn1, fn2, btn1, btn2, onCancel }) => {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={fn1}>
          {btn1}
        </Button>
        <Button variant="primary" onClick={fn2}>
          {btn2}
        </Button>{" "}
        <Button variant="secondary" onClick={onCancel}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmationDialog;
