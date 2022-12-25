import { Button, Col, Result, Row, Typography } from "antd";
import PropTypes from "prop-types";
import { React } from "react";
import MyButton from "../../components/UI/MyButton";

export default function RegisterSuccess({ onLogin }) {
  return (
    <Result
      status="success"
      title="Register Successfully"
      subTitle="Please check your email to verify your account"
      extra={[
        <Row justify="center" key={0}>
          <Typography.Text>
            Did not receive mail?
            <Button type="link">Resend it</Button>
          </Typography.Text>
        </Row>,
        <Row align="bottom" style={{ paddingTop: "30px" }} key={1}>
          <Col flex={1}>
            <MyButton primary onClick={onLogin}>
              Back to login
            </MyButton>
          </Col>
        </Row>
      ]}
    />
  );
}

RegisterSuccess.propTypes = {
  onLogin: PropTypes.func.isRequired
};
