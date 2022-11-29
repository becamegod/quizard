import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  DatePicker,
  Button,
  Input,
  Select,
  Spin
} from "antd";
import moment from "moment";
import { getProfile, updateProfile } from "../../services/user.service";

export default function UserInformation() {
  const [userData, setUserData] = useState(null);

  async function fetchData() {
    try {
      return getProfile();
    } catch (err) {
      throw new Error(err);
    }
  }
  useEffect(() => {
    fetchData().then((res) => {
      setUserData((prev) => {
        return {
          ...prev,
          ...res.data
        };
      });
    });
  }, []);

  const onFinish = async (values) => {
    const { name, email, dob, gender } = { ...values };
    const dobString = moment(dob).format("DD/MM/YYYY");
    console.log(dobString);
    const user = {
      email,
      name,
      gender,
      dob: dobString
    };
    try {
      await updateProfile(user);
      fetchData().then((res) => {
        setUserData((prev) => {
          return {
            ...prev,
            ...res.data
          };
        });
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  if (userData) {
    return (
      <Card className="profile-card-container">
        <Row className="row-container">
          <Col className="avatar" span={8} />
          <Col className="information" span={16}>
            <Row className="information-container">
              <Form
                className="information-form"
                onFinish={onFinish}
                labelCol={{ span: 4 }}
                initialValues={{
                  email: `${userData.email}`,
                  name: `${userData.name}`,
                  gender: `${userData.gender}`,
                  dob: moment(userData.dob, "DD/MM/YYYY")
                }}
              >
                <Form.Item label="Email" name="email">
                  <Input className="round" disabled />
                </Form.Item>
                <Form.Item label="Fullname" name="name">
                  <Input className="round" required />
                </Form.Item>
                <Form.Item label="Gender" name="gender">
                  <Select
                    className="round"
                    options={[
                      {
                        value: "Male",
                        label: "Male"
                      },
                      {
                        value: "Female",
                        label: "Female"
                      }
                    ]}
                    required
                  />
                </Form.Item>
                <Form.Item label="Date of birth" name="dob">
                  <DatePicker format="DD/MM/YYYY" required />
                </Form.Item>
                <Form.Item>
                  <Button
                    className="edit-profile-button"
                    type="primary"
                    htmlType="submit"
                  >
                    Edit information
                  </Button>
                </Form.Item>
              </Form>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
  return <Spin />;
}
