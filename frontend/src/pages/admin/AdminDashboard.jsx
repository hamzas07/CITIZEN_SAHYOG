import React, { useEffect, useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users
} from "lucide-react";

import StatCard from "../../components/ui/StatCard";
import { useAuth } from "../../context/AuthContext";
import { getAllComplaintsAdmin } from "../../services/adminService";

export default function AdminDashboard() {
  const { user } = useAuth();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch complaints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllComplaintsAdmin();
        setComplaints(data || []);
      } catch (err) {
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ---- Stats Calculation ----
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const resolutionRate = total > 0
    ? Math.round((resolved / total) * 100)
    : 0;

  const recentComplaints = complaints.slice(0, 5);

  // ---- Helpers ----
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-600";
      case "in_progress":
        return "bg-blue-500/20 text-blue-600";
      case "resolved":
        return "bg-green-500/20 text-green-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const getCategoryBadge = (category) => {
    return "bg-primary/80";
  };

  // ---- UI STATES ----
  if (loading) {
    return <p className="text-muted-foreground">Loading admin dashboard...</p>;
  }

  if (error) {
    return <p className="text-destructive">{error}</p>;
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, <span className="text-primary">{user?.name}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Complaints" value={total} icon={FileText} />
        <StatCard title="Pending" value={pending} icon={Clock} color="warning" />
        <StatCard title="In Progress" value={inProgress} icon={AlertCircle} />
        <StatCard title="Resolved" value={resolved} icon={CheckCircle} color="success" />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Total Complaints</p>
          <p className="text-3xl font-bold mt-1">{total}</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <p className="text-sm text-muted-foreground">Resolution Rate</p>
          <p className="text-3xl font-bold mt-1">{resolutionRate}%</p>
          <p className="text-xs text-success mt-2 flex items-center gap-1">
            <TrendingUp size={14} /> Improving
          </p>
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="bg-card rounded-xl border border-border">
        <div className="p-6 border-b border-border flex justify-between">
          <h2 className="text-lg font-semibold">Recent Complaints</h2>
          <a href="/admin/complaints" className="text-sm text-primary hover:underline">
            View all
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs text-muted-foreground">Title</th>
                <th className="px-6 py-3 text-left text-xs text-muted-foreground">User</th>
                <th className="px-6 py-3 text-left text-xs text-muted-foreground">Category</th>
                <th className="px-6 py-3 text-left text-xs text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-xs text-muted-foreground">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {recentComplaints.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-6 text-center text-muted-foreground">
                    No complaints yet
                  </td>
                </tr>
              )}

              {recentComplaints.map(c => (
                <tr key={c._id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm font-medium">
                    {c.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {c.user?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-xs text-white ${getCategoryBadge(c.category)}`}>
                      {c.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(c.status)}`}>
                      {c.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(c.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
