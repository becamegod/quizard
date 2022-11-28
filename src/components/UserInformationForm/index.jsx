import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, DatePicker, Button, Input } from "antd";

export default function UserInformation() {
  const [userInfor] = useState({});

  useEffect(() => {
    // const res = await axios.get('')
  }, userInfor);
  return (
    <Card className="profile-card-container">
      <Row className="row-container">
        <Col className="avatar" span={8} />
        <Col className="information" span={16}>
          <Row className="information-container">
            <Form className="information-form" labelCol={{ span: 4 }}>
              <Form.Item label="Email">
                <Input className="round" disabled />
              </Form.Item>
              <Form.Item label="Fullname">
                <Input className="round" value="fdfgdfgdfg" />
              </Form.Item>
              <Form.Item label="Gender">
                <Input className="round" />
              </Form.Item>
              <Form.Item label="Date of birth">
                <DatePicker format="DD/MM/YYYY" />
              </Form.Item>
              <Button className="edit-profile-button" type="primary">
                Edit information
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
