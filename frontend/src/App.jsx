import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Dashboard from "./pages/user/Dashboard";
import MyComplaints from "./pages/user/MyComplaints";
import NewComplaint from "./pages/user/NewComplaint";
import MapPage from "./pages/user/MapPage";
import Settings from "./pages/user/Settings";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

// Admin Pages (no guest access later)
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageComplaints from "./pages/admin/ManageComplaints";
import UserControl from "./pages/admin/UserControl";

import NotFound from "./pages/NotFound";

// Layout
import DashboardLayout from "./components/layout/DashboardLayout";
import Analytics from "./pages/admin/Analytics";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User + Admin Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-complaints" element={<MyComplaints />} />
            <Route path="/new-complaint" element={<NewComplaint />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/settings" element={<Settings />} />

            {/* Admin (PROTECTED LATER) */}
             <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/complaints"
    element={
      <AdminRoute>
        <ManageComplaints />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/users"
    element={
      <AdminRoute>
        <UserControl />
      </AdminRoute>
    }
  />
  <Route
    path="/admin/analytics"
    element={
      <AdminRoute>
        <Analytics />
      </AdminRoute>
    }
  />
  
</Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
