import { Button, Card, Form, Radio, Space } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import presentations from "../../api/presentations";
import { SocketContext } from "../../context/socket";
import "./Presentation.css";

export default function PresentationForMember() {
  const { presentationId } = useParams();
  const [slide, setSlide] = useState({ question: "Question?", options: [] });
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
    <Card>
      <Title>{slide.question}</Title>
      <Form>
        <Form.Item>
          <Radio.Group>
            <Space direction="vertical">
              {slide.options.map((option, index) => (
                <Radio.Button value={index} key={index.toString()}>
                  {option.text}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button>Submit</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
