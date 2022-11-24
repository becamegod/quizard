import React, { useState } from "react";
import { Modal } from "antd";

export default function CreateGroupModal() {
  const [visible, setVisible] = useState(false);

  return (
    <Modal
      centered
      title="Create a new group"
      open={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      okText="Create"
    />
  );
}
