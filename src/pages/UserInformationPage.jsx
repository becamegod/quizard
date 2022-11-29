import React, { useEffect, useState } from "react";
import { Row, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import UserInformationForm from "../components/UserInformationForm";
import NavBar from "../components/NavBar";
import "./UserInformationPage.css";
import { getProfile } from "../services/user.service";

export default function UserInformationPage() {
  const [userData, setUserData] = useState(null);

  async function fetchData() {
    try {
      return getProfile();
    } catch (err) {
      throw new Error(err);
    }
  }
  useEffect(() => {
    fetchData().then((res) => {
      setUserData((prev) => {
        return {
          ...prev,
          ...res.data
        };
      });
    });
  }, []);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: "red" }} spin />
  );
  if (userData) {
    return (
      <>
        <NavBar />
        <Row className="profile-page">
          <UserInformationForm userData={userData} />
        </Row>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <Row className="profile-page">
        <Spin indicator={antIcon} />
      </Row>
    </>
  );
}
