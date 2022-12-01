import { UserAddOutlined } from "@ant-design/icons";
import { Button, Modal, Tabs } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState } from "react";
import PropTypes from "prop-types";
import inviteLink from "../../services/inviteLink";
import InviteEmailForm from "./InviteEmailForm";
import api from "../../api";

export default function InviteButton({ group }) {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  const onClick = async () => {
    setShowModal(true);
    const res = await inviteLink.get(group);
    setUrl(`${api}/join/${res.data.url}`);
  };
  const onCancel = () => setShowModal(false);

  const tabItems = [
    {
      label: "Invite by link",
      key: "1",
      children: <Title copyable>{url}</Title>
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
      <Button
        type="primary"
        shape="round"
        icon={<UserAddOutlined />}
        onClick={onClick}
      >
        Invite
      </Button>
    </>
  );
}

InviteButton.propTypes = {
  group: PropTypes.string.isRequired
};
