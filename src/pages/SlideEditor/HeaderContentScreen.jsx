import React from "react";
import { Row, Typography } from "antd";
import PropTypes from "prop-types";

export default function HeaderContentScreen({ slide }) {
  return (
    <Row
      className="chart-screen-container"
      style={{
        width: 730,
        height: 400,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Typography.Title level={2}>{slide.header}</Typography.Title>
      </Row>
      <Row>
        <Typography.Title level={3}>{slide.content}</Typography.Title>
      </Row>
    </Row>
  );
}

HeaderContentScreen.propTypes = {
  slide: PropTypes.shape({
    header: PropTypes.string,
    content: PropTypes.string
  })
};

HeaderContentScreen.defaultProps = {
  slide: {
    header: "Loading question...",
    content: "Loading content..."
  }
};
