import React, { useEffect, useState, useContext, useRef } from "react";
import { Button, Drawer, Input, List, Row, Typography, Form, Col } from "antd";
import { SendOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import moment from "moment";
import Sessions from "../../api/sessions";
import Loading from "../../components/Loading";
import { SocketContext } from "../../context/socket";
import socketEvents from "../../utils/socketEvents";
import "./ChatBox.css";

export default function ChatBox({
  isOpen,
  handleCloseChatBox,
  sessionId,
  handleIsNewMessageTrue,
  handleIsNewMessageFalse
}) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(null);
  const socket = useContext(SocketContext);
  const listRef = useRef(null);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
    handleCloseChatBox();
  };

  const fetchChats = async () => {
    const res = await Sessions.getChats({ sessionId });
    setChats(res.data.chats);
  };

  useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    setUser(userLocalStorage);
    fetchChats();
  }, []);

  useEffect(() => {
    socket.on(socketEvents.chat, (newMessage) => {
      const userLocalStorage = JSON.parse(localStorage.getItem("user"));
      if (chats) {
        const newChats = [...chats];
        newChats.push(newMessage);
        setChats(newChats);
        listRef.current.scrollTo(listRef.current.clientHeight);
      }
      if (!isOpen && newMessage.user.id !== userLocalStorage.id) {
        handleIsNewMessageTrue();
      }
    });
    return () => {
      socket.off(socketEvents.chat);
    };
  }, [chats, isOpen]);

  useEffect(() => {
    if (isOpen) {
      handleIsNewMessageFalse();
      showDrawer();
    }
  }, [isOpen]);

  const [form] = Form.useForm();

  const handleSendMessage = async (values) => {
    form.setFieldValue("message", "");
    await Sessions.sendMessage(sessionId, values.message);
  };

  const footer = (
    <div
      className="chat-box-footer"
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "16px"
      }}
    >
      <Form
        form={form}
        layout="inline"
        style={{ width: "100%" }}
        onFinish={handleSendMessage}
      >
        <Col flex={1}>
          <Form.Item name="message">
            <Input
              className="round"
              placeholder="Chat with other participants"
              style={{ width: "100%", fontWeight: "600" }}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button
              type="primary"
              style={{
                width: "60px",
                height: "30px",
                alignItems: "center",
                display: "flex",
                justifyContent: "center"
              }}
              htmlType="submit"
            >
              <SendOutlined />
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </div>
  );
  if (chats) {
    return (
      <Drawer
        className="chat-box"
        placement="right"
        onClose={onClose}
        open={open}
        footer={footer}
        title="Chat"
        width="30%"
      >
        <List
          style={{ height: "100%", overflow: "auto" }}
          ref={listRef}
          itemLayout="horizontal"
          dataSource={chats}
          renderItem={(item) => {
            const localDate = new Date(item.date);
            if (item.user.id === user.id) {
              return (
                <div style={{ marginBottom: "10px" }}>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginBottom: "4px"
                    }}
                  >
                    <Typography.Text>
                      <b>You </b>{" "}
                      <span style={{ fontWeight: 300 }}>
                        at {moment(localDate).format("HH:mm").toString()}
                      </span>
                    </Typography.Text>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      height: "30%"
                    }}
                  >
                    <Col
                      style={{
                        borderRadius: "16px",
                        padding: "8px",
                        backgroundColor: "#00cc11",
                        maxWidth: "50%"
                      }}
                    >
                      <Typography.Text
                        style={{
                          color: "white",
                          justifyContent: "end",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        {item.message}
                      </Typography.Text>
                    </Col>
                  </Row>
                </div>
              );
            }
            return (
              <div style={{ marginBottom: "!2px" }}>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    marginBottom: "4px"
                  }}
                >
                  <Typography.Text>
                    <b>{item.user.name}</b>{" "}
                    <span style={{ fontWeight: 300 }}>
                      at {moment(localDate).format("HH:mm").toString()}
                    </span>
                  </Typography.Text>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    height: "30%"
                  }}
                >
                  <Col
                    style={{
                      backgroundColor: "#e4e6eb",
                      borderRadius: "16px",
                      padding: "8px",
                      maxWidth: "50%"
                    }}
                  >
                    <Typography.Text
                      style={{
                        color: "black",
                        justifyContent: "start",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {item.message}
                    </Typography.Text>
                  </Col>
                </Row>
              </div>
            );
          }}
        />
      </Drawer>
    );
  }
  return (
    <Drawer placement="right" onClose={onClose} open={open} title="Chat">
      <Loading />
    </Drawer>
  );
}

ChatBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCloseChatBox: PropTypes.func.isRequired,
  sessionId: PropTypes.string.isRequired,
  handleIsNewMessageTrue: PropTypes.func.isRequired,
  handleIsNewMessageFalse: PropTypes.func.isRequired
};
