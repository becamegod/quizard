import { Card } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import PropTypes from "prop-types";
import React from "react";

export default function HeaderContent({ header, content }) {
  return (
    <Card>
      <Title style={{ fontSize: "200%" }}>{header}</Title>
      <Paragraph>{content}</Paragraph>
    </Card>
  );
}

HeaderContent.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};
