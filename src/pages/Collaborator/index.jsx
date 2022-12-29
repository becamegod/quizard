import {
  Card,
  Row,
  Col,
  Typography,
  Input,
  Button,
  Table,
  Form,
  notification,
  Space
} from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Presentation from "../../api/presentations";

const { Title } = Typography;

export default function Collaborator() {
  const presentationId = useParams();
  const [collaborators, setCollaborators] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await Presentation.getCollaborators(presentationId);
      setCollaborators(res.data.collaborators);
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
      setCollaborators(newCollaborators);
      notification.success({
        message: "Add collaborator succeed",
        style: {
          backgroundColor: "#FFF1F0",
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

  const handleOnClick = async (id) => {
    try {
      const res = await Presentation.deleteCollaborator(
        presentationId.presentationId,
        id
      );
      setCollaborators(res.data.collaborators);
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Row align="middle" gutter={[8, 0]}>
          <Button danger shape="round" onClick={() => handleOnClick(record.id)}>
            <Space>
              Delete <DeleteOutlined />
            </Space>
          </Button>
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
            <Title level={2}>New Presentationfdfg</Title>
          </Col>
          <Form layout="inline" onFinish={onFinish}>
            <Form.Item name="email" style={{ flex: 1 }}>
              <Input
                placeholder="Email"
                type="email"
                style={{
                  marginTop: "8px"
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginTop: "4px", marginLeft: "28px" }}
                htmlType="submit"
              >
                Add collaborator
              </Button>
            </Form.Item>
          </Form>
        </Row>
        {list}
      </Card>
    );
  }
}
