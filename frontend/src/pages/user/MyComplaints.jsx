import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ComplaintCard from "../../components/ui/ComplaintCard";
import { categories } from "../../data/mockData";
import { getMyComplaints } from "../../services/complaintService";
import { useEffect } from "react";

export default function MyComplaints() {
   
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        const data = await getMyComplaints();
        setComplaints(data);
      } catch (err) {
        setError("Failed to load complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchMyComplaints();
  }, []);

  // Filter complaints for current user
const filteredComplaints = complaints.filter((complaint) => {
  const matchesSearch =
    complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.description.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesStatus =
    statusFilter === "all" || complaint.status === statusFilter;

  const matchesCategory =
    categoryFilter === "all" || complaint.category === categoryFilter;

  return matchesSearch && matchesStatus && matchesCategory;
});



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">My Complaints</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all your submitted complaints
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search complaints..."
            className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground transition-all"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 text-foreground transition-all"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary/50 text-foreground transition-all"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <Filter className="w-4 h-4" />
        <span>Showing {filteredComplaints.length} of {complaints.length} complaints</span>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredComplaints.map((complaint, index) => (
          <div key={complaint._id} className="animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
            <ComplaintCard complaint={complaint} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredComplaints.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl border border-border animate-fade-in">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No complaints found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
