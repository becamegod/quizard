import React from "react";
import { Row } from "antd";
import ProfileForm from "../components/ProfileForm";
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <Row className="profile-page">
      <ProfileForm />
    </Row>
  );
}
