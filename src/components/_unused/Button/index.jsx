import React from "react";
import { Button } from "antd";

// eslint-disable-next-line react/prop-types
export default function InputButton({ label, className = "" }) {
  const cl = className ? ` ${className}` : className;
  return <Button className={`round${cl}`}>{label}</Button>;
}
