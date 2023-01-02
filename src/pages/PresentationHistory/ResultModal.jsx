import React, { useState, useEffect } from "react";
import { Modal, Table, Row, Col, Typography, Button } from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import Sessions from "../../api/sessions";

export default function ResultModal({ open, id, setOpenResultModalFalse }) {
  const [results, setResults] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(open);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setOpenResultModalFalse();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOpenResultModalFalse();
  };

  async function fetchResult() {
    const res = await Sessions.getResults({ sessionId: id });
    setResults(res.data.result);
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
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (question) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong style={{ color: "#0E86D4" }}>
              {question}
            </Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      title: "Vote",
      dataIndex: "vote",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.vote - b.vote,
      key: "vote",
      render: (vote) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong>{vote}</Typography.Text>
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
        dataSource={results}
        columns={columns}
        rowKey="question"
        style={{ overflow: "auto", height: "300px" }}
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
ResultModal.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  setOpenResultModalFalse: PropTypes.func.isRequired
};
