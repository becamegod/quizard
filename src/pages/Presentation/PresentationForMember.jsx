import { Button, Card, Form, Radio, Space } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";
import presentations from "../../api/presentations";
import { SocketContext } from "../../context/socket";
import "./Presentation.css";

export default function PresentationForMember() {
  const { presentationId } = useParams();
  const socket = useContext(SocketContext);
  useEffect(() => {
    const join = async () => {
      try {
        const res = await presentations.join(presentationId);
        console.log(res);

        socket.emit("joinPresentation", presentationId);
        socket.on("slideUpdate", (slide) => {
          console.log(slide);
        });
      } catch (error) {
        console.log(error);
      }
    };
    join();
    return () => {};
  }, []);

  useEffect(() => {}, []);

  return (
    <Card>
      <Title>Question?</Title>
      <Form>
        <Form.Item>
          <Radio.Group>
            <Space direction="vertical">
              <Radio.Button value={0}>Option 1</Radio.Button>
              <Radio.Button value={1}>Option 2</Radio.Button>
              <Radio.Button value={2}>Option 3</Radio.Button>
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
