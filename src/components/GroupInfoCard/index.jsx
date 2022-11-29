import { React, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { Row, Card, Col, Input, Button, Form, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function GroupInfoCard() {
  const onInvite = () => {
    console.log("invite");
  };

  useEffect(() => {
    console.log("GroupInfoCard");
  }, []);

  return (
    <Card className="round">
      <Row style={{ marginBottom: "24px" }}>
        <Col span={12}>
          <Row justify="start">
            <h1>Group Information</h1>
          </Row>
        </Col>
        <Col span={12}>
          <Row justify="end" align="middle" gutter={[20, 0]}>
            <Col>
              <Typography.Title level={5}> Owner: </Typography.Title>
            </Col>
            <Col>
              <Avatar size={32} src="" icon={<UserOutlined />} />
              <Typography.Text> Owner Name </Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Form
            name="group-info"
            layout="vertical"
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Group Name"
              name="name"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Please input your group name!"
                }
              ]}
            >
              <Input className="round" />
            </Form.Item>
            <Form.Item label="Group Description" name="description">
              <Input.TextArea className="round" />
            </Form.Item>
          </Form>
        </Col>
        <Col span={6}>
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
