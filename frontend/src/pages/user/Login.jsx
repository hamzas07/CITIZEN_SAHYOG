import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Shield, Mail, Lock, ArrowRight, User, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, guestLogin } = useAuth();
  const navigate = useNavigate();

  // 🔐 REAL LOGIN
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  const result = await login(email, password);

  if (result.success) {
    if (result.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  } else {
    setError(result.error || "Login failed. Please try again.");
  }

  setLoading(false);
};

  // 👤 GUEST CITIZEN LOGIN ONLY
 const handleGuestLogin = () => {
  setLoading(true);
  const result = guestLogin();
  if (result.success) {
    navigate("/dashboard");
  }
  setLoading(false);
};


  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px]" />
      </div>

      <div className="w-full max-w-md relative">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl">
            <Shield className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Citizen Sahyog</h1>
          <p className="text-muted-foreground mt-2">Government Grievance Portal</p>
        </div>

        {/* Card */}
        <div className="glass-strong rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold mb-6">Welcome Back</h2>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted/50 border border-border focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl btn-primary flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : <>Sign In <ArrowRight /></>}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 border-t border-border" />

          {/* Guest Citizen */}
          <button
            onClick={handleGuestLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl border border-border bg-secondary/30 hover:bg-secondary flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4 text-primary" />
            Continue as Guest Citizen
          </button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don’t have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2025 Government of India
        </p>
      </div>
    </div>
  );
}
