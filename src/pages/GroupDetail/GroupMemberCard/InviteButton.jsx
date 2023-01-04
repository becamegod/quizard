import {
  CheckOutlined,
  CopyOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Tabs, Typography } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import inviteLink from "../../../api/InviteLinks";
import MyButton from "../../../components/UI/MyButton";
import constants from "../../../utils/constants";
import InviteEmailForm from "./InviteEmailForm";

export default function InviteButton({ group }) {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("");

  const onClick = async () => {
    setShowModal(true);
    const res = await inviteLink.get(group);
    setUrl(`${constants.baseUrl}/join/${res.data.url}`);
  };
  const onCancel = () => setShowModal(false);

  const tabItems = [
    {
      label: "Invite by link",
      key: "1",
      children: (
        <Row align="middle">
          <Col flex={1}>
            <Input value={`${url}`} />
          </Col>
          <Col>
            <Typography.Text
              level={1}
              copyable={{
                icon: [
                  <MyButton icon={<CopyOutlined />}>Copy</MyButton>,
                  <MyButton icon={<CheckOutlined />}>Copied</MyButton>
                ]
              }}
            />
          </Col>
        </Row>
      )
    },
    {
      label: "Invite by email",
      key: "2",
      children: <InviteEmailForm link={url} />
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
