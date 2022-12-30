import { Card, Col, Row, Tabs } from "antd";

import { React, useState } from "react";
import Title from "antd/lib/typography/Title";

import CreateButton from "./CreateButton";
import PresentationTable from "./PresentationTable";

export default function PresentationList() {
  const [reload, setReload] = useState(0);
  const createButton = (
    <Col span={12}>
      <Row justify="end" align="middle" gutter={[20, 0]}>
        <Col>
          <CreateButton onCreate={() => setReload(reload + 1)} />
        </Col>
      </Row>
    </Col>
  );

  return (
    <Card className="group-member-card">
      <Row style={{ marginBottom: "24px" }}>
        <Col span={12}>
          <Row justify="start">
            <Title>Presentations</Title>
          </Row>
        </Col>
        {createButton}
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
            items={[
              {
                key: "1",
                label: "Owned Presentation",
                children: <PresentationTable category="owned" key={reload} />
              },
              {
                key: "2",
                label: "Collaborate Presentation",
                children: (
                  <PresentationTable category="collaborate" key={reload} />
                )
              }
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
}
