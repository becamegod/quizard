import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Form,
  DatePicker,
  Button,
  Input,
  Select,
  notification
} from "antd";
import moment from "moment";
import users from "../../api/Users";
import LoadingIcon from "../../components/LoadingIcon";

// eslint-disable-next-line react/prop-types
export default function UserInformationForm() {
  const [userData, setUserData] = useState(null);

  async function fetchData() {
    try {
      return users.getProfile();
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
    const user = {
      email,
      name,
      gender,
      dob: dobString
    };
    try {
      const updateUser = await users.updateProfile(user);
      setUserData(updateUser);
      notification.success({
        message: "Edit information succeed"
      });
    } catch (err) {
      notification.error({
        message: "Something went wrong, please try again"
      });
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
                  <DatePicker className="round" format="DD/MM/YYYY" required />
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
  return <LoadingIcon />;
}
