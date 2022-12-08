import { Row, Typography } from "antd";
import React from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis
} from "recharts";
import PropTypes from "prop-types";

export default function ChartScreen({ slide }) {
  return (
    <>
      <Row>
        <Typography.Title className="chart-screen-question" level={2}>
          {slide.question}
        </Typography.Title>
      </Row>
      <Row className="expand-height">
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={slide.options}>
            <XAxis dataKey="text" />
            <Tooltip />
            <Bar dataKey="vote" fill="#8884d8">
              <LabelList dataKey="vote" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Row>
    </>
  );
}

ChartScreen.propTypes = {
  slide: PropTypes.shape({
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
  slide: {
    question: "Loading question...",
    options: [
      {
        text: "Loading choice...",
        vote: 0
      }
    ]
  }
};
