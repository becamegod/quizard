import { Card, Col, Row, Tabs } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import CreateGroupButton from "./CreateGroupButton";
import GroupList from "./GroupList";
import "./index.css";

export default function GroupsPage() {
  const [reload, setReload] = useState(0);

  return (
    <Card>
      <Row justify="space-between" style={{ marginBottom: "32px" }}>
        <Col flex={1}>
          <Title>Groups</Title>
        </Col>
        <Col>
          <CreateGroupButton onCreate={() => setReload(reload + 1)} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Tabs
            className="content-holder"
            tabBarStyle={{
              paddingRight: "20px",
              fontSize: "24px",
              fontWeight: "bold"
            }}
            tabPosition="right"
            defaultActiveKey="1"
            // key={reload}
            items={[
              {
                key: "1",
                label: "All Groups",
                children: <GroupList category="all" key={reload} />
              },
              {
                key: "2",
                label: "My Groups",
                children: <GroupList category="owned" key={reload} />
              },
              {
                key: "3",
                label: "Joined Groups",
                children: <GroupList category="joined" key={reload} />
              }
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
}
