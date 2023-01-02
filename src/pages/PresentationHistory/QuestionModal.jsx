import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

export default function QuestionModal({ open, id }) {
  const [isModalOpen, setIsModalOpen] = useState(open);

  useEffect(() => {
    if (open) {
      showModal();
    }
  }, [open]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
QuestionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
};
