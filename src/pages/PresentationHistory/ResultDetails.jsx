import { Card, Col, Menu, Row, Table, Typography } from "antd";
import Title from "antd/es/typography/Title";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";
import sessions from "../../api/sessions";
import notifier from "../../utils/notifier";

export default function ResultDetails() {
  const { sessionId } = useParams();
  const [results, setResults] = useState([]);
  const [path, setPath] = useState(null);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await sessions.getResults(sessionId);
        setResults(data.results);
      } catch (error) {
        console.log(error);
        notifier.notifyError();
      }
    };
    init();
  }, []);

  const items = useMemo(
    () =>
      results.map((result, i) => ({
        key: i,
        label: result.question,
        children: result.options.map((option, j) => ({
          key: `${i}.${j}`,
          label: option.text
        }))
      })),
    [results]
  );

  useEffect(() => {
    if (!path) return;
    console.log(path);
    const newVotes = results[path[0]].options[path[1]].votes.slice();
    setVotes(newVotes);
  }, [path]);

  const columns = [
    {
      title: "User's name",
      dataIndex: ["user", "name"]
    },
    {
      title: "User's email",
      dataIndex: ["user", "email"]
    },
    {
      title: "Time",
      dataIndex: "date",
      width: 200,
      render: (date) => (
        <Typography.Text>
          {moment(date).format("HH:mm  - DD/MM/YYYY").toString()}
        </Typography.Text>
      ),
      sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date)
    }
  ];

  const onClick = (e) => {
    console.log(e.keyPath);
    setPath(
      e.keyPath.reverse().map((x) => {
        const a = x.split(".").reverse();
        return Number(a[0]);
      })
    );
  };

  return (
    <Card>
      <Row gutter={30}>
        <Col>
          <Title level={3}>Questions</Title>
          <Menu
            onClick={onClick}
            style={{
              width: 256
            }}
            mode="inline"
            items={items}
          />
        </Col>
        <Col flex={1}>
          <Title level={3}>Users voted</Title>
          <Table columns={columns} dataSource={votes} rowKey="id" />
        </Col>
      </Row>
    </Card>
  );
}
