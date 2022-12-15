import { Row, Typography } from "antd";
import React from "react";
import { Bar, BarChart, LabelList, Tooltip, XAxis } from "recharts";
import PropTypes from "prop-types";

export default function ChartScreen({ selectedSlide }) {
  return (
    <Row className="chart-screen-container">
      <Typography.Title className="chart-screen-question" level={2}>
        {selectedSlide.question}
      </Typography.Title>
      <BarChart width={730} height={250} data={selectedSlide.options}>
        <XAxis dataKey="text" />
        <Tooltip />
        <Bar dataKey="vote" fill="#8884d8">
          <LabelList dataKey="vote" position="top" />
        </Bar>
      </BarChart>
    </Row>
  );
}

ChartScreen.propTypes = {
  selectedSlide: PropTypes.shape({
    question: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        vote: PropTypes.number
      })
    )
  })
};

ChartScreen.defaultProps = {
  selectedSlide: {
    question: "Loading question...",
    options: [
      {
        text: "Loading choice...",
        vote: 0
      }
    ]
  }
};
