import {
  Card,
  Row,
  Col,
  Typography,
  Input,
  Button,
  List,
  Form,
  notification
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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

  const handleOnClick = (id) => {};
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
        <List
          bordered
          style={{ overflow: "auto", height: "300px" }}
          dataSource={collaborators}
          renderItem={(item) => (
            <List.Item style={{ justify: "space-between" }}>
              <List.Item.Meta title={item.name} description={item.email} />
              <Button shape="round" danger onClick={handleOnClick(item._id)}>
                Delete
              </Button>
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
