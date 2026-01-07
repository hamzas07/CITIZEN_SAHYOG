import React from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import StatCard from "../../components/ui/StatCard";
import ComplaintCard from "../../components/ui/ComplaintCard";
import { useEffect, useState } from 'react';
import { getAllComplaints } from "../../services/complaintService";


import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

const [complaints, setComplaints] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
useEffect(() => {
  const fetchComplaints = async () => {
    try {
      const data = await getAllComplaints();

      // 👤 only this user's complaints
      const myComplaints = data.filter(
        (c) =>c.user === user.id || c.user?._id === user.id

      );

      setComplaints(myComplaints);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) fetchComplaints();
}, [user]);

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
  };
if (loading) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

if (error) {
  return (
    <div className="text-center py-20 text-destructive">
      {error}
    </div>
  );
}

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="animate-fade-in relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
          <Sparkles className="w-4 h-4" />
          Welcome back
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Hello, <span className="text-gradient">{user?.name}</span>
        </h1>
        <p className="text-muted-foreground mt-2 max-w-lg">
          Track your submitted complaints and their resolution status. Your voice matters in improving public services.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="animate-fade-in stagger-1">
          <StatCard 
            title="Total Complaints" 
            value={stats.total} 
            icon={FileText}
            color="primary"
          />
        </div>
        <div className="animate-fade-in stagger-2">
          <StatCard 
            title="Pending" 
            value={stats.pending} 
            icon={Clock}
            color="warning"
          />
        </div>
        <div className="animate-fade-in stagger-3">
          <StatCard 
            title="In Progress" 
            value={stats.inProgress} 
            icon={AlertCircle}
            color="info"
          />
        </div>
        <div className="animate-fade-in stagger-4">
          <StatCard 
            title="Resolved" 
            value={stats.resolved} 
            icon={CheckCircle}
            color="success"
          />
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="animate-fade-in stagger-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Recent Complaints</h2>
            <p className="text-sm text-muted-foreground">Your latest submitted grievances</p>
          </div>
          <Link 
            to="/my-complaints" 
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {complaints.slice(0, 4).map((complaint, index) => (
            <div key={complaint._id} style={{ animationDelay: `${0.1 * index}s` }}>
              <ComplaintCard complaint={complaint} />
            </div>
          ))}
        </div>

        {complaints.length === 0 && (
          <div className="text-center py-16 glass-strong rounded-2xl">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No complaints yet</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Start by submitting your first complaint. We're here to help resolve your concerns.
            </p>
            <Link
              to="/new-complaint"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary"
            >
              Submit Complaint
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
