import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  TrendingUp,
  TrendingDown,
  FileText,
  Users,
  CheckCircle,
  Clock,
  BarChart3,
  PieChartIcon,
  Activity
} from "lucide-react";

/* ================= MOCK DATA ================= */
const monthlyData = [
  { month: "Jul", complaints: 45, resolved: 38 },
  { month: "Aug", complaints: 62, resolved: 52 },
  { month: "Sep", complaints: 78, resolved: 65 },
  { month: "Oct", complaints: 91, resolved: 78 },
  { month: "Nov", complaints: 85, resolved: 80 },
  { month: "Dec", complaints: 110, resolved: 95 },
  { month: "Jan", complaints: 98, resolved: 88 }
];

const categoryData = [
  { name: "Infrastructure", value: 35, color: "#0ea5e9" },
  { name: "Water", value: 25, color: "#06b6d4" },
  { name: "Sanitation", value: 20, color: "#10b981" },
  { name: "Roads", value: 12, color: "#f59e0b" },
  { name: "Electricity", value: 8, color: "#eab308" }
];

const statusData = [
  { name: "Pending", value: 32, color: "#f59e0b" },
  { name: "In Progress", value: 28, color: "#0ea5e9" },
  { name: "Resolved", value: 40, color: "#10b981" }
];

const weeklyTrend = [
  { day: "Mon", complaints: 12 },
  { day: "Tue", complaints: 19 },
  { day: "Wed", complaints: 15 },
  { day: "Thu", complaints: 22 },
  { day: "Fri", complaints: 18 },
  { day: "Sat", complaints: 8 },
  { day: "Sun", complaints: 5 }
];

/* ================= COLOR MAPS (FIX) ================= */
const statColorMap = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary"
  },
  success: {
    bg: "bg-success/10",
    text: "text-success"
  },
  info: {
    bg: "bg-info/10",
    text: "text-info"
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent"
  }
};

/* ================= TOOLTIP ================= */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-xl">
      <p className="text-sm font-medium mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm" style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const stats = [
    {
      title: "Total Complaints",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: FileText,
      color: "primary"
    },
    {
      title: "Resolution Rate",
      value: "87.3%",
      change: "+5.2%",
      trend: "up",
      icon: CheckCircle,
      color: "success"
    },
    {
      title: "Avg. Resolution Time",
      value: "4.2 days",
      change: "-1.3 days",
      trend: "up",
      icon: Clock,
      color: "info"
    },
    {
      title: "Active Users",
      value: "3,892",
      change: "+8.7%",
      trend: "up",
      icon: Users,
      color: "accent"
    }
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-3">
            <Activity size={16} />
            Analytics Dashboard
          </div>
          <h1 className="text-3xl font-bold">Performance Insights</h1>
          <p className="text-muted-foreground">
            Overview of grievance metrics
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          const color = statColorMap[s.color];

          return (
            <div key={s.title} className="bg-card p-6 rounded-2xl border">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.title}</p>
                  <p className="text-3xl font-bold">{s.value}</p>
                  <div
                    className={`flex items-center gap-1 mt-2 text-sm ${
                      s.trend === "up"
                        ? "text-success"
                        : "text-destructive"
                    }`}
                  >
                    {s.trend === "up" ? (
                      <TrendingUp size={16} />
                    ) : (
                      <TrendingDown size={16} />
                    )}
                    {s.change}
                  </div>
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${color.bg}`}
                >
                  <Icon className={`${color.text}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Monthly */}
        <div className="bg-card p-6 rounded-2xl border">
          <h3 className="font-semibold mb-4">Monthly Complaints</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey="complaints"
                stroke="#0ea5e9"
                fill="#0ea5e933"
                name="Complaints"
              />
              <Area
                dataKey="resolved"
                stroke="#10b981"
                fill="#10b98133"
                name="Resolved"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category */}
        <div className="bg-card p-6 rounded-2xl border">
          <h3 className="font-semibold mb-4">Category Distribution</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={50}
                outerRadius={90}
                dataKey="value"
              >
                {categoryData.map((c, i) => (
                  <Cell key={i} fill={c.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly */}
      <div className="bg-card p-6 rounded-2xl border">
        <h3 className="font-semibold mb-4">Weekly Trend</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyTrend}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="complaints" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
