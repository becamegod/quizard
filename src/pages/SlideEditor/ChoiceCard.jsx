import React, { useEffect } from "react";
import { Form, Input, Typography, Button, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import _ from "lodash";
import Loading from "../../components/Loading";

const { Title, Text } = Typography;
export default function ChoiceCard({
  presentation,
  selectedSlide,
  handleChangeOption,
  handleDeleteOption
}) {
  const handleOnClickAddOption = (slide) => {
    const newOptions = slide.options.map((option) => option);
    newOptions.push("New option");
    const newSlide = {
      type: slide.type,
      question: slide.question,
      options: newOptions
    };
    handleChangeOption(newSlide);
  };

  const handleOnClickRemoveOption = (optionIndex) => {
    handleDeleteOption(optionIndex);
  };
  const handleOnChangeOption = (e) => {
    console.log(e);
    if (e.heading !== undefined) {
      const newSlide = {
        type: selectedSlide.type,
        header: e.heading,
        content: selectedSlide.content
      };
      handleChangeOption(newSlide);
    } else if (e.content !== undefined) {
      const newSlide = {
        type: selectedSlide.type,
        header: selectedSlide.header,
        content: e.content
      };
      handleChangeOption(newSlide);
    } else if (e.question !== undefined) {
      const newSlide = {
        type: selectedSlide.type,
        question: e.question,
        options: selectedSlide.options.map((option) => option)
      };
      handleChangeOption(newSlide);
    } else {
      const [infor] = _.values(e);
      const [key] = _.keys(e);
      const index = key.split("-")[1];
      const newOptions = selectedSlide.options.map((option) => option);
      newOptions[index] = infor;
      const newSlide = {
        type: selectedSlide.type,
        question: selectedSlide.question,
        options: newOptions
      };
      handleChangeOption(newSlide);
    }
  };

  const [form] = Form.useForm();

  let content;

  switch (selectedSlide.type) {
    case "Multiplechoice": {
      content = (
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
          <Form
            layout="inline"
            name="question-form"
            form={form}
            onValuesChange={handleOnChangeOption}
          >
            <Form.Item name="question" style={{ width: "100%" }}>
              <Input className="input-question round" />
            </Form.Item>
            <Text
              style={{
                width: "100%",
                marginBottom: "5px",
                fontSize: "14pt",
                color: "rgb(0, 219, 145)"
              }}
              strong
            >
              Options
            </Text>

            {selectedSlide.options.map((option, index) => (
              <>
                <Form.Item
                  style={{ width: "90%" }}
                  name={`${selectedSlide.question}-${index.toString()}`}
                >
                  <Input
                    key={`${selectedSlide.question}-${index.toString()}`}
                    placeholder="Option"
                    style={{
                      marginRight: "4%",
                      marginBottom: "4%"
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <MinusCircleOutlined
                    key={`Delete-${selectedSlide.question}-${index.toString()}`}
                    className="dynamic-delete-button"
                    onClick={() => {
                      handleOnClickRemoveOption(index);
                    }}
                  />
                </Form.Item>
              </>
            ))}
            <Button
              className="button-add-option"
              onClick={() => {
                handleOnClickAddOption(selectedSlide);
              }}
              style={{
                width: "100%",
                fontWeight: 600
              }}
              icon={<PlusOutlined />}
            >
              Add option
            </Button>
          </Form>
        </div>
      );
      break;
    }
    case "Heading": {
      content = (
        <div className="input-question-container">
          <Text
            style={{
              marginBottom: "5px",
              fontSize: "14pt",
              color: "rgb(0, 219, 145)"
            }}
            strong
          >
            Heading
          </Text>
          <Form form={form} onValuesChange={handleOnChangeOption}>
            <Form.Item name="heading">
              <Input className="input-question round" />
            </Form.Item>
            <Text
              style={{
                marginBottom: "5px",
                fontSize: "14pt",
                color: "rgb(0, 219, 145)"
              }}
              strong
            >
              Subheading
            </Text>
            <Form.Item name="content">
              <Input.TextArea className="input-question round" />
            </Form.Item>
          </Form>
        </div>
      );
      break;
    }
    default: {
      content = (
        <div className="input-question-container">
          <Text
            style={{
              marginBottom: "5px",
              fontSize: "14pt",
              color: "rgb(0, 219, 145)"
            }}
            strong
          >
            Heading
          </Text>
          <Form
            name="question-form"
            form={form}
            onValuesChange={handleOnChangeOption}
          >
            <Form.Item name="heading" style={{ width: "100%" }}>
              <Input className="input-question round" />
            </Form.Item>
            <Text
              style={{
                width: "100%",
                marginBottom: "5px",
                fontSize: "14pt",
                color: "rgb(0, 219, 145)"
              }}
              strong
            >
              Paragraph
            </Text>
            <Form.Item name="content">
              <Input.TextArea className="input-question round" />
            </Form.Item>
          </Form>
        </div>
      );
      break;
    }
  }

  useEffect(() => {
    if (selectedSlide.type === "Multiplechoice") {
      const values = {
        question: selectedSlide.question
      };
      selectedSlide.options.forEach((option, index) => {
        values[`${selectedSlide.question}-${index.toString()}`] = option;
      });
      form.setFieldsValue(values);
    } else {
      form.setFieldsValue({
        heading: selectedSlide.header,
        content: selectedSlide.content
      });
    }
  }, [selectedSlide, presentation]);

  const handleChange = (value) => {
    let newSlide;
    switch (value) {
      case "Heading": {
        newSlide = {
          type: "Heading",
          header: "",
          content: ""
        };
        break;
      }

      case "Paragraph": {
        newSlide = {
          type: "Paragraph",
          header: "",
          content: ""
        };
        break;
      }
      default: {
        newSlide = {
          type: "Multiplechoice",
          question: "",
          options: ["New option"]
        };
        break;
      }
    }
    handleChangeOption(newSlide);
  };

  if (selectedSlide) {
    return (
      <>
        <Title
          className="choice-card-title"
          style={{ color: "rgb(0, 219, 145)" }}
        >
          Content
        </Title>
        <div className="select-container">
          <Select
            value={`${selectedSlide.type}`}
            style={{
              width: "100%"
            }}
            onChange={handleChange}
            options={[
              {
                value: "Multiplechoice",
                label: "Multiple Choice"
              },
              {
                value: "Heading",
                label: "Heading"
              },
              {
                value: "Paragraph",
                label: "Paragraph"
              }
            ]}
          />
        </div>
        {content}
      </>
    );
  }
  return <Loading />;
}

ChoiceCard.propTypes = {
  selectedSlide: PropTypes.shape({
    type: PropTypes.string.isRequired,
    question: PropTypes.string,
    header: PropTypes.string,
    content: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string.isRequired)
  }),
  presentation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    slides: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired,
  handleChangeOption: PropTypes.func.isRequired,
  handleDeleteOption: PropTypes.func.isRequired
};

ChoiceCard.defaultProps = {
  selectedSlide: {
    header: "Loading header",
    content: "Loading content",
    question: "Loading question...",
    options: ["Loading choice..."]
  }
};
