import React, { useState, useEffect } from "react";
import { Modal, Table, Row, Col, Typography, Button } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import Sessions from "../../api/sessions";

export default function QuestionModal({ open, id, setOpenQuestionModalFalse }) {
  const [questions, setQuestions] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(open);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setOpenQuestionModalFalse();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenQuestionModalFalse();
  };

  async function fetchQuestion() {
    const res = await Sessions.getQuestions(id);
    setQuestions(res.data.questions);
  }

  useEffect(() => {
    if (open) {
      fetchQuestion();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      showModal();
    }
  }, [open]);

  const columns = [
    {
      title: "Question",
      dataIndex: "text",
      key: "question",
      render: (text) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong style={{ color: "#0E86D4" }}>
              {text}
            </Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      title: "Like",
      dataIndex: "likes",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.likes.length - b.likes.length,
      key: "likes",
      render: (likes) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong>{likes.length}</Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      title: "Status",
      dataIndex: "answered",
      key: "status",
      render: (answered) => {
        let status = "Answered";
        if (!answered) {
          status = "Not answered";
        }
        return (
          <Row align="middle" gutter={[8, 0]}>
            <Col>
              <Typography.Text strong>{status}</Typography.Text>
            </Col>
          </Row>
        );
      }
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
        dataSource={questions}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
        style={{ overflow: "auto", height: "300px" }}
      />
    </Col>
  );
  return (
    <Modal
      title="Question"
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
QuestionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  setOpenQuestionModalFalse: PropTypes.func.isRequired
};
