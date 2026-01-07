import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FileText, 
  Map, 
  Users,
  Settings,
  ChevronRight,
  BarChart3,
  Sparkles
} from 'lucide-react';

const userLinks = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/new-complaint', icon: PlusCircle, label: 'New Complaint' },
  { to: '/my-complaints', icon: FileText, label: 'My Complaints' },
  { to: '/map', icon: Map, label: 'Map View' },
];

const adminLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/complaints', icon: FileText, label: 'Manage Complaints' },
  { to: '/admin/users', icon: Users, label: 'User Control' },
  { to: '/map', icon: Map, label: 'Map View' },
];

export default function Sidebar() {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar border-r border-sidebar-border overflow-y-auto">
      {/* Decorative element */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="relative p-4">
        <div className="flex items-center gap-2 px-4 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </p>
        </div>
        
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`sidebar-link group ${isActive ? 'active' : ''}`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isActive ? 'bg-primary/20' : 'bg-muted/50 group-hover:bg-muted'
                }`}>
                  <link.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                </div>
                <span className="flex-1 font-medium">{link.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Stats for User */}
        {!isAdmin && (
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
            <p className="text-sm font-semibold text-foreground mb-3 relative">Quick Stats</p>
            <div className="space-y-3 text-sm relative">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active</span>
                <span className="px-2 py-0.5 rounded-full bg-warning/20 text-warning text-xs font-medium">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Resolved</span>
                <span className="px-2 py-0.5 rounded-full bg-success/20 text-success text-xs font-medium">7</span>
              </div>
            </div>
          </div>
        )}

        {/* Admin Stats */}
        {isAdmin && (
          <div className="mt-8 p-5 rounded-2xl glass border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl" />
            <p className="text-sm font-semibold text-foreground mb-3 relative">System Status</p>
            <div className="space-y-2 relative">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm text-muted-foreground">All systems operational</span>
              </div>
            </div>
          </div>
        )}

        {/* Settings Link */}
        <div className="mt-6 pt-6 border-t border-sidebar-border">
          <NavLink
            to="/settings"
            className={`sidebar-link ${location.pathname === '/settings' ? 'active' : ''}`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              location.pathname === '/settings' ? 'bg-primary/20' : 'bg-muted/50'
            }`}>
              <Settings className="w-5 h-5" />
            </div>
            <span className="font-medium">Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
