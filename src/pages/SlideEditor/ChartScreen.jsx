import { Row, Typography } from "antd";
import React from "react";
import { Bar, BarChart, LabelList, Tooltip, XAxis } from "recharts";
import PropTypes from "prop-types";

export default function ChartScreen({ selectedSlide }) {
  let content;
  switch (selectedSlide.type) {
    case "Multiplechoice": {
      const newOption = selectedSlide.options.map((option) => {
        return { text: option };
      });
      content = (
        <Row className="chart-screen-container">
          <Typography.Title className="chart-screen-question" level={2}>
            {selectedSlide.question}
          </Typography.Title>
          <BarChart width={730} height={250} data={newOption}>
            <XAxis dataKey="text" />
            <Tooltip />
            <Bar dataKey="vote" fill="#8884d8">
              <LabelList dataKey="vote" position="top" />
            </Bar>
          </BarChart>
        </Row>
      );
      break;
    }
    default:
      content = (
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
            <Typography.Title level={2}>
              {selectedSlide.header}
            </Typography.Title>
          </Row>
          <Row>
            <Typography.Title level={3}>
              {selectedSlide.content}
            </Typography.Title>
          </Row>
        </Row>
      );
      break;
  }
  return content;
}

ChartScreen.propTypes = {
  selectedSlide: PropTypes.shape({
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string)
  })
};

ChartScreen.defaultProps = {
  selectedSlide: {
    question: "Loading question...",
    options: ["Loading choice..."]
  }
};
