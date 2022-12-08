import { Input } from "antd";
import { bool, string } from "prop-types";
import React, { useState } from "react";

export default function InputField({ placeholder, fieldName, required }) {
  const [size, setSize] = useState("middle");

  return (
    <Input
      className="round"
      placeholder={placeholder}
      size={size}
      onFocus={() => setSize("large")}
      onBlur={() => setSize("middle")}
      name={fieldName}
      rules={[
        {
          required,
          message: `Please input your ${fieldName}}!`
        }
      ]}
    />
  );
}

InputField.propTypes = {
  placeholder: string,
  fieldName: string,
  required: bool
};

InputField.defaultProps = {
  placeholder: "",
  fieldName: "",
  required: false
};
