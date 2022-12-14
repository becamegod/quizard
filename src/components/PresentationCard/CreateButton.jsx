import { FileAddOutlined } from "@ant-design/icons";
import { Button } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../../constants";
import Presentations from "../../api/Presentations";

export default function CreateButton({ groupId }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onClick = async () => {
    setLoading(true);
    const { data } = await Presentations.create(groupId);
    const { presentation } = data;
    navigate(constants.editPresentationUrl(groupId, presentation.id));
  };
  return (
    <Button
      type="primary"
      icon={<FileAddOutlined />}
      shape="round"
      onClick={onClick}
      loading={loading}
    >
      Create
    </Button>
  );
}

CreateButton.propTypes = {
  groupId: PropTypes.string.isRequired
};
