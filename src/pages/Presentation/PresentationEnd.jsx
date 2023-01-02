import { Card, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import CenterBase from "../../components/UI/CenterBase";
import MyButton from "../../components/UI/MyButton";
import constants from "../../utils/constants";

export default function PresentationEnd() {
  const navigate = useNavigate();
  return (
    <CenterBase>
      <Card>
        <Result
          title="Presentation ended"
          subTitle="The host has ended the presentation"
          extra={
            <MyButton primary onClick={() => navigate(constants.homeUrl)}>
              Back to home
            </MyButton>
          }
        />
      </Card>
    </CenterBase>
  );
}
