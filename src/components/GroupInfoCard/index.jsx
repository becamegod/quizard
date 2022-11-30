import { React, useEffect, useState } from "react";
import {
  EditOutlined,
  UserOutlined,
  SaveOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  notification
} from "antd";

export default function GroupInfoCard() {
  const [editMode, setEditMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const onInvite = () => {
    console.log("invite");
  };
  const enableEdit = () => {
    console.log("edit");
    setEditMode(!editMode);
  };
  const onFinish = (values) => {
    setBusy(true);
    console.log("Success:", values);
    setTimeout(() => {
      setBusy(false);
      setEditMode(false);
      notification.success({
        message: "Update Success",
        description: "Group info updated successfully",
        duration: 2
      });
    }, 2000); // 2s
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
              <Typography.Text strong> Owner: </Typography.Text>
            </Col>
            <Col>
              <Avatar size={32} src="" icon={<UserOutlined />} />
              <Typography.Text> Owner Name </Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={20}>
          <Form
            name="group-info"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            disabled={!editMode}
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
            <Row justify="center" gutter={[12, 0]}>
              <Col hidden={!editMode}>
                <Form.Item>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<SaveOutlined />}
                    htmlType="submit"
                  >
                    Save <LoadingOutlined hidden={!busy} />
                  </Button>
                </Form.Item>
              </Col>
              <Col hidden={!editMode}>
                <Button type="danger" shape="round" onClick={enableEdit}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={4} hidden={editMode}>
          <Row justify="end" gutter={[8, 0]}>
            <Col>
              <Button type="primary" shape="round" onClick={enableEdit}>
                <EditOutlined />
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                shape="round"
                onClick={onInvite}
                icon={<UserOutlined />}
              >
                Invite
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
