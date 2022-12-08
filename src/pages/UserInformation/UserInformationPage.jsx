import React from "react";
import { Row, Layout } from "antd";
import UserInformationForm from "../../components/UserInformationForm";
import "./UserInformationPage.css";
import NavBar from "../../components/NavBar";

const { Header } = Layout;

export default function UserInformationPage() {
  return (
    <>
      <Header style={{ background: "none", padding: "0px" }}>
        <NavBar />
      </Header>
      <Row className="profile-page">
        <UserInformationForm />
      </Row>
    </>
  );
}