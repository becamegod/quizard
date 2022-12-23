import { Col, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";

export default function ExpandRow({ children, gutter }) {
  return (
    <Row gutter={gutter} className="expand" justify="space-between">
      {children.map((child) => (
        <Col key={Object.keys(child.props).join("-")}>{child}</Col>
      ))}
    </Row>
  );
}

ExpandRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  gutter: PropTypes.number
};

ExpandRow.defaultProps = {
  gutter: 10
};
