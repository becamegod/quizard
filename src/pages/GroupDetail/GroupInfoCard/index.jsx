import { React, useEffect, useState } from "react";
import {
  EditOutlined,
  UserOutlined,
  SaveOutlined,
  LoadingOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
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
  Modal
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import groups from "../../../api/groups";
import "./index.css";
import LoadingIcon from "../../../components/LoadingIcon";
import constants from "../../../utils/constants";
import notifier from "../../../utils/notifier";

export default function GroupInfoCard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userRole, setUserRole] = useState("Member");
  const [editMode, setEditMode] = useState(false);
  const [stage, setStage] = useState(0);
  const [busy, setBusy] = useState(false);
  const [owner, setOwner] = useState({
    name: "",
    avatar: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { groupId } = useParams();
  const [form] = Form.useForm();

  const enableEdit = () => {
    setEditMode(!editMode);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      setIsModalOpen(false);
      await groups.delete(groupId);
      notification.success({
        message: "Delete Group Succeed",
        duration: 2
      });
      navigate("/groups");
    } catch (err) {
      const { status } = err.request;
      let description;
      switch (status) {
        case 403:
          description = "Forbidden";
          break;

        default:
          description = "Something's wrong. Please try again later.";
          break;
      }
      notification.error({
        message: "Error",
        description,
        icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
        style: {
          backgroundColor: "#FFF1F0",
          borderRadius: "10px"
        }
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setEditMode(false);
      notification.success({
        message: "Update Succeed",
        duration: 2
      });
    }, 2000); // 2s
  };
  const onFinishFailed = (errorInfo) => {
    throw new Error(errorInfo);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await groups.detail(groupId);
        const { group } = data;
        setOwner(group.joinedUser.find((member) => member.role === "Owner"));
        setUserRole(
          group.joinedUser.find((member) => member.id === user.id).role
        );
        form.setFieldsValue({
          name: group.name,
          description: group.description
        });
        setStage(1);
      } catch (error) {
        if (error.response.status === 403) {
          notifier.notifyError("You're not the member of that group");
          navigate(constants.homeUrl);
        }
      }
    }
    if (stage === 0) {
      fetchData();
    }
  }, [groupId]);

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
                    style={{
                      marginBottom: "120px"
                    }}
                    icon={<EditOutlined />}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
              <Row justify="end">
                <Col>
                  <Button
                    type="primary"
                    shape="round"
                    danger
                    onClick={showModal}
                    icon={<DeleteOutlined />}
                  >
                    Delete
                  </Button>
                </Col>
                <Modal
                  title="Delete group"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <p>Do you want to delete this group?</p>
                </Modal>
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
              <LoadingIcon />
            </Col>
          </Row>
        </Card>
      );
  }
}
