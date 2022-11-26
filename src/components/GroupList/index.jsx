import React from "react";
import { Row, Col, Pagination, Space } from "antd";
import GroupCard from "../GroupCard";

export default function GroupList() {
  // Group list from database (for now, just a dummy list of 5 groups)
  const groupList = [
    {
      id: "1",
      name: "Group 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctoraouigfigasfuighis sdjkfbgjhsdgfjbgds fdgbfdighizdhgfighuidfhgiuhdfiughfiduhgiuhsdfiughidfhg",
      members: 4,
      maxMembers: 15
    },
    {
      id: "2",
      name: "Group 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctoraouigfigasfuighis sdjkfbgjhsdgfjbgds fdgbfdighizdhgfighuidfhgiuhdfiughfiduhgiuhsdfiughidfhg",
      members: 0,
      maxMembers: 15
    },
    {
      id: "3",
      name: "Group 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctoraouigfigasfuighis sdjkfbgjhsdgfjbgds fdgbfdighizdhgfighuidfhgiuhdfiughfiduhgiuhsdfiughidfhg",
      members: 4,
      maxMembers: 15
    },
    {
      id: "4",
      name: "Group 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctoraouigfigasfuighis sdjkfbgjhsdgfjbgds fdgbfdighizdhgfighuidfhgiuhdfiughfiduhgiuhsdfiughidfhg",
      members: 4,
      maxMembers: 16
    },
    {
      id: "5",
      name: "Group 5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctoraouigfigasfuighis sdjkfbgjhsdgfjbgds fdgbfdighizdhgfighuidfhgiuhdfiughfiduhgiuhsdfiughidfhg",
      members: 4,
      maxMembers: 15
    },
    {
      id: "6",
      name: "Group 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctoraouigfigasfuighis sdjkfbgjhsdgfjbgds fdgbfdighizdhgfighuidfhgiuhdfiughfiduhgiuhsdfiughidfhg",
      members: 4,
      maxMembers: 15
    },
    {
      id: "7",
      name: "Group 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctoraouigfigasfuighis sdjkfbgjhsdgfjbgds fdgbfdighizdhgfighuidfhgiuhdfiughfiduhgiuhsdfiughidfhg",
      members: 0,
      maxMembers: 15
    },
    {
      id: "8",
      name: "Group 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctoraouigfigasfuighis sdjkfbgjhsdgfjbgds fdgbfdighizdhgfighuidfhgiuhdfiughfiduhgiuhsdfiughidfhg",
      members: 4,
      maxMembers: 15
    },
    {
      id: "9",
      name: "Group 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctoraouigfigasfuighis sdjkfbgjhsdgfjbgds fdgbfdighizdhgfighuidfhgiuhdfiughfiduhgiuhsdfiughidfhg",
      members: 4,
      maxMembers: 16
    }
  ];

  const changePage = (page, pageSize) => {
    console.log(page, pageSize);
  };

  return (
    <Space direction="vertical" size={48}>
      <Row justify="start" align="middle" gutter={[32, 32]}>
        {groupList.map((group) => (
          <Col key={group.id} span={8}>
            <GroupCard group={group} />
          </Col>
        ))}
      </Row>
      <Row justify="center">
        <Pagination
          simple
          defaultCurrent={2}
          total={50}
          onChange={changePage}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px"
          }}
        />
      </Row>
    </Space>
  );
}
