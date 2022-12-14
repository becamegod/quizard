import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Typography } from "antd";
import "./index.css";
import { UserOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export default function GroupCard({ group }) {
  const memberCount =
    group.members && group.maxMembers ? (
      <Col span={12} align="right" style={{ height: "35px" }}>
        <p>
          <UserOutlined /> {group.members}/{group.maxMembers}
        </p>
      </Col>
    ) : null;
  return (
    <Link to={`/groups/${group.id}`}>
      <div
        className="group-card"
        style={{
          backgroundColor: "#00B30F",
          backgroundImage: "url(/img/cardBG.png)",
          backgroundSize: "cover"
        }}
      >
        <Row className="group-title" align="bottom">
          <Col align="left" span={12}>
            <Typography.Title
              level={4}
              style={{
                color: "white",
                textShadow: "1px 1px var(--dark-color)"
              }}
            >
              {group.name}
            </Typography.Title>
          </Col>
          {/* <Col align="right" span={12}>
            <Button className="group-button" type="info">
              Join
            </Button>
          </Col> */}
        </Row>
        <Row className="group-description">
          <Col align="left" span={24}>
            <Row>
              <Col span={12} style={{ height: "35px" }}>
                <p style={{ fontWeight: "500", fontSize: "16px" }}>
                  Description
                </p>
              </Col>
              <Col span={12}>
                <Row justify="end">{memberCount}</Row>
              </Col>
            </Row>
            <Typography.Paragraph
              ellipsis={{ rows: 2, expandable: false, symbol: "more" }}
            >
              {group.description}
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
    </Link>
  );
}

GroupCard.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    members: PropTypes.number,
    maxMembers: PropTypes.number
  }).isRequired
};
