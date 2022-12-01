import { React, useState, useEffect } from "react";
import {
  Row,
  Space,
  Table,
  Tag,
  Avatar,
  Button,
  Col,
  Typography,
  Card,
  Modal,
  notification,
  Form,
  Select
} from "antd";
import {
  UserOutlined,
  DeleteOutlined,
  UserAddOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import GroupService from "../../services/groups";

export default function GroupMemberCard() {
  const { groupId } = useParams();
  const [members, setMembers] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [changeRoleModalVisible, setChangeRoleModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [form] = Form.useForm();
  const removeUser = async () => {
    console.log("remove user", selectedMember);
    try {
      const { data } = await GroupService.removeUser(groupId, selectedMember);
      console.log(data);
      setMembers(data.joinedUser);
      notification.success({
        message: "Remove User Success",
        description: "User removed successfully",
        duration: 2
      });
    } catch (error) {
      console.log(error);
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
      const data = await GroupService.changeRole({
        groupId,
        roleWantToChange: form.getFieldValue("role"),
        selectedMember
      });
      setMembers(data.joinedUser);
      notification.success({
        message: "Change Role Success",
        description: "Role changed successfully",
        duration: 2
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Change Role Failed",
        description: "Role change failed",
        duration: 2
      });
    }
    setChangeRoleModalVisible(false);
  };
  const invite = () => {
    console.log("invite");
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
            hidden={record.role === "Owner"}
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
    }
    fetchData();
  }, [groupId]);

  return (
    <Card className="round">
      <Row style={{ marginBottom: "24px" }}>
        <Col span={12}>
          <Row justify="start">
            <h1>Group Members</h1>
          </Row>
        </Col>
        <Col span={12}>
          <Row justify="end" align="middle" gutter={[20, 0]}>
            <Col>
              <Button
                type="primary"
                shape="round"
                icon={<UserAddOutlined />}
                onClick={() => invite()}
              >
                Invite
              </Button>
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
}
