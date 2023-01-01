import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthGate from "./components/AuthGate/AuthGate";

import JoinGroup from "./components/JoinGroup";
import GeneralLayout from "./components/GeneralLayout";
import LoginLayout from "./components/LoginLayout";
import DashboardPage from "./pages/Dashboard";
import GroupDetailPage from "./pages/GroupDetail";
import LoginPage from "./pages/Login";
import Logout from "./pages/Login/Logout";
import Presentation from "./pages/Presentation/Presentation";
import SlideEditorPage from "./pages/SlideEditor";
import UserInformationPage from "./pages/UserInformation";
import VerifyPage from "./pages/Verify";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import constants from "./utils/constants";
import GroupsPage from "./pages/Groups/GroupsPage";
import PresentationListPage from "./pages/PresentationList";
import NotFoundPage from "./pages/NotFoundPage";
import CollaboratorPage from "./pages/Collaborator";

export default function BaseRoutes() {
  return (
    <Routes>
      <Route element={<LoginLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<LoginPage isRegister />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:url" element={<ResetPasswordPage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route element={<AuthGate />}>
        <Route element={<GeneralLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path={constants.groupsUrl} element={<GroupsPage />} />
          <Route path="/groups/:groupId" element={<GroupDetailPage />} />
          <Route
            path={constants.presentationsUrl}
            element={<PresentationListPage />}
          />
          <Route
            path="/presentations/collaborators/:presentationId"
            element={<CollaboratorPage />}
          />
          <Route path="/profile" element={<UserInformationPage />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/join/:url" element={<JoinGroup />} />
        <Route path={constants.presentationsUrl}>
          <Route path="edit/:presentationId" element={<SlideEditorPage />} />
          <Route path=":presentationId" element={<Presentation />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
