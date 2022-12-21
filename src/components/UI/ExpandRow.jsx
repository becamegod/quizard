import { Col, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";

export default function ExpandRow({ children, gutter }) {
  return (
    <Row gutter={gutter}>
      {children.map((child) => (
        <Col key={Object.keys(child.props).join("-")} flex={1}>
          {child}
        </Col>
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
