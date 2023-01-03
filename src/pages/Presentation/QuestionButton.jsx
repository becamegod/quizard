import {
  CheckCircleFilled,
  CheckCircleOutlined,
  LikeOutlined,
  QuestionCircleFilled
} from "@ant-design/icons";
import {
  Badge,
  Button,
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
import React, { useEffect, useState, useContext } from "react";

import PropTypes from "prop-types";
import sessions from "../../api/sessions";
import MyButton from "../../components/UI/MyButton";
import utils from "../../utils";
import constants from "../../utils/constants";
import notifier from "../../utils/notifier";
import { SocketContext } from "../../context/socket";
import socketEvents from "../../utils/socketEvents";

const getButtonType = (liked) => (liked ? "primary" : "default");
let user = localStorage.getItem(constants.user);
if (user) user = JSON.parse(user);
export default function QuestionButton({ sessionId, isHost }) {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isHaveNewQuestion, setIsHaveNewQuestion] = useState(false);
  const socket = useContext(SocketContext);

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

  useEffect(() => {
    socket.on(socketEvents.addQuestion, (newQuestion) => {
      const newQuestions = [...questions];
      newQuestions.push(newQuestion);
      setQuestions(newQuestions);
      if (!showModal) {
        setIsHaveNewQuestion(true);
      }
    });
    socket.on(socketEvents.likeQuestion, ({ newLikes, questionIndex }) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].likes = newLikes;
      setQuestions(newQuestions);
    });
    socket.on(socketEvents.markedQuestion, ({ newAnswered, questionIndex }) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].answered = newAnswered;
      setQuestions(newQuestions);
    });
    return () => {
      socket.off(socketEvents.addQuestion);
      socket.off(socketEvents.likeQuestion);
      socket.off(socketEvents.markedQuestion);
    };
  }, [questions, showModal]);

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

  const toggleLike = async (questionIndex) => {
    try {
      const { data } = await sessions.toggleLike(sessionId, questionIndex);
      const newQuestions = questions.slice();
      newQuestions[questionIndex].likes = data.likes;
      setQuestions(newQuestions);
    } catch (error) {
      console.log(error);
      notifier.notifyError("Couldn't like question");
    }
  };

  const toggleAnswered = async (questionIndex) => {
    try {
      const { data } = await sessions.toggleAnswered(sessionId, questionIndex);
      const newQuestions = questions.slice();
      newQuestions[questionIndex].answered = data.answered;
      setQuestions(newQuestions);
    } catch (error) {
      console.log(error);
      notifier.notifyError("Couldn't mark question answered");
    }
  };

  const columns = [
    {
      title: "Answered",
      dataIndex: "answered",
      width: 100,
      align: "center",
      render: (answered, _, questionIndex) => {
        let disabled = false;
        if (!isHost) {
          disabled = true;
        }
        const buttonType = getButtonType(answered);
        const icon = answered ? <CheckCircleFilled /> : <CheckCircleOutlined />;
        return (
          <Button
            shape="circle"
            type={buttonType}
            onClick={() => toggleAnswered(questionIndex)}
            disabled={disabled}
          >
            {icon}
          </Button>
        );
      },
      sorter: { compare: (a, b) => a.answered - b.answered, multiple: 3 }
    },
    {
      title: "Question",
      dataIndex: "text"
    },
    {
      title: "Time",
      dataIndex: "date",
      width: 200,
      render: (date) => (
        <Typography.Text type="secondary">
          {utils.timeDifference(date)}
        </Typography.Text>
      ),
      sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date)
    },
    {
      title: "Like",
      dataIndex: "likes",
      width: 150,
      align: "center",
      render: (likes, _, questionIndex) => {
        const voteButtonType = getButtonType(likes.includes(user.id));
        return (
          <Button
            shape="circle"
            type={voteButtonType}
            onClick={() => toggleLike(questionIndex)}
          >
            <Space size={2}>
              <LikeOutlined />
              {likes.length}
            </Space>
          </Button>
        );
      },
      sorter: (a, b) => a.likes.length - b.likes.length
    }
  ];

  if (sessions)
    return (
      <>
        <Modal
          centered
          title="Questions from viewers"
          open={showModal}
          footer={false}
          onCancel={() => setShowModal(false)}
          width={800}
        >
          <Table
            dataSource={questions}
            columns={columns}
            rowKey="date"
            scroll={{ y: 600 }}
            pagination={false}
          />
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
        <Badge dot={isHaveNewQuestion}>
          <QuestionCircleFilled
            onClick={() => {
              setShowModal(true);
              setIsHaveNewQuestion(false);
            }}
            style={{ fontSize: "20px" }}
          />
        </Badge>
      </>
    );
}

QuestionButton.propTypes = {
  sessionId: PropTypes.string.isRequired,
  isHost: PropTypes.bool.isRequired
};

// QuestionButton.defaultProps = {
//   sessionId: false
// };
