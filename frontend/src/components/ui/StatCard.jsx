import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend, color = 'primary' }) {
  const colorClasses = {
    primary: 'from-primary/20 to-primary/5 text-primary border-primary/20',
    success: 'from-success/20 to-success/5 text-success border-success/20',
    warning: 'from-warning/20 to-warning/5 text-warning border-warning/20',
    info: 'from-info/20 to-info/5 text-info border-info/20',
    accent: 'from-accent/20 to-accent/5 text-accent border-accent/20',
  };

  const iconBgClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-info/10 text-info',
    accent: 'bg-accent/10 text-accent',
  };

  return (
    <div className={`stat-card glass-strong rounded-2xl border p-6 card-hover ${colorClasses[color].split(' ').pop()}`}>
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-3 text-sm ${trend >= 0 ? 'text-success' : 'text-destructive'}`}>
              {trend >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">{Math.abs(trend)}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBgClasses[color]}`}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}
