import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Space, Typography } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import groups from "../../api/groups";
import MyButton from "../../components/UI/MyButton";
import { SocketContext } from "../../context/socket";
import constants from "../../utils/constants";
import notifier from "../../utils/notifier";
import socketEvents from "../../utils/socketEvents";
import "./index.css";

export default function NotifyPresentingCard() {
  const { groupId } = useParams();
  const [visible, setVisible] = useState(false);
  const [presentationId, setPresentationId] = useState();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const join = useCallback(() => {
    navigate(`${constants.presentationsUrl}/${presentationId}`);
  }, [presentationId]);

  const handlePresentation = (presentation) => {
    if (presentation) {
      setVisible(true);
      setPresentationId(presentation.id);
      notifier.notifyInfo("The group is having a presentation");
    } else setVisible(false);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await groups.getCurrentPresentation(groupId);
        const { presentation } = data;
        handlePresentation(presentation);
      } catch {
        notifier.notifyError();
      }
    };
    init();

    socket.on(socketEvents.presentationInGroup(groupId), (presentation) => {
      handlePresentation(presentation);
    });

    return () => {
      socket.off(socketEvents.presentationInGroup(groupId));
    };
  }, []);

  if (!visible) return null;

  return (
    <Card className="notify-card">
      <Row justify="space-between">
        <Col>
          <Typography.Title level={3} style={{ color: "red" }}>
            <Space>
              <InfoCircleOutlined />
              The group is having a presentation.
            </Space>
          </Typography.Title>
        </Col>
        <Col>
          <MyButton primary onClick={join}>
            Join now
          </MyButton>
        </Col>
      </Row>
    </Card>
  );
}
