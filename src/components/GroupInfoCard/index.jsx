import { React, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Row, Card, Col, Input, Button } from "antd";

export default function GroupInfoCard() {
  const onInvite = () => {
    console.log("invite");
  };

  useEffect(() => {
    console.log("GroupInfoCard");
  }, []);

  return (
    <Card className="round">
      <Row>
        <Col span={12}>
          <Row justify="start">
            <h1>Group Name</h1>
          </Row>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={onInvite}
            >
              Invite
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
