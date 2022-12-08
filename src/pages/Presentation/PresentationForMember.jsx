import { Button, Card, Form, Radio, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import presentations from "../../api/presentations";
import { SocketContext } from "../../context/socket";
import "./Presentation.css";

export default function PresentationForMember() {
  const { presentationId } = useParams();
  const [slide, setSlide] = useState({
    question: "Question?",
    options: [{ text: "ABC" }, { text: "ABCD" }, { text: "ABCDEF" }]
  });
  const socket = useContext(SocketContext);
  useEffect(() => {
    const join = async () => {
      try {
        await presentations.join(presentationId);

        socket.emit("joinPresentation", presentationId);
        socket.on("slideUpdate", (update) => {
          console.log("UPDATE", update);
          setSlide(update);
        });
      } catch (error) {
        console.log(error);
      }
    };
    join();
    return () => {
      socket.off("slideUpdate");
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="login-base">
      <Row justify="space-evenly" align="middle" style={{ width: "100%" }}>
        <Card className="round">
          <Title>{slide.question}</Title>
          <Form>
            <Form.Item>
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
              <Button type="primary" size="large" className="round login-btn">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  );
}
