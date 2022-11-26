import React from "react";
import { Card, Row, Col, Form, DatePicker, Button } from "antd";
import InputField from "../InputField/index";

export default function ProfileForm() {
  // const [userInfor, setUserInfor] = useState();

  return (
    <Card className="profile-card-container">
      <Row className="row-container">
        <Col className="avatar" span={8}></Col>
        <Col className="information" span={16}>
          <Row className="information-container">
            <Form className="information-form">
              <Form.Item label="Email">
                <InputField />
              </Form.Item>
              <Form.Item label="Fullname">
                <InputField />
              </Form.Item>
              <Form.Item label="Gender">
                <InputField />
              </Form.Item>
              <Form.Item label="Date of birth">
                <DatePicker format="DD/MM/YYYY"></DatePicker>
              </Form.Item>
              <Button className="edit-profile-button" type="primary" block>
                Edit information
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
