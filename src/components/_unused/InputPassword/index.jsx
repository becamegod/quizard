import { Input } from "antd";
import { string } from "prop-types";
import React, { useState } from "react";

export default function InputPasswordField({ placeholder, fieldName }) {
  const [size, setSize] = useState("middle");
  return (
    <Input.Password
      className="round"
      placeholder={placeholder}
      size={size}
      onFocus={() => setSize("large")}
      onBlur={() => setSize("middle")}
      name={fieldName}
      rules={[
        {
          required: true,
          message: `Please input your ${fieldName}}!`
        }
      ]}
    />
  );
}

InputPasswordField.propTypes = {
  placeholder: string,
  fieldName: string
};

InputPasswordField.defaultProps = {
  placeholder: "",
  fieldName: "password"
};
