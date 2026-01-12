import React, { useEffect, useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";

import StatCard from "../../components/ui/StatCard";
import { useAuth } from "../../context/AuthContext";
import { getAllComplaintsAdmin } from "../../services/adminService";

export default function AdminDashboard() {
  const { user } = useAuth();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */
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

  /* ================= STATS ================= */
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  const resolutionRate = total > 0
    ? Math.round((resolved / total) * 100)
    : 0;

  const recentComplaints = complaints.slice(0, 5);

  /* ================= HELPERS ================= */
  const getStatusBadge = (status = "") => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-600";
      case "In Progress":
        return "bg-blue-500/20 text-blue-600";
      case "Resolved":
        return "bg-green-500/20 text-green-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const getImageUrl = (complaint) => {
  if (
    Array.isArray(complaint.media) &&
    complaint.media.length > 0 &&
    complaint.media[0]?.url
  ) {
    return complaint.media[0].url;
  }
  return null;
};


  /* ================= UI STATES ================= */
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
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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

      {/* Resolution */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card p-6 rounded-xl border">
          <p className="text-sm text-muted-foreground">Resolution Rate</p>
          <p className="text-3xl font-bold mt-1">{resolutionRate}%</p>
          <p className="text-xs text-success mt-2 flex items-center gap-1">
            <TrendingUp size={14} /> Improving
          </p>
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="bg-card rounded-xl border">
        <div className="p-6 border-b flex justify-between">
          <h2 className="text-lg font-semibold">Recent Complaints</h2>
          <a href="/admin/complaints" className="text-sm text-primary hover:underline">
            View all
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-xs text-muted-foreground">Image</th>
                <th className="px-6 py-3 text-left text-xs">Title</th>
                <th className="px-6 py-3 text-left text-xs">User</th>
                <th className="px-6 py-3 text-left text-xs">Category</th>
                <th className="px-6 py-3 text-left text-xs">Status</th>
                <th className="px-6 py-3 text-left text-xs">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {recentComplaints.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-6 text-center text-muted-foreground">
                    No complaints yet
                  </td>
                </tr>
              )}

              {recentComplaints.map(c => {
                const imageUrl = getImageUrl(c);

                return (
                  <tr key={c._id} className="hover:bg-muted/50">
                    <td className="px-6 py-4">
  {getImageUrl(c) ? (
    <img
      src={getImageUrl(c)}
      alt="Complaint"
      className="w-16 h-16 object-cover rounded-md border"
    />
  ) : (
    <span className="text-xs text-muted-foreground">No Image</span>
  )}
</td>


                    <td className="px-6 py-4 text-sm font-medium">{c.title}</td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {c.user?.name || "Unknown"}
                    </td>

                    <td className="px-6 py-4 text-sm">{c.category}</td>

                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(c.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
