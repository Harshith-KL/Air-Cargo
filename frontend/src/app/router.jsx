import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ShipmentPage from "../features/shipments/pages/ShipmentPage";
import AiAssistantPage from "../features/ai/pages/AiAssistantPage";
import ProtectedRoute from "../components/ProtectedRoute";
import SignupPage from "../features/auth/pages/SignupPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shipments"
        element={
          <ProtectedRoute>
            <ShipmentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-assistant"
        element={
          <ProtectedRoute>
            <AiAssistantPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;