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
  notification,
  Spin
} from "antd";
import { useParams } from "react-router-dom";
import GroupService from "../../services/groups";
import "./GroupInfoCard.css";

export default function GroupInfoCard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userRole, setUserRole] = useState("Member");
  const [editMode, setEditMode] = useState(false);
  const [stage, setStage] = useState(0);
  const [busy, setBusy] = useState(false);
  const [owner, setOwner] = useState({
    name: "",
    avatar: ""
  });
  const { groupId } = useParams();
  const [form] = Form.useForm();

  const enableEdit = () => {
    setEditMode(!editMode);
  };
  const onFinish = () => {
    setBusy(true);
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
    throw new Error(errorInfo);
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await GroupService.detail(groupId);
      setOwner(data.joinedUser.find((member) => member.role === "Owner"));
      setUserRole(
        // eslint-disable-next-line no-underscore-dangle
        data.joinedUser.find((member) => member._id === user._id).role
      );
      form.setFieldsValue({
        name: data.name,
        description: data.description
      });
      setStage(1);
    }
    if (stage === 0) {
      fetchData();
    }
  }, [groupId]);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: "red" }} spin />
  );

  switch (stage) {
    case 1:
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
                  <Avatar
                    size={32}
                    src={owner.avatar}
                    icon={<UserOutlined />}
                  />
                  <Typography.Text> {owner.name} </Typography.Text>
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
                form={form}
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
                    <Button
                      type="danger"
                      shape="round"
                      onClick={() => enableEdit()}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span={4} hidden={editMode || userRole !== "Owner"}>
              <Row justify="end">
                <Col>
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() => enableEdit()}
                    icon={<EditOutlined />}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      );
    default:
      return (
        <Card className="round">
          <Row style={{ marginBottom: "24px" }}>
            <Col span={12}>
              <Row justify="start">
                <h1>Group Information</h1>
              </Row>
            </Col>
          </Row>
          <Row justify="center" style={{ marginBottom: "32px" }}>
            <Col>
              <Spin size="large" indicator={antIcon} />
            </Col>
          </Row>
        </Card>
      );
  }
}
