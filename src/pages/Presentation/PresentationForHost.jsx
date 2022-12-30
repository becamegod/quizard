import { Card, Row, Space } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";
import presentations from "../../api/presentations";
import ChartScreen from "../SlideEditor/ChartScreen";

import MyButton from "../../components/UI/MyButton";
import { SocketContext } from "../../context/socket";
import "./Presentation.css";
import slideTypes from "../../utils/slideTypes";

export default function PresentationForHost() {
  const { presentationId } = useParams();
  const [slides, setSlides] = useState([]);
  const [content, setContent] = useState(null);
  const [session, setSession] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const socket = useContext(SocketContext);

  // current slide
  const currentSlide = useMemo(() => slides[slideIndex], [slides, slideIndex]);

  // on slide index changed
  useEffect(() => {
    if (!currentSlide) return;
    if (currentSlide.type === slideTypes.multipleChoice) {
      const getData = async () => {
        const { data } = await presentations.getChartData(session, slideIndex);
        setContent(
          <ChartScreen chart={data.chart} title={currentSlide.question} />
        );
      };
      getData();
    }
  }, [currentSlide]);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await presentations.detail(presentationId);
        const { presentation } = data;
        setSlides(presentation.slides);
        setSlideIndex(presentation.currentSlideIndex);
        setSession(presentation.currentSession);

        // socket.emit("joinPresentation", presentationId);
        // const { data } = await presentations.detail(presentationId);
        // const { slides } = data.presentation;
        // if (slides.length > 0) {
        //   const currentIndex = 0;
        //   const currentSlide = slides[currentIndex];
        //   socket.emit("slideUpdate", presentationId, currentSlide);
        //   console.log("HOST UPDATE", currentSlide);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    init();
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
    <div className="center-base">
      <Row align="middle" className="expand justify-evenly">
        <Card className="pres-carousel round" bodyStyle={{ height: "100%" }}>
          <Row justify="end">
            <Space>
              <MyButton
                onClick={() => setSlideIndex(Math.max(0, slideIndex - 1))}
              >
                Previous
              </MyButton>
              <MyButton
                primary
                onClick={() => setSlideIndex(Math.max(0, slideIndex + 1))}
              >
                Next
              </MyButton>
            </Space>
          </Row>
          {content}
        </Card>
      </Row>
    </div>
    // </Carousel>
  );
}
