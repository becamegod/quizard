import { Card } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { useParams } from "react-router-dom";
import presentations from "../../api/presentations";
import CenterBase from "../../components/UI/CenterBase";
import { SocketContext } from "../../context/socket";
import ChartScreen from "../SlideEditor/ChartScreen";
import "./Presentation.css";
import VoteForm from "./VoteForm";

export default function PresentationForMember() {
  const { presentationId } = useParams();
  const [slides, setSlides] = useState([]);
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

  const onVote = async (values) => {
    const { data } = await presentations.vote(
      presentationId,
      slideIndex,
      values.optionIndex
    );
    setResult(data.chart);
  };

  const content =
    result != null ? (
      <Card className="center-base result round" bodyStyle={{ height: "100%" }}>
        <Title>Result for...</Title>
        <ChartScreen chart={result} title={currentSlide.question} />
      </Card>
    ) : (
      <VoteForm slide={currentSlide} onSubmit={onVote} />
    );

  return <CenterBase>{content}</CenterBase>;
}
