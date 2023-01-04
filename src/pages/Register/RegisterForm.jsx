import { Carousel, Divider, notification, Steps } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import PropTypes from "prop-types";
import { React, useRef, useState } from "react";

// import authService from "../../api/auth";
import auth from "../../api/auth";
import constants from "../../utils/constants";
import AccountForm from "./AccountForm";
import UserInfoForm from "./UserInfoForm";

export default function RegisterForm({ onLogin, onDoneRegister }) {
  const [step, setStep] = useState(0);
  const [user, setUser] = useState({});
  const slider = useRef();

  const onAccountSubmit = (values) => {
    setUser({ ...user, ...values });
    slider.current.next();
    setStep(step + 1);
  };

  const onUserInfoSubmit = async (values) => {
    const dob = moment(values.dob).format("DD-MM-YYYY");
    setUser({ ...user, ...values, dob });
    const u = { ...user, ...values, dob };
    try {
      await auth.register(u, `${constants.baseUrl}/verify?token=`);
    } catch (error) {
      notification.error({
        message: "Register Failed",
        description: error.response.data.message || "Unknown Error"
      });
    }
    onDoneRegister();
  };

  const onBack = () => {
    slider.current.prev();
    setStep(step - 1);
  };

  const stepItems = ["Account Credentials", "User Information"].map((item) => ({
    key: item,
    title: item
  }));

  return (
    <>
      <Title>REGISTER</Title>
      <Carousel
        speed={300}
        dots={false}
        ref={(ref) => {
          slider.current = ref;
        }}
      >
        <AccountForm onLogin={onLogin} onFinish={onAccountSubmit} />
        <UserInfoForm onBack={onBack} onFinish={onUserInfoSubmit} />
      </Carousel>
      <Divider />
      <Steps
        className="register-steps"
        current={step}
        items={stepItems}
        labelPlacement="vertical"
      />
    </>
  );
}

RegisterForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onDoneRegister: PropTypes.func.isRequired
};
