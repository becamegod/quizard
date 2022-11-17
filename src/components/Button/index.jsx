import React from "react";
import { Button } from "antd";
import PropTypes from "prop-types";

export default function InputButton({ label }) {
  return <Button>{label}</Button>;
}
InputButton.propTypes = {
  label: PropTypes.string.isRequired
};
