import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  Row,
  Typography,
  Table,
  Dropdown,
  Button,
  Space,
  notification
} from "antd";
import {
  QuestionOutlined,
  EllipsisOutlined,
  EyeOutlined,
  WechatOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import moment from "moment";
import Sessions from "../../api/sessions";
import QuestionModal from "./QuestionModal";
import ChatModal from "./ChatModal";

export default function PresentationHistory() {
  const [histories, setHistories] = useState(null);
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [openChatModal, setOpenChatModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await Sessions.list();
        console.log(res.data);
        setHistories(res.data.sessions);
      } catch (err) {
        const { status } = err.request;
        let description;
        switch (status) {
          default:
            description = "Something's wrong. Please try again later.";
            break;
        }
        notification.error({
          message: "Error",
          description,
          icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
          style: {
            backgroundColor: "#FFF1F0",
            borderRadius: "10px"
          }
        });
      }
    }
    fetchHistory();
  }, []);

  const handleMenuClick = (e) => {
    const [action, id] = e.key.split(" ");
    setSelectedId(id);
    switch (action) {
      case "Result": {
        break;
      }
      case "Question": {
        setOpenQuestionModal(true);
        break;
      }
      default: {
        setOpenChatModal(true);
        break;
      }
    }
  };

  const setOpenQuestionModalFalse = () => {
    setOpenQuestionModal(false);
  };

  const setOpenChatModalFalse = () => {
    setOpenChatModal(false);
  };

  const columns = [
    {
      title: "Presentation name",
      dataIndex: "presentationId",
      key: "name",
      render: (presentationId) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong style={{ color: "#0E86D4" }}>
              {presentationId.name}
            </Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      title: "Presenting date",
      dataIndex: "date",
      key: "date",
      render: (date) => {
        const localDate = new Date(date);
        return (
          <Row align="middle" gutter={[8, 0]}>
            <Col>
              <Typography.Text strong style={{ color: "black" }}>
                {moment(localDate).format("HH:mm  - DD/MM/YYYY").toString()}
              </Typography.Text>
            </Col>
          </Row>
        );
      }
    },
    {
      key: "action",
      render: (_, record) => {
        const items = [
          {
            label: (
              <Typography.Text style={{ width: "100%" }}>
                <EyeOutlined /> Result
              </Typography.Text>
            ),
            key: `Result ${record.id}`
          },
          {
            label: (
              <Typography.Text style={{ width: "100%" }}>
                <QuestionOutlined /> Question
              </Typography.Text>
            ),
            key: `Question ${record.id}`
          },
          {
            label: (
              <Typography.Text style={{ width: "100%" }}>
                <WechatOutlined /> Chat
              </Typography.Text>
            ),
            key: `Chat ${record.id}`
          }
        ];
        return (
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
          >
            <Row align="middle" justify="center">
              <Button shape="round" onClick={(e) => e.preventDefault()}>
                <Space>
                  <EllipsisOutlined />
                </Space>
              </Button>
            </Row>
          </Dropdown>
        );
      }
    }
  ];

  const list = (
    <Col span={24}>
      <Table
        dataSource={histories}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </Col>
  );
  return (
    <>
      <QuestionModal
        open={openQuestionModal}
        id={selectedId}
        setOpenQuestionModalFalse={setOpenQuestionModalFalse}
      />
      <ChatModal
        open={openChatModal}
        id={selectedId}
        setOpenChatModalFalse={setOpenChatModalFalse}
      />
      <Card>
        <Row justify="space-between" style={{ marginBottom: "32px" }}>
          <Col flex={1}>
            <Typography.Title>Presentation Histories</Typography.Title>
          </Col>
        </Row>
        {list}
      </Card>
    </>
  );
}
