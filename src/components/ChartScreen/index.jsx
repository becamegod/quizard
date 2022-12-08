import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, Tooltip, Legend } from "recharts";
import { Typography, Row, Empty } from "antd";
import PropTypes from "prop-types";

export default function ChartScreen({ selectedSlide }) {
  const [slide, setSlide] = useState(selectedSlide);

  useEffect(() => {
    setSlide(selectedSlide);
  }, [selectedSlide]);
  if (slide) {
    return (
      <Row>
        <Typography.Title className="chart-screen-question" level={2}>
          {slide.question}
        </Typography.Title>
        <BarChart width={730} height={250} data={slide.options}>
          <XAxis dataKey="text" />
          <Tooltip />
          <Legend />
          <Bar dataKey="vote" fill="#8884d8" />
        </BarChart>
      </Row>
    );
  }
  return <Empty />;
}

ChartScreen.propTypes = {
  selectedSlide: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};
