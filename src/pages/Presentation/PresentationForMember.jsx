import { Card } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";
import presentations from "../../api/presentations";
import Loading from "../../components/Loading";
import CenterBase from "../../components/UI/CenterBase";
import { SocketContext } from "../../context/socket";
import slideTypes from "../../utils/slideTypes";
import socketEvents from "../../utils/socketEvents";
import ChartScreen from "../SlideEditor/ChartScreen";
import HeaderContent from "./HeaderContent";
import "./Presentation.css";
import VoteForm from "./VoteForm";

export default function PresentationForMember() {
  const { presentationId } = useParams();
  const [slides, setSlides] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [content, setContent] = useState(<Loading />);
  const socket = useContext(SocketContext);

  // current slide
  const currentSlide = useMemo(() => slides[slideIndex], [slides, slideIndex]);

  const onVote = async (values) => {
    const { data } = await presentations.vote(
      presentationId,
      slideIndex,
      values.optionIndex
    );
    setResult(data.chart);
  };

  // on start
  useEffect(() => {
    const join = async () => {
      try {
        const { data } = await presentations.join(presentationId);
        setSlides(data.slides);
        setSlideIndex(data.slideIndex);

        socket.emit(socketEvents.joinPresentation, presentationId);
        socket.on(socketEvents.slideChange, (newSlideIndex) => {
          setSlideIndex(newSlideIndex);
        });
      } catch (error) {
        console.log(error);
      }
    };
    join();
    return () => {
      socket.off(socketEvents.slideChange);
    };
  }, []);

  // on slide index or result changed
  useEffect(() => {
    if (!currentSlide) return;

    // server's rendering
    if (currentSlide.type === slideTypes.multipleChoice) {
      if (result != null)
        setContent(
          <Card
            className="center-base result round"
            bodyStyle={{ height: "100%" }}
          >
            <Title>Result for...</Title>
            <ChartScreen chart={result} title={currentSlide.question} />
          </Card>
        );
      else setContent(<VoteForm slide={currentSlide} onSubmit={onVote} />);
    } else {
      setContent(
        <HeaderContent
          header={currentSlide.header}
          content={currentSlide.content}
        />
      );
    }
  }, [currentSlide, result]);

  return <CenterBase>{content}</CenterBase>;
}
