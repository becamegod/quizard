import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthGate from "./AuthGate";

import JoinGroup from "./components/JoinGroup";
import DashboardPage from "./pages/Dashboard";
import GroupDetailPage from "./pages/GroupDetail";
import LoginPage from "./pages/Login";
import Logout from "./pages/Login/Logout";
import PresentationForHost from "./pages/Presentation/PresentationForHost";
import PresentationForMember from "./pages/Presentation/PresentationForMember";
import RegisterPage from "./pages/Register";
import SlideEditorPage from "./pages/SlideEditor";
import UserInformationPage from "./pages/UserInformation";
import VerifyPage from "./pages/Verify";

export default function BaseRoutes() {
  // const [content, setContent] = useState(<RouterProvider router={router} />);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route element={<AuthGate />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<UserInformationPage />} />
        <Route path="/groups/:groupId" element={<GroupDetailPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/join/:url" element={<JoinGroup />} />
        <Route
          path="/groups/:groupId/:presentationId"
          element={<SlideEditorPage />}
        />
        <Route
          path="/presentations/:presentationId"
          element={<PresentationForMember />}
        />
        <Route path="/host/:presentationId" element={<PresentationForHost />} />
      </Route>
    </Routes>
  );
}
