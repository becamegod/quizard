import React from "react";
import {
  Row,
  // Space,
  Table,
  Tag,
  Avatar,
  Button,
  Col,
  Typography,
  Card
} from "antd";
import { UserOutlined, DeleteOutlined } from "@ant-design/icons";

export default function GroupMemberCard() {
  const removeUser = (record) => {
    console.log("remove user", record);
  };
  const invite = () => {
    console.log("invite");
  };
  const priority = {
    owner: 1,
    "co-owner": 2,
    member: 3
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
        let color = "gold";
        if (role === "co-owner") color = "purple";
        if (role === "member") color = "lime";
        return (
          <Tag color={color} key={role}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
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
        <Button danger shape="round" onClick={() => removeUser(record)}>
          <DeleteOutlined />
        </Button>
      )
    }
  ];

  const data = [
    {
      key: "2",
      name: "Jim Green",
      role: "co-owner"
    },
    {
      key: "1",
      name: "John Brown",
      role: "owner"
    },
    {
      key: "3",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "4",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "5",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "6",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "7",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "8",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "9",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "10",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "11",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "12",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "13",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "14",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "16",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "17",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "18",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "19",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "20",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "21",
      name: "Joe Black",
      role: "member"
    },
    {
      key: "22",
      name: "Joe Black",
      role: "member"
    }
  ];

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
                icon={<UserOutlined />}
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
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 10 }}
          />
        </Col>
      </Row>
    </Card>
  );
}
