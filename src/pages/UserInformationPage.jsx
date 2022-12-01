import React from "react";
import { Row } from "antd";
import UserInformationForm from "../components/UserInformationForm";
import "./UserInformationPage.css";

export default function UserInformationPage() {
  return (
    <Row className="profile-page">
      <UserInformationForm />
    </Row>
  );
}
