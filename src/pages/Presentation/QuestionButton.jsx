import { LikeOutlined, QuestionCircleFilled } from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Col,
  Form,
  message,
  Modal,
  Row,
  Space,
  Table,
  Typography
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";
import sessions from "../../api/sessions";
import MyButton from "../../components/UI/MyButton";
import notifier from "../../utils/notifier";
import utils from "../../utils";

export default function QuestionButton({ sessionId }) {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (sessionId === "") return;
    const init = async () => {
      try {
        const { data } = await sessions.getQuestions(sessionId);
        setQuestions(data.questions);
      } catch (error) {
        console.log(error);
        notifier.notifyError("Can't get list of questions");
      }
    };
    init();
  }, [sessionId]);

  const onSubmit = async (values) => {
    setFormDisabled(true);
    setFormLoading(true);
    try {
      const { data } = await sessions.ask(sessionId, values.text);
      const newQuestion = data.question;
      const newList = questions.slice();
      newList.push(newQuestion);
      setQuestions(newList);
      form.resetFields();
      message.success("Question submitted");
    } catch (error) {
      console.log(error);
      notifier.notifyError();
    }
    setFormDisabled(false);
    setFormLoading(false);
  };

  const columns = [
    {
      title: "Question",
      dataIndex: "text",
      key: "id"
    },
    {
      title: "Time",
      dataIndex: "date",
      key: "id",
      render: (date) => (
        <Typography.Text type="secondary">
          {utils.timeDifference(date)}
        </Typography.Text>
      )
    },
    {
      title: "Answered",
      dataIndex: "answered",
      key: "id",
      render: (answered) => <Checkbox checked={answered} disabled />
    },
    {
      title: "Vote",
      dataIndex: "vote",
      key: "id",
      render: (vote) => (
        <Button shape="circle">
          <Space size={2}>
            <LikeOutlined />
            {vote}
          </Space>
        </Button>
      )
    }
  ];

  return (
    <>
      <Modal
        centered
        title="Questions from viewers"
        open={showModal}
        footer={false}
        onCancel={() => setShowModal(false)}
        width="60%"
      >
        <Table dataSource={questions} columns={columns} rowKey="id" />
        <Form form={form} layout="inline" onFinish={onSubmit}>
          <Typography.Text>Ask your question here</Typography.Text>
          <Row className="expand">
            <Col flex={1}>
              <Form.Item
                name="text"
                rules={[{ required: true, validateTrigger: "onSubmit" }]}
              >
                <TextArea disabled={formDisabled} rows={1} />
              </Form.Item>
            </Col>
            <Col>
              <MyButton loading={formLoading} primary submit>
                Submit
              </MyButton>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Badge count={5} size="small">
        <QuestionCircleFilled
          onClick={() => setShowModal(true)}
          style={{ fontSize: "20px" }}
        />
      </Badge>
    </>
  );
}

QuestionButton.propTypes = {
  sessionId: PropTypes.string.isRequired
};

// QuestionButton.defaultProps = {
//   sessionId: false
// };
