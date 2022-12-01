import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography
} from "antd";
import {
  UserOutlined,
  DeleteOutlined,
  SettingOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupService from "../../services/groups";
import InviteButton from "../InviteButton";

export default function GroupMemberCard() {
  const { groupId } = useParams();
  const [members, setMembers] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [changeRoleModalVisible, setChangeRoleModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [form] = Form.useForm();
  const [stage, setStage] = useState(0);
  const removeUser = async () => {
    try {
      await GroupService.kick({
        groupId,
        email: selectedMember.email
      });
      setStage(0);
      notification.success({
        message: "Remove User Success",
        description: "User removed successfully",
        duration: 2
      });
    } catch (error) {
      notification.error({
        message: "Remove User Failed",
        description: "User remove failed",
        duration: 2
      });
    }
    setRemoveModalVisible(false);
  };
  const changeRole = async () => {
    try {
      await GroupService.changeRole({
        groupId,
        roleWantToChange: form.getFieldValue("role"),
        email: selectedMember.email
      });
      setStage(0);
      notification.success({
        message: "Change Role Success",
        description: "Role changed successfully",
        duration: 2
      });
    } catch (error) {
      notification.error({
        message: "Change Role Failed",
        description: "Role change failed",
        duration: 2
      });
    }
    setChangeRoleModalVisible(false);
  };
  const priority = {
    Owner: 1,
    "Co-Owner": 2,
    Member: 3
  };
  const color = {
    Owner: "gold",
    "Co-Owner": "purple",
    Member: "lime"
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Row align="middle" gutter={[8, 0]}>
          <Col>
            <Avatar size="24" src="" icon={<UserOutlined />} />
          </Col>
          <Col>
            <Typography.Text strong style={{ color: "#0E86D4" }}>
              {text}
            </Typography.Text>
          </Col>
        </Row>
      )
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (_, { role }) => {
        return (
          <Tag color={color[role]} key={role}>
            {role}
          </Tag>
        );
      },
      sorter: (a, b) => priority[a.role] - priority[b.role],
      defaultSortOrder: "ascend",
      filters: [
        {
          text: "Owner",
          value: "owner"
        },
        {
          text: "Co-owner",
          value: "co-owner"
        },
        {
          text: "Member",
          value: "member"
        }
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" direction="horizontal">
          <Button
            danger
            shape="round"
            onClick={() => {
              setSelectedMember(record);
              setRemoveModalVisible(true);
            }}
            hidden={record.role === "Owner" || record.role === "Co-Owner"}
          >
            <DeleteOutlined />
          </Button>
          <Button
            shape="round"
            onClick={() => {
              setSelectedMember(record);
              setChangeRoleModalVisible(true);
            }}
            hidden={record.role === "Owner"}
          >
            <SettingOutlined />
          </Button>
        </Space>
      )
    }
  ];

  useEffect(() => {
    async function fetchData() {
      const { data } = await GroupService.detail(groupId);
      setMembers(data.joinedUser);
      setStage(1);
    }
    if (stage === 0) {
      fetchData();
    }
  }, [groupId, stage]);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: "red" }} spin />
  );

  switch (stage) {
    case 1:
      return (
        <Card className="round group-member-card">
          <Row style={{ marginBottom: "24px" }}>
            <Col span={12}>
              <Row justify="start">
                <h1>Group Members</h1>
              </Row>
            </Col>
            <Col span={12}>
              <Row justify="end" align="middle" gutter={[20, 0]}>
                <Col>
                  {/* <Button
                    type="primary"
                    shape="round"
                    icon={<UserAddOutlined />}
                  >
                    Invite
                  </Button> */}
                  <InviteButton group={groupId} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={24}>
              <Table
                dataSource={members}
                columns={columns}
                pagination={{ pageSize: 10 }}
                rowKey="_id"
              />
            </Col>
          </Row>
          <Modal
            title="Remove user"
            open={removeModalVisible}
            onOk={() => removeUser()}
            onCancel={() => {
              setRemoveModalVisible(false);
            }}
          >
            <p>Are you sure to remove this user?</p>
          </Modal>
          <Modal
            title="Change role"
            open={changeRoleModalVisible}
            onOk={() => changeRole()}
            onCancel={() => {
              setChangeRoleModalVisible(false);
            }}
          >
            <p>Change role to:</p>
            <Form form={form}>
              <Form.Item name="role" initialValue="Member">
                <Select style={{ width: "100%" }}>
                  <Select.Option value="Member">Member</Select.Option>
                  <Select.Option value="Co-Owner">Co-Owner</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      );
    default:
      return (
        <Card className="round group-member-card">
          <Row style={{ marginBottom: "24px" }}>
            <Col span={12}>
              <Row justify="start">
                <h1>Group Members</h1>
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
