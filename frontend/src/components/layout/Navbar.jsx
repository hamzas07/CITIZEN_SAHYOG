import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, LogOut, User, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass-strong border-b border-border z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-background flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-success-foreground" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Citizen Sahyog</h1>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? 'Government Portal' : 'Citizen Portal'}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl hover:bg-secondary transition-colors group">
            <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-border" />

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize flex items-center gap-1 justify-end">
                <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-accent' : 'bg-success'}`} />
                {user?.role}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/20">
              <User className="w-5 h-5 text-primary" />
            </div>
            <button 
              onClick={handleLogout}
              className="p-2.5 rounded-xl hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
