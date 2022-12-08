import { Button, Card, Row, Space } from "antd";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import presentations from "../../api/presentations";

import ChartScreen from "../../components/ChartScreen";
import { SocketContext } from "../../context/socket";
import "./Presentation.css";

export default function PresentationForHost() {
  const { presentationId } = useParams();
  const socket = useContext(SocketContext);

  useEffect(() => {
    const live = async () => {
      try {
        socket.emit("joinPresentation", presentationId);
        const { data } = await presentations.detail(presentationId);
        const { slides } = data.presentation;
        if (slides.length > 0) {
          const currentIndex = 0;
          const currentSlide = slides[currentIndex];
          socket.emit("slideUpdate", presentationId, currentSlide);
          console.log("HOST UPDATE", currentSlide);
        }
      } catch (error) {
        console.log(error);
      }
    };
    live();
    return () => {
      socket.off("slideUpdate");
    };
  }, []);

  return (
    // <Carousel
    //   className="pres-carousel"
    //   adaptiveHeight
    //   style={{ height: "100%" }}
    // >
    <div className="login-base">
      <Row justify="space-evenly" align="middle" style={{ width: "100%" }}>
        <Card className="pres-carousel round" bodyStyle={{ height: "100%" }}>
          <Row justify="end">
            <Space>
              <Button shape="round">Previous</Button>
              <Button type="primary" shape="round">
                Next
              </Button>
            </Space>
          </Row>
          <ChartScreen />
        </Card>
      </Row>
    </div>
    // </Carousel>
  );
}
