import { InfoCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Space, Typography } from "antd";
import React, { useEffect, useState, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";
import groups from "../../api/groups";
import MyButton from "../../components/UI/MyButton";
import constants from "../../utils/constants";
import "./index.css";

export default function NotifyPresentingCard() {
  const { groupId } = useParams();
  const [visible, setVisible] = useState(false);
  const [presentationId, setPresentationId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await groups.getCurrentPresentation(groupId);
        console.log(data);
        const { presentation } = data;
        if (presentation) {
          setVisible(true);
          setPresentationId(presentation.id);
        } else setVisible(false);
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  const join = useCallback(() => {
    navigate(`${constants.presentationsUrl}/${presentationId}`);
  }, [presentationId]);

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
