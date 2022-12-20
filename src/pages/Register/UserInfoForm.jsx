import { Button, DatePicker, Form, Input, Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import moment from "moment";
import { React } from "react";

export default function UserInfoForm() {
  const onFinish = (values) => {
    const dob = moment(values.dob).format("DD-MM-YYYY");
    return dob;
    // setUser({ ...user, ...values, dob });
    // setStage(stage + 1);
  };

  const onFinishFailed = (errorInfo) => {
    throw new Error(errorInfo);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: "Please input your name!"
          },
          {
            max: 200,
            message: "Name must be less than 200 characters long!"
          }
        ]}
      >
        <Input className="round" />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[
          {
            required: true,
            message: "Please select your gender!"
          }
        ]}
      >
        <Select
          className="round input-field"
          style={{ width: "100%", borderRadius: "5px" }}
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
        />
      </Form.Item>
      <Form.Item
        label="Date of birth"
        name="dob"
        rules={[
          {
            required: true,
            message: "Please select your date of birth!"
          },
          () => ({
            validator(rule, value) {
              if (value && value.isAfter(new Date())) {
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject("Date of birth must be in the past!");
              }
              return Promise.resolve();
            }
          })
        ]}
      >
        <DatePicker className="round input-field" value={new Date()} />
      </Form.Item>
      <Form.Item>
        <Content className="register-container">
          <Button
            type="primary"
            size="large"
            className="round register-btn"
            htmlType="submit"
          >
            Register
          </Button>
        </Content>
      </Form.Item>
    </Form>
  );
}
