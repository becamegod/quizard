import { Row, Typography } from "antd";
import React from "react";
import { Bar, BarChart, LabelList, Tooltip, XAxis } from "recharts";
import PropTypes from "prop-types";

export default function ChartScreen({ chart, title }) {
  return (
    <div className="chart-screen-container">
      <Row>
        <Typography.Title className="chart-screen-question" level={2}>
          {title}
        </Typography.Title>
      </Row>
      <Row>
        <BarChart width={730} height={250} data={chart}>
          <XAxis dataKey="text" />
          <Tooltip />
          <Bar dataKey="voteCount" fill="#8884d8">
            <LabelList dataKey="voteCount" position="top" />
          </Bar>
        </BarChart>
      </Row>
    </div>
  );
}

ChartScreen.propTypes = {
  chart: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      voteCount: PropTypes.number
    })
  ),
  title: PropTypes.string
};

ChartScreen.defaultProps = {
  chart: {
    question: "Loading question...",
    options: ["Loading choice..."]
  },
  title: ""
};
