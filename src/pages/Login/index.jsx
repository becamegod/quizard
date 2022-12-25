import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Card, Carousel, notification } from "antd";
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../../utils/constants";
import RegisterForm from "../Register/RegisterForm";
import RegisterSuccess from "../Register/RegisterSuccess";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state === constants.unauthorized) {
      location.state = null;
      window.history.replaceState({}, document.title);
      notification.error({
        message: "Unauthorized",
        description: "You have to log in to view this content",
        icon: <ExclamationCircleOutlined style={{ color: "#FF4D4F" }} />,
        style: {
          backgroundColor: "#FFF1F0",
          borderRadius: "10px"
        }
      });
    }

    const accessToken = localStorage.getItem(constants.accessToken);
    if (accessToken) navigate(constants.homeUrl);

    return () => {};
  }, []);

  const slider = useRef();

  return (
    <Card className="login-card">
      <Carousel
        speed={300}
        dots={false}
        ref={(ref) => {
          slider.current = ref;
        }}
      >
        <LoginForm onRegister={() => slider.current.next()} />
        <RegisterForm
          onLogin={() => slider.current.prev()}
          onDoneRegister={() => slider.current.next()}
        />
        <RegisterSuccess onLogin={() => slider.current.goTo(0)} />
      </Carousel>
    </Card>
  );
}
