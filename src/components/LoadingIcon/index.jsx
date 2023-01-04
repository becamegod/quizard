import { React } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 48, color: "red" }} spin />;

export default function LoadingIcon() {
  return <Spin size="large" indicator={antIcon} />;
}
