import {
  Card,
  Row,
  Col,
  Typography,
  Input,
  Table,
  Form,
  notification,
  Modal
} from "antd";
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Presentation from "../../api/presentations";
import MyButton from "../../components/UI/MyButton";
import LoadingIcon from "../../components/LoadingIcon";

const { Title } = Typography;

export default function Collaborator() {
  const presentationId = useParams();
  const [presentation, setPresentation] = useState(null);
  const [collaborators, setCollaborators] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchData() {
      const res = await Presentation.getCollaborators(presentationId);
      setCollaborators(res.data.presentation.collaborators);
      setPresentation(res.data.presentation);
    }
    fetchData();
  }, []);

  const onFinish = async (values) => {
    try {
      const res = await Presentation.addCollaborator(
        presentationId.presentationId,
        values.email
      );
      const newCollaborators = [...collaborators];
      newCollaborators.push(res.data.user);
      form.setFieldValue("email", "");
      setCollaborators(newCollaborators);
      notification.success({
        message: "Add collaborator succeed",
        style: {
          borderRadius: "10px"
        }
      });
    } catch (err) {
      const { status } = err.request;
      let description;
      switch (status) {
        case 409:
          description = "Add collaborator failed";
          break;
        case 404:
          description = "Email not found";
          break;

        case 400:
          description = "User has already been a collaborator";
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

  const handleOnOk = async (id) => {
    try {
      const res = await Presentation.deleteCollaborator(
        presentationId.presentationId,
        id
      );
      setCollaborators(res.data.collaborators);
      setRemoveModalVisible(false);
      notification.success({
        message: "Delete collaborator succeed",
        style: {
          borderRadius: "10px"
        }
      });
    } catch (err) {
      const { status } = err.request;
      let description;
      switch (status) {
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong style={{ color: "#0E86D4" }}>
              {text}
            </Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Typography.Text strong style={{ color: "black" }}>
              {email}
            </Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      key: "action",
      render: (_, record) => (
        <Row align="end" gutter={[8, 0]}>
          <Col>
            <MyButton
              primary
              danger
              shape="round"
              onClick={() => {
                setRemoveModalVisible(true);
                setSelectedId(record.id);
              }}
              icon={<DeleteOutlined />}
            >
              Delete
            </MyButton>
          </Col>
        </Row>
      )
    }
  ];

  const list = (
    <Col span={24}>
      <Table
        dataSource={collaborators}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </Col>
  );

  if (collaborators) {
    return (
      <Card>
        <Row justify="space-between" style={{ marginBottom: "32px" }}>
          <Col flex={1}>
            <Title>Collaborators</Title>
          </Col>
        </Row>
        <Row style={{ marginBottom: "32px" }} justify="space-between">
          <Col>
            <Title level={2}>{presentation.name}</Title>
          </Col>
          <Form layout="inline" onFinish={onFinish} form={form}>
            <Form.Item name="email" style={{ flex: 1 }}>
              <Input
                placeholder="Email"
                type="email"
                style={{
                  marginTop: "8px"
                }}
                required
              />
            </Form.Item>
            <Form.Item>
              <MyButton
                style={{ marginTop: "4px", marginLeft: "28px" }}
                primary
                submit
                icon={<UserAddOutlined />}
              >
                Add collaborator
              </MyButton>
            </Form.Item>
          </Form>
        </Row>
        {list}
        <Modal
          title="Remove Collaborator"
          open={removeModalVisible}
          onOk={() => handleOnOk(selectedId)}
          onCancel={() => {
            setRemoveModalVisible(false);
          }}
        >
          <p>Are you sure to remove this collaborator?</p>
        </Modal>
      </Card>
    );
  }
  return (
    <Row justify="center">
      <LoadingIcon />
    </Row>
  );
}
