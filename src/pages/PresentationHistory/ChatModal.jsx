import React, { useState, useEffect } from "react";
import { Modal, Table, Row, Col, Typography, Button } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import Sessions from "../../api/sessions";

export default function ChatModal({ open, id, setOpenChatModalFalse }) {
  const [chats, setChats] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(open);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setOpenChatModalFalse();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenChatModalFalse();
  };

  async function fetchResult() {
    const res = await Sessions.getChats({ sessionId: id });
    setChats(res.data.chats);
  }

  useEffect(() => {
    if (open) {
      fetchResult();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      showModal();
    }
  }, [open]);

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong style={{ color: "#0E86D4" }}>
              {user.name}
            </Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong>{user.email}</Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      title: "Message",
      dataIndex: "message",
      defaultSortOrder: "descend",
      key: "message",
      render: (message) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong>{message}</Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      title: "Time",
      dataIndex: "date",
      key: "time",
      sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
      render: (date) => {
        const localDate = new Date(date);
        return (
          <Row align="middle" gutter={[8, 0]}>
            <Col>
              <Typography.Text strong style={{ color: "black" }}>
                {moment(localDate).format("HH:mm").toString()}
              </Typography.Text>
            </Col>
          </Row>
        );
      }
    }
  ];

  const list = (
    <Col span={24}>
      <Table
        dataSource={chats}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </Col>
  );
  return (
    <Modal
      title="Result"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button key="OK" type="primary" onClick={handleOk}>
          Ok
        </Button>
      ]}
    >
      {list}
    </Modal>
  );
}
ChatModal.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  setOpenChatModalFalse: PropTypes.func.isRequired
};
