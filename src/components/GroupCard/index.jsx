import React from "react";
import { Row, Col, Button, Typography } from "antd";
import "./GroupCard.css";
import { UserOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export default function GroupCard({ group }) {
  return (
    <div
      className="group-card"
      style={{
        backgroundColor: "#00B30F",
        backgroundImage: "url(/img/group_img.png)"
      }}
    >
      <Row className="group-title" align="bottom">
        <Col align="left" span={12}>
          <Typography.Title level={4} style={{ color: "white" }}>
            {group.name}
          </Typography.Title>
        </Col>
        <Col align="right" span={12}>
          <Button className="group-button" type="info">
            Join
          </Button>
        </Col>
      </Row>
      <Row className="group-description">
        <Col span={12} align="left" style={{ height: "35px" }}>
          <p style={{ fontWeight: "500", fontSize: "16px" }}> Descriptions </p>
        </Col>
        <Col span={12} align="right" style={{ height: "35px" }}>
          <p>
            <UserOutlined /> {group.members}/{group.maxMembers}
          </p>
        </Col>
        <Typography.Paragraph
          ellipsis={{ rows: 2, expandable: false, symbol: "more" }}
        >
          {group.description}
        </Typography.Paragraph>
      </Row>
    </div>
  );
}

GroupCard.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    members: PropTypes.number.isRequired,
    maxMembers: PropTypes.number.isRequired
  }).isRequired
};
