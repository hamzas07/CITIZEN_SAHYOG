import React, { useEffect, useState } from "react";
import {
  Search,
  UserX,
  UserCheck,
  Shield,
  Mail,
  Calendar
} from "lucide-react";

import { blockUser, getAllUsersAdmin } from "../../services/adminService";

export default function UserControl() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH USERS (ADMIN) ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsersAdmin();
        setUsers(data || []);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* ================= SEARCH ================= */
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ================= BLOCK / UNBLOCK ================= */
  const handleToggleBlock = async (userId) => {
    try {
      await blockUser(userId);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId
            ? { ...u, isBlocked: !u.isBlocked }
            : u
        )
      );
    } catch (err) {
      alert("Failed to update user status");
    }
  };

  /* ================= HELPERS ================= */
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });

  if (loading)
    return <p className="text-muted-foreground">Loading users...</p>;

  if (error)
    return <p className="text-destructive">{error}</p>;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Control</h1>
          <p className="text-muted-foreground">
            Manage registered users and access
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-muted border border-border"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>

        <div className="bg-card p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Active Users</p>
          <p className="text-2xl font-bold text-success">
            {users.filter((u) => !u.isBlocked).length}
          </p>
        </div>

        <div className="bg-card p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Blocked Users</p>
          <p className="text-2xl font-bold text-destructive">
            {users.filter((u) => u.isBlocked).length}
          </p>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className={`bg-card p-5 rounded-xl border ${
              user.isBlocked ? "border-destructive/30" : ""
            }`}
          >
            {/* Header */}
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    user.isBlocked
                      ? "bg-destructive/20 text-destructive"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  <Shield size={18} />
                </div>

                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-xs text-muted-foreground flex gap-1 items-center">
                    <Mail size={12} />
                    {user.email}
                  </p>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-xs ${
                  user.isBlocked
                    ? "bg-destructive/20 text-destructive"
                    : "bg-success/20 text-success"
                }`}
              >
                {user.isBlocked ? "blocked" : "active"}
              </span>
            </div>

            {/* Meta */}
            <div className="text-sm text-muted-foreground mb-4 flex justify-between">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                Joined
              </span>
              <span>{formatDate(user.createdAt)}</span>
            </div>

            {/* Action */}
            <button
              onClick={() => handleToggleBlock(user._id)}
              className={`w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                user.isBlocked
                  ? "bg-success/10 text-success hover:bg-success/20"
                  : "bg-destructive/10 text-destructive hover:bg-destructive/20"
              }`}
            >
              {user.isBlocked ? (
                <>
                  <UserCheck size={16} /> Unblock User
                </>
              ) : (
                <>
                  <UserX size={16} /> Block User
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 bg-card border rounded-xl">
          <Search className="mx-auto mb-4 text-muted-foreground" size={40} />
          <p className="text-muted-foreground">No users found</p>
        </div>
      )}
    </div>
  );
}
