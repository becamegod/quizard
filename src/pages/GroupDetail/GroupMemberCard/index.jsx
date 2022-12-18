import {
  DeleteOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons";
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
  Table,
  Tag,
  Typography
} from "antd";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import groups from "../../../api/groups";
import LoadingIcon from "../../../components/LoadingIcon";
import InviteButton from "./InviteButton";

export default function GroupMemberCard() {
  const { groupId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userRole, setUserRole] = useState("Member");
  const [members, setMembers] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [changeRoleModalVisible, setChangeRoleModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [form] = Form.useForm();
  const [stage, setStage] = useState(0);
  const removeUser = async () => {
    try {
      await groups.kick({
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
      await groups.changeRole({
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
  const permission = (record) => {
    // eslint-disable-next-line no-underscore-dangle
    if (record._id === user._id) return false;
    if (record.role === "Owner") return false;
    if (record.role === "Co-Owner") return userRole === "Owner";
    if (record.role === "Member")
      return userRole === "Co-Owner" || userRole === "Owner";
    return false;
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
      render: (_, { role, _id }) => {
        return (
          <Space direction="horizontal" size="small">
            <Tag color={color[role]} key={role}>
              {role}
            </Tag>
            {/* eslint-disable-next-line no-underscore-dangle */}
            <Tag key="you" hidden={_id !== user._id}>
              You
            </Tag>
          </Space>
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
            hidden={!permission(record)}
          >
            <DeleteOutlined />
          </Button>
          <Button
            shape="round"
            onClick={() => {
              setSelectedMember(record);
              setChangeRoleModalVisible(true);
            }}
            hidden={!permission(record)}
          >
            <SettingOutlined />
          </Button>
        </Space>
      )
    }
  ];

  useEffect(() => {
    async function fetchData() {
      const { data } = await groups.detail(groupId);
      const { group } = data;
      setMembers(group.joinedUser);
      setUserRole(
        // eslint-disable-next-line no-underscore-dangle
        group.joinedUser.find((member) => member._id === user._id).role
      );
      setStage(1);
    }
    if (stage === 0) {
      fetchData();
    }
  }, [groupId, stage]);

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
              <LoadingIcon />
            </Col>
          </Row>
        </Card>
      );
  }
}
