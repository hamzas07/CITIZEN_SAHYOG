import React, { useEffect, useState } from "react";
import { Search, Trash2, Edit } from "lucide-react";

import {
  getAllComplaintsAdmin,
  updateComplaintStatus,
  deleteComplaint
} from "../../services/adminService";

export default function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- FETCH ----------------
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getAllComplaintsAdmin();
        setComplaints(data || []);
      } catch (err) {
        setError("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // ---------------- SEARCH ----------------
  const filteredComplaints = complaints.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ---------------- STATUS UPDATE ----------------
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateComplaintStatus(id, newStatus);

      setComplaints((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setEditingId(null);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;

    try {
      await deleteComplaint(id);
      setComplaints((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Failed to delete complaint");
    }
  };

  // ---------------- HELPERS ----------------
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

  const statusBadge = (status) => {
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

  // ---------------- UI STATES ----------------
  if (loading) return <p className="text-muted-foreground">Loading complaints...</p>;
  if (error) return <p className="text-destructive">{error}</p>;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Complaints</h1>
          <p className="text-muted-foreground">
            Review, update or delete complaints
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search complaints..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-muted border border-border focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-xs text-muted-foreground">Complaint</th>
                <th className="px-6 py-4 text-left text-xs text-muted-foreground">User</th>
                <th className="px-6 py-4 text-left text-xs text-muted-foreground">Category</th>
                <th className="px-6 py-4 text-left text-xs text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-left text-xs text-muted-foreground">Date</th>
                <th className="px-6 py-4 text-right text-xs text-muted-foreground">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-muted-foreground">
                    No complaints found
                  </td>
                </tr>
              )}

              {filteredComplaints.map((c) => (
                <tr key={c._id} className="hover:bg-muted/40">
                  <td className="px-6 py-4">
                    <p className="font-medium truncate">{c.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {c.address}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {c.user?.name || "Unknown"}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded text-xs bg-primary text-white">
                      {c.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {editingId === c._id ? (
                      <select
                        value={c.status}
                        onChange={(e) =>
                          handleStatusChange(c._id, e.target.value)
                        }
                        onBlur={() => setEditingId(null)}
                        autoFocus
                        className="px-2 py-1 rounded text-xs bg-muted border border-border"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    ) : (
                      <button
                        onClick={() => setEditingId(c._id)}
                        className={`px-2 py-0.5 rounded text-xs ${statusBadge(c.status)}`}
                      >
                        {c.status.replace("_", " ")}
                      </button>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {formatDate(c.createdAt)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingId(c._id)}
                        className="p-2 hover:bg-muted rounded-lg"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(c._id)}
                        className="p-2 hover:bg-destructive/10 text-destructive rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Footer */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredComplaints.length} of {complaints.length} complaints
      </p>

    </div>
  );
}
