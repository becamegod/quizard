import { Row, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { Bar, BarChart, LabelList, Tooltip, XAxis } from "recharts";
import constants from "../../utils/constants";

export default function ChartScreen({ chart, title }) {
  console.log(chart);
  return (
    <div className="chart-screen-container">
      <Row>
        <Typography.Title className="chart-screen-question" level={2}>
          {title}
        </Typography.Title>
      </Row>
      <Row>
        <BarChart width={730} height={250} data={chart.slice()}>
          <XAxis dataKey="text" />
          <Tooltip />
          <Bar
            maxBarSize={100}
            dataKey="voteCount"
            fill={constants.getMainColor()}
          >
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
      text: PropTypes.string,
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
