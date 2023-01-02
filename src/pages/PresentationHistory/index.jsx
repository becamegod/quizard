import React, { useState, useEffect } from "react";
import {
  Col,
  Card,
  Row,
  Typography,
  Table,
  Button,
  Space,
  notification
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Sessions from "../../api/sessions";
import QuestionModal from "./QuestionModal";
import ResultModal from "./ResultModal";

export default function PresentationHistory() {
  const [histories, setHistories] = useState(null);
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await Sessions.list();
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
        setOpenResultModal(true);
        break;
      }
      case "Question": {
        setOpenQuestionModal(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  const setOpenQuestionModalFalse = () => {
    setOpenQuestionModal(false);
  };

  const setOpenResultModalFalse = () => {
    setOpenResultModal(false);
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
        return (
          <Row align="middle" justify="center">
            <MyButton shape="round" onClick={(e) => e.preventDefault()}>
              <Space>Detail</Space>
            </MyButton>
          </Row>
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
      <ResultModal
        open={openResultModal}
        id={selectedId}
        setOpenResultModalFalse={setOpenResultModalFalse}
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
