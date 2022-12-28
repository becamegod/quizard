import { Button } from "antd";
import React from "react";
import PropTypes from "prop-types";
import "./MyButton.css";

export default function MyButton({ children, onClick, primary, submit, icon }) {
  const type = primary ? "primary" : "default";
  const htmlType = submit ? "submit" : "button";
  return (
    <Button
      shape="round"
      className="expand button-animation"
      onClick={onClick}
      type={type}
      htmlType={htmlType}
      block
      icon={icon}
    >
      {children}
    </Button>
  );
}

MyButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  submit: PropTypes.bool,
  icon: PropTypes.element
};

MyButton.defaultProps = {
  onClick: null,
  primary: false,
  submit: false,
  icon: null
};
