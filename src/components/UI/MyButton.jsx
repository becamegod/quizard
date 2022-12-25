import { Button } from "antd";
import React from "react";
import PropTypes from "prop-types";

export default function MyButton({ children, onClick, primary, submit }) {
  const type = primary ? "primary" : "default";
  const htmlType = submit ? "submit" : "button";
  return (
    <Button
      shape="round"
      className="expand"
      onClick={onClick}
      type={type}
      htmlType={htmlType}
      block
    >
      {children}
    </Button>
  );
}

MyButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  submit: PropTypes.bool
};

MyButton.defaultProps = {
  onClick: null,
  primary: false,
  submit: false
};
