import React from "react";
import { Modal } from "react-bootstrap";

function ModalComponent({
  modalHeader,
  children,
  show,
  modalExtraClass = "",
  extraClassName = "",
  extraTitleClassName = "",
  onHandleVisible,
  onHandleCancel,
  closeButton = true,
  backdrop = "static",
  size,
  ...rest
}) {
  return (
    <>
      <Modal
        className={modalExtraClass}
        show={show}
        onHide={onHandleCancel}
        onHandleShow={onHandleVisible}
        backdrop={backdrop}
        keyboard={false}
        dialogClassName={extraClassName}
        size={size}
        centered
        {...rest}
      >
        <Modal.Header
          className={`${extraTitleClassName}`}
          closeButton={closeButton}
          // closeVariant="white"
        >
          {modalHeader && modalHeader}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComponent;
