import { Button, Modal, Tabs } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState } from "react";
import InviteEmailForm from "./InviteEmailForm";

export default function InviteButton() {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => setShowModal(true);
  const onCancel = () => setShowModal(false);

  const tabItems = [
    {
      label: "Invite by link",
      key: "1",
      children: <Title copyable>GGEZNOOB</Title>
    },
    {
      label: "Invite by email",
      key: "2",
      children: <InviteEmailForm />
    }
  ];

  return (
    <>
      <Modal
        centered
        title="Invite a friend to group"
        open={showModal}
        onCancel={onCancel}
        footer={null}
      >
        <Tabs defaultActiveKey="1" centered items={tabItems} />
      </Modal>
      <Button onClick={onClick}>Invite</Button>
    </>
  );
}
