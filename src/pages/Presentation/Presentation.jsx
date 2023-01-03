import { Badge, Card, Col, Row, Space, Typography } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";

// import PropTypes from "prop-types";
import { CheckOutlined, MessageFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import presentations from "../../api/presentations";
import ChartScreen from "../SlideEditor/ChartScreen";

import Loading from "../../components/Loading";
import CenterBase from "../../components/UI/CenterBase";
import MyButton from "../../components/UI/MyButton";
import { SocketContext } from "../../context/socket";
import notifier from "../../utils/notifier";
import slideTypes from "../../utils/slideTypes";
import socketEvents from "../../utils/socketEvents";
import HeaderContent from "./HeaderContent";
import "./Presentation.css";
import QuestionButton from "./QuestionButton";
import VoteForm from "./VoteForm";
import constants from "../../utils/constants";
import ChatBox from "./ChatBox";

const votedArray = [];
let isHost = false;
export default function Presentation() {
  const { presentationId } = useParams();
  const [slides, setSlides] = useState([]);
  const [content, setContent] = useState(<Loading />);
  const [slideIndex, setSlideIndex] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const [charts, setCharts] = useState([[]]);
  const [openChatbox, setOpenChatbox] = useState(false);
  const [isHaveNewMessage, setIsHaveNewMessage] = useState(false);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  // current slide
  const currentSlide = useMemo(() => slides[slideIndex], [slides, slideIndex]);

  const onVote = async (values) => {
    try {
      votedArray[slideIndex] = true;
      await presentations.vote(presentationId, slideIndex, values.optionIndex);
    } catch (error) {
      console.log(error);
      notifier.notifyError();
    }
  };

  const handleOnClickChatBox = () => {
    setOpenChatbox(true);
  };

  const handleCloseChatBox = () => {
    setOpenChatbox(false);
  };

  const handleIsNewMessageTrue = () => {
    setIsHaveNewMessage(true);
  };

  const handleIsNewMessageFalse = () => {
    setIsHaveNewMessage(false);
  };

  // on slide index (content) changed
  useEffect(() => {
    if (!currentSlide) return;
    if (currentSlide.type === slideTypes.multipleChoice) {
      const chart = charts[slideIndex];
      if (!chart) return;
      if (!isHost && !votedArray[slideIndex])
        setContent(<VoteForm slide={currentSlide} onSubmit={onVote} />);
      else
        setContent(
          <ChartScreen
            chart={charts[slideIndex]}
            title={currentSlide.question}
          />
        );
    } else {
      setContent(
        <HeaderContent
          header={currentSlide.header}
          content={currentSlide.content}
        />
      );
    }
  }, [currentSlide, charts]);

  // on slideIndex change
  const navigateSlide = (direction) => {
    let newSlideIndex = slideIndex + direction;
    newSlideIndex = Math.min(Math.max(newSlideIndex, 0), slides.length - 1); // clamp
    setSlideIndex(newSlideIndex);
    presentations.updateSlideIndex(presentationId, newSlideIndex);
  };

  // listen for vote change
  useEffect(() => {
    socket.on(socketEvents.voteChange, (slideIndexToUpdate, optionIndex) => {
      const cloneCharts = charts.slice();
      cloneCharts[slideIndexToUpdate][optionIndex].voteCount += 1;
      setCharts(cloneCharts);
    });
    return () => {
      socket.off(socketEvents.voteChange);
    };
  }, [charts]);

  // on start
  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await presentations.join(presentationId);
        const { presentation } = data;
        setSlides(presentation.slides);
        setSlideIndex(presentation.currentSlideIndex);
        setSessionId(presentation.currentSession);
        isHost = data.isHost;

        const promises = presentation.slides.map((slide, i) => {
          if (slide.type === slideTypes.multipleChoice)
            return new Promise((resolve, reject) => {
              const getData = async () => {
                try {
                  const { data: chartData } = await presentations.getChartData(
                    presentation.currentSession,
                    i
                  );
                  resolve(chartData.chart);
                } catch (error) {
                  reject(error);
                }
              };
              getData();
            });
          return new Promise((resolve) => {
            resolve([]);
          });
        });
        const newCharts = await Promise.all(promises);
        setCharts(newCharts);

        // TODO: get from session
        for (let i = 0; i < newCharts.length; i += 1) votedArray[i] = false;

        socket.emit(socketEvents.joinPresentation, presentationId);
        socket.on(socketEvents.slideChange, (newSlideIndex) => {
          setSlideIndex(newSlideIndex);
        });
        socket.on(socketEvents.presentationEnd, () => {
          navigate(constants.presentationEndUrl);
        });
      } catch (error) {
        switch (error.response.status) {
          case 403:
            notifier.notifyError(
              "You are not in the group to view that presentation"
            );
            break;
          case 404:
            notifier.notifyError("The presentation hasn't been started");
            break;
          default:
            notifier.notifyError();
            console.log(error);
            break;
        }
        navigate(constants.homeUrl);
      }
    };
    init();
    return () => {
      socket.off(socketEvents.slideChange);
      socket.off(socketEvents.presentationEnd);
    };
  }, []);

  const endPresentation = async () => {
    try {
      await presentations.end(presentationId);
      notifier.notifyInfo("You ended the presentation");
    } catch (error) {
      console.log(error);
      notifier.notifyError();
    }
  };

  const nav = isHost ? (
    <Row justify="space-between">
      <Col>
        <MyButton danger onClick={endPresentation}>
          End
        </MyButton>
      </Col>
      <Col>
        <Space>
          <Typography.Text
            copyable={{
              text: `${constants.baseUrl}${constants.presentationsUrl}/${presentationId}`,
              icon: [
                <MyButton>Copy Link</MyButton>,
                <MyButton icon={<CheckOutlined />}>Link copied</MyButton>
              ]
            }}
          />
          <MyButton onClick={() => navigateSlide(-1)}>Previous</MyButton>
          <MyButton primary onClick={() => navigateSlide(1)}>
            Next
          </MyButton>
        </Space>
      </Col>
    </Row>
  ) : null;

  return (
    // <Carousel
    //   className="pres-carousel"
    //   adaptiveHeight
    //   style={{ height: "100%" }}
    // >
    <CenterBase>
      <Row align="middle" className="justify-evenly">
        {/* pres-carousel */}
        <Card className="" bodyStyle={{ height: "100%" }}>
          {nav}
          {content}
          <Row justify="end">
            <div style={{ marginRight: "12px" }}>
              <QuestionButton sessionId={sessionId} isHost={isHost} />
            </div>
            <ChatBox
              isOpen={openChatbox}
              handleCloseChatBox={handleCloseChatBox}
              sessionId={sessionId}
              handleIsNewMessageTrue={handleIsNewMessageTrue}
              handleIsNewMessageFalse={handleIsNewMessageFalse}
            />
            <Row onClick={handleOnClickChatBox}>
              <Badge size="default" dot={isHaveNewMessage}>
                <MessageFilled style={{ fontSize: "20px" }} />
              </Badge>
            </Row>
          </Row>
        </Card>
      </Row>
    </CenterBase>
    // </Carousel>
  );
}

// Presentation.propTypes = {
//   forHost: PropTypes.bool
// };

// Presentation.defaultProps = {
//   forHost: false
// };
