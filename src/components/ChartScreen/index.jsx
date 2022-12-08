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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300
  }
];
export default function ChartScreen() {
  return (
    <>
      <Row>
        <Typography.Title className="chart-screen-question" level={2}>
          Question
        </Typography.Title>
      </Row>
      <Row className="expand-height">
        <ResponsiveContainer>
          <BarChart width={730} height={250} data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="pv" fill="#8884d8">
              <LabelList dataKey="pv" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Row>
    </>
  );
}
