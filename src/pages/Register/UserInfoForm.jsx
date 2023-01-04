import { DatePicker, Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import { React } from "react";
import ExpandRow from "../../components/UI/ExpandRow";
import MyButton from "../../components/UI/MyButton";

export default function UserInfoForm({ onBack, onFinish }) {
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
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="gender"
        rules={[
          {
            required: true,
            message: "Please select your gender!"
          }
        ]}
      >
        <Select
          placeholder="Gender"
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
        <DatePicker
          placeholder="Birthday"
          className="expand"
          value={new Date()}
        />
      </Form.Item>
      <Form.Item>
        <ExpandRow>
          <MyButton onClick={onBack}>Back</MyButton>
          <MyButton primary submit>
            Register
          </MyButton>
        </ExpandRow>
      </Form.Item>
    </Form>
  );
}

UserInfoForm.propTypes = {
  onBack: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired
};
