import "antd/dist/antd.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JoinGroup from "./components/JoinGroup";
import "./index.css";
import DashboardPage from "./pages/DashboardPage";
import GroupDetailPage from "./pages/GroupDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserInformationPage from "./pages/UserInformationPage";
import VerifyPage from "./pages/VerifyPage";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/verify",
    element: <VerifyPage />
  },
  {
    path: "/profile",
    element: <UserInformationPage />
  },
  {
    path: "/groups/:groupId",
    element: <GroupDetailPage />
  },
  {
    path: "/dashboard",
    element: <DashboardPage />
  },
  {
    path: "/join",
    element: <JoinGroup />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
