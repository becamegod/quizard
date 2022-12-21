import { Carousel, notification } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import PropTypes from "prop-types";
import { React, useEffect, useRef, useState } from "react";
import authService from "../../api/auth";
import AccountForm from "./AccountForm";
import RegisterSuccess from "./RegisterSuccess";
import UserInfoForm from "./UserInfoForm";

export default function RegisterForm({ onLogin }) {
  const [stage, setStage] = useState(0);
  const [user, setUser] = useState({});
  const slider = useRef();

  const onAccountSubmit = (values) => {
    const dob = moment(values.dob).format("DD-MM-YYYY");
    setUser({ ...user, ...values, dob });
    slider.current.next();
  };

  const onBack = () => {
    slider.current.prev();
  };

  useEffect(() => {
    if (stage === 2) {
      authService
        .register(user)
        .then(() => {
          // if (res.status === 201) {
          //   notification.success({
          //     message: "Register Success",
          //     description: "Please check your email to verify your account"
          //   });
          // }
          setStage(stage + 1);
        })
        .catch((err) => {
          notification.error({
            message: "Register Failed",
            description: err.response.data.message || "Unknown Error"
          });
          setStage(0);
        });
    }
  }, [stage]);

  return (
    <>
      <Title>REGISTER</Title>
      <Carousel
        speed={300}
        on
        ref={(ref) => {
          slider.current = ref;
        }}
      >
        <AccountForm onLogin={onLogin} onFinish={onAccountSubmit} />
        <UserInfoForm onBack={onBack} />
        <RegisterSuccess />
      </Carousel>
    </>
  );
}

RegisterForm.propTypes = {
  onLogin: PropTypes.func.isRequired
};
