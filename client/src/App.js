import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import VerifyAccount from "./pages/verify-account/VerifyAccount.jsx";
import ResetPass from "./pages/reset-password/ResetPass.jsx";
import ForgotPass from "./pages/forgot-password/ForgotPass.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import SuccessReset from "./pages/resetSuccess/SuccessReset.jsx";

//Protect routes
const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-account" replace />;
  }
  return children;
};
//redirect to home
const RedirectToHome = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return children;
};
function App() {
  const { onSuccess } = useAuthStore();
  console.log("App component render");
  useEffect(() => {
    onSuccess();
  }, [onSuccess]);
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectToHome>
              <Login />
            </RedirectToHome>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectToHome>
              <Register />
            </RedirectToHome>
          }
        />
        <Route
          path="/verify-account"
          element={
            <RedirectToHome>
              <VerifyAccount />
            </RedirectToHome>
          }
        />
        <Route
          path="/forgot-pass"
          element={
            <RedirectToHome>
              <ForgotPass />
            </RedirectToHome>
          }
        />
        <Route
          path="/reset-pass/:id"
          element={
            <RedirectToHome>
              <ResetPass />
            </RedirectToHome>
          }
        />
        <Route
          path="/success-pass-reset"
          element={
            <RedirectToHome>
              <SuccessReset />
            </RedirectToHome>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default App;
