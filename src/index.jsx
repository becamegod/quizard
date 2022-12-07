import "antd/dist/antd.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JoinGroup from "./components/JoinGroup";
import { SocketContext, socket } from "./context/socket";
import "./index.css";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import GroupDetailPage from "./pages/GroupDetail/GroupDetailPage";
import LoginPage from "./pages/Login/LoginPage";
import PresentationForHost from "./pages/Presentation/PresentationForHost";
import PresentationForMember from "./pages/Presentation/PresentationForMember";
import RegisterPage from "./pages/Register/RegisterPage";
import SlideEditorPage from "./pages/SlideEditor/SlideEditorPage";
import UserInformationPage from "./pages/UserInformation/UserInformationPage";
import VerifyPage from "./pages/Verify/VerifyPage";
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
    path: "/join/:url",
    element: <JoinGroup />
  },
  {
    path: "/groups/:groupId/:presentationId",
    element: <SlideEditorPage />
  },
  {
    path: "/presentations/:presentationId",
    element: <PresentationForMember />
  },
  {
    path: "/host/:presentationId",
    element: <PresentationForHost />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <RouterProvider router={router} />
    </SocketContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
