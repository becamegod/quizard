import { Button, Card, Form, Radio, Space } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import PropTypes from "prop-types";

export default function VoteForm({ slide, onSubmit }) {
  return (
    <Card>
      <Title>{slide.question}</Title>
      <Form onFinish={onSubmit}>
        <Form.Item name="optionIndex">
          <Radio.Group className="expand" buttonStyle="solid">
            <Space direction="vertical" className="expand">
              {slide.options.map((option, index) => (
                <Radio.Button
                  className="expand"
                  value={index}
                  key={index.toString()}
                >
                  {option}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            className="login-btn"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

VoteForm.propTypes = {
  slide: PropTypes.shape({
    question: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string)
  }),
  onSubmit: PropTypes.func.isRequired
};

VoteForm.defaultProps = {
  slide: {
    question: "Loading question...",
    options: ["Loading choice..."]
  }
};
