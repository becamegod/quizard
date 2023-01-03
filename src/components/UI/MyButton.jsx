import { Button } from "antd";
import React from "react";
import PropTypes from "prop-types";
import "./MyButton.css";

export default function MyButton({
  children,
  onClick,
  primary,
  submit,
  icon,
  danger,
  expand,
  loading
}) {
  const type = primary ? "primary" : "default";
  const isDanger = danger;
  const htmlType = submit ? "submit" : "button";
  const expandClass = expand ? "expand" : "";
  return (
    <Button
      className={`expand ${expandClass}`}
      shape="round"
      onClick={onClick}
      type={type}
      htmlType={htmlType}
      icon={icon}
      block={expand}
      danger={isDanger}
      loading={loading}
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
  icon: PropTypes.element,
  danger: PropTypes.bool,
  expand: PropTypes.bool,
  loading: PropTypes.bool
};

MyButton.defaultProps = {
  onClick: null,
  primary: false,
  submit: false,
  icon: null,
  danger: false,
  expand: true,
  loading: false
};
