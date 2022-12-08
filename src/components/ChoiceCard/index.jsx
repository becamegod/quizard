import React, { useState, useEffect } from "react";
import { Form, Input, Typography, Button, Empty } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Title, Text } = Typography;
export default function ChoiceCard({
  selectedSlide,
  handleChangeOption,
  handleDeleteOption
}) {
  const [copySlide, setCopySlide] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    setCopySlide(selectedSlide);
    form.setFieldsValue({
      question: selectedSlide.question
    });
  }, [selectedSlide]);

  const handleOnClickAddOption = (slide) => {
    const newOptions = slide.options.map((option) => option);
    newOptions.push({ text: "", vote: 0 });
    const newSlide = {
      question: slide.question,
      options: newOptions
    };
    handleChangeOption(newSlide);
  };

  const handleOnClickRemoveOption = (optionIndex) => {
    handleDeleteOption(optionIndex);
  };

  const handleOnChangeOption = (e, slide, index) => {
    const newOption = {
      text: e.target.value,
      vote: slide.options[index].vote
    };
    const newOptions = slide.options.map((option) => option);
    newOptions[index] = newOption;
    const newSlide = { question: slide.question, options: newOptions };
    handleChangeOption(newSlide);
  };
  const handleOnChangeQuestion = (e) => {
    const newSlide = {
      question: e.target.value,
      options: copySlide.options.map((option) => option)
    };
    handleChangeOption(newSlide);
  };
  if (copySlide) {
    return (
      <>
        <Title
          className="choice-card-title"
          style={{ color: "rgb(0, 219, 145)" }}
        >
          Content
        </Title>
        <div className="input-question-container">
          <Text
            style={{
              marginBottom: "5px",
              fontSize: "14pt",
              color: "rgb(0, 219, 145)"
            }}
            strong
          >
            Your question
          </Text>
          <Form form={form}>
            <Form.Item name="question">
              <Input
                className="input-question round"
                onChange={(e) => handleOnChangeQuestion(e)}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="option-container">
          <Text
            style={{
              marginBottom: "5px",
              fontSize: "14pt",
              color: "rgb(0, 219, 145)"
            }}
            strong
          >
            Options
          </Text>

          {copySlide.options.map((option, index) => (
            <>
              <Input
                className="round"
                key={`${copySlide.question}-${index.toString()}-${
                  option.text
                }}`}
                defaultValue={option.text}
                placeholder="Option"
                style={{
                  width: "90%",
                  marginRight: "4%",
                  marginBottom: "4%"
                }}
                onChange={(e) => handleOnChangeOption(e, copySlide, index)}
              />
              <MinusCircleOutlined
                className="dynamic-delete-button"
                onClick={() => {
                  handleOnClickRemoveOption(index);
                }}
              />
            </>
          ))}
          <Button
            className="button-add-option"
            onClick={() => {
              handleOnClickAddOption(copySlide);
            }}
            style={{
              width: "100%",
              fontWeight: 600
            }}
            icon={<PlusOutlined />}
          >
            Add option
          </Button>
        </div>
      </>
    );
  }
  return <Empty />;
}

ChoiceCard.propTypes = {
  selectedSlide: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired,
  handleChangeOption: PropTypes.func.isRequired,
  handleDeleteOption: PropTypes.func.isRequired
};
