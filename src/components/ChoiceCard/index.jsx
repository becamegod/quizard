import React from "react";
import { Form, Input, Row, Typography, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const { Title, Text } = Typography;
export default function ChoiceCard({ selectedSlide, handleChangeOption }) {
  const handleOnClickAddOption = () => {
    handleChangeOption();
  };
  return (
    <>
      <Title className="choice-card-title">Content</Title>
      <Row className="input-question-container">
        <Text style={{ marginBottom: "5px", fontSize: "14pt" }} strong>
          Your question
        </Text>
        <Input
          className="input-question round"
          defaultValue={selectedSlide.question}
        />
      </Row>
      <div className="option-container">
        <Text style={{ marginBottom: "5px", fontSize: "14pt" }} strong>
          Options
        </Text>
        <Form>
          {selectedSlide.options.map((option) => (
            <Form.Item key={option.text} name={option.text}>
              <Input
                defaultValue={option.text}
                placeholder="Option"
                style={{
                  width: "90%",
                  marginRight: "4%"
                }}
              />
            </Form.Item>
          ))}
          <Form.List name="options">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field) => (
                  <Form.Item required={false} key={field.key}>
                    <Form.Item key={field.key} name={field.name} noStyle>
                      <Input
                        placeholder="Option"
                        style={{
                          width: "90%",
                          marginRight: "4%"
                        }}
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    className="button-add-option"
                    onClick={() => {
                      add();
                      handleOnClickAddOption();
                    }}
                    style={{
                      width: "100%",
                      fontWeight: 600
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add option
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </>
  );
}

ChoiceCard.propTypes = {
  selectedSlide: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({})).isRequired
  }).isRequired,
  handleChangeOption: PropTypes.func.isRequired
};
