import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import MyButton from "../components/UI/MyButton";
import constants from "../utils/constants";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="center-base">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <MyButton primary onClick={() => navigate(constants.homeUrl)}>
            Back Home
          </MyButton>
        }
      />
    </div>
  );
}
