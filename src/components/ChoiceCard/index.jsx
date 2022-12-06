import React from "react";
import { Form, Input, Row, Typography, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
export default function ChoiceCard() {
  return (
    <>
      <Title className="choice-card-title">Content</Title>
      <Row className="input-question-container">
        <Text style={{ marginBottom: "5px", fontSize: "14pt" }} strong>
          Your question
        </Text>
        <Input className="input-question" defaultValue={"Question"} />
      </Row>
      <div className="option-container">
        <Text style={{ marginBottom: "5px", fontSize: "14pt" }} strong>
          Options
        </Text>
        <Form>
          <Form.List name="options">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={field.key}>
                    <Form.Item {...field} noStyle>
                      <Input
                        placeholder={`Option ${index + 1}`}
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
                    onClick={() => add()}
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
