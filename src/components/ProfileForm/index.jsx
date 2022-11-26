// import React from "react";
// import { Card, Row, Col, Form, DatePicker, Button } from "antd";
// import InputField from "../InputField/index";
import { Button, Card, Form, Input, DatePicker, Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import React from "react";

// export default function ProfileForm() {
// const [userInfor, setUserInfor] = useState();

// return (
//   <Card className="profile-card-container">
//     <Row className="row-container">
//       <Col className="avatar" span={8}></Col>
//       <Col className="information" span={16}>
//         <Row className="information-container">
//           <Form className="information-form">
//             <Form.Item label="Email">
//               <InputField />
//             </Form.Item>
//             <Form.Item label="Fullname">
//               <InputField />
//             </Form.Item>
//             <Form.Item label="Gender">
//               <InputField />
//             </Form.Item>
//             <Form.Item label="Date of birth">
//               <DatePicker format="DD/MM/YYYY"></DatePicker>
//             </Form.Item>
//             <Button className="edit-profile-button" type="primary" block>
//               Edit information
//             </Button>
//           </Form>
//         </Row>
//       </Col>
//     </Row>

export default function ProfileForm() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="round">
      <Title>REGISTER</Title>
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
              message: "Please input your E-mail!"
            },
            {
              max: 200,
              message: "Name must be less than 200 characters long!"
            }
          ]}
        >
          <Input className="round" />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select
            className="round"
            defaultValue=""
            style={{ width: "100%", borderRadius: "5px" }}
            options={[
              {
                value: "",
                label: "-----"
              },
              {
                value: "male",
                label: "Male"
              },
              {
                value: "female",
                label: "Female"
              }
            ]}
          />
        </Form.Item>
        <Form.Item label="Date of birth" name="dob">
          <DatePicker style={{ width: "100%", borderRadius: "5px" }} />
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
    </Card>
  );
}
