import { Button, Card, Form, Radio, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useContext, useEffect, useState, useMemo } from "react";

import { useParams } from "react-router-dom";
import presentations from "../../api/presentations";
import { SocketContext } from "../../context/socket";
import "./Presentation.css";
import ChartScreen from "../SlideEditor/ChartScreen";

// const currentSlide = {
//   question: "Loading question...",
//   options: [{ text: "..." }, { text: "..." }, { text: "..." }]
// };
export default function PresentationForMember() {
  const { presentationId } = useParams();
  const [slides, setSlides] = useState({
    question: "Loading question...",
    options: [{ text: "..." }, { text: "..." }, { text: "..." }]
  });
  const [slideIndex, setSlideIndex] = useState(0);
  const [result, setResult] = useState(null);
  const socket = useContext(SocketContext);

  // current slide
  const currentSlide = useMemo(() => slides[slideIndex], [slides, slideIndex]);

  useEffect(() => {
    const join = async () => {
      try {
        const { data } = await presentations.join(presentationId);
        setSlides(data.slides);
        setSlideIndex(data.slideIndex);

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
    const { data } = await presentations.vote(
      presentationId,
      slideIndex,
      values.optionIndex
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
      <Card>
        <Title>{currentSlide.question}</Title>
        <Form onFinish={onFinish}>
          <Form.Item name="optionIndex">
            <Radio.Group className="expand">
              <Space direction="vertical" className="expand">
                {currentSlide.options.map((option, index) => (
                  <Radio.Button
                    className="expand"
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
              className="login-btn"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );

  return (
    <div className="center-base">
      <Row justify="space-evenly" align="middle" style={{ width: "100%" }}>
        {content}
      </Row>
    </div>
  );
}
