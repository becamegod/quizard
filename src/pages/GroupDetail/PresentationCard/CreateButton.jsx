import { FileAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Presentations from "../../../api/presentations";
import constants from "../../../utils/constants";

export default function CreateButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onClick = async () => {
    setLoading(true);
    const { data } = await Presentations.create(null);
    const { presentation } = data;
    navigate(constants.editPresentationUrl(null, presentation.id));
  };
  return (
    <Button
      type="primary"
      icon={<FileAddOutlined />}
      shape="round"
      onClick={onClick}
      loading={loading}
    >
      Create presentation
    </Button>
  );
}
