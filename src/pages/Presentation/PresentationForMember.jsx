import { Button, Card, Form, Radio, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import presentations from "../../api/presentations";
import { SocketContext } from "../../context/socket";
import "./Presentation.css";
import ChartScreen from "../../components/ChartScreen";

export default function PresentationForMember() {
  const { presentationId } = useParams();
  const [slide, setSlide] = useState({
    question: "Loading question...",
    options: [{ text: "..." }, { text: "..." }, { text: "..." }]
  });
  const [slideIndex, setSlideIndex] = useState(0);
  const [result, setResult] = useState(null);
  const socket = useContext(SocketContext);
  useEffect(() => {
    const join = async () => {
      try {
        const { data } = await presentations.join(presentationId);
        const { slide: s, slideIndex: i } = data;
        setSlide(s);
        setSlideIndex(i);

        // socket.emit("joinPresentation", presentationId);
        // socket.on("slideUpdate", (update) => {
        //   console.log("UPDATE", update);
        //   setSlide(update);
        // });
      } catch (error) {
        console.log(error);
      }
    };
    join();
    return () => {
      socket.off("slideUpdate");
    };
  }, []);

  const onFinish = async (values) => {
    const { data } = await presentations.choose(
      presentationId,
      slideIndex,
      values.choice
    );
    console.log("FINISH", data);
    setResult(data);
  };

  const content =
    result != null ? (
      <Card className="result round" bodyStyle={{ height: "100%" }}>
        <Title>Result for...</Title>
        <ChartScreen selectedSlide={result} />
      </Card>
    ) : (
      <Card className="round">
        <Title>{slide.question}</Title>
        <Form onFinish={onFinish}>
          <Form.Item name="choice">
            <Radio.Group className="expand">
              <Space direction="vertical" className="expand">
                {slide.options.map((option, index) => (
                  <Radio.Button
                    className="round expand"
                    value={index}
                    key={index.toString()}
                  >
                    {option.text}
                  </Radio.Button>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              className="round login-btn"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );

  return (
    <div className="login-base">
      <Row justify="space-evenly" align="middle" style={{ width: "100%" }}>
        {content}
      </Row>
    </div>
  );
}
