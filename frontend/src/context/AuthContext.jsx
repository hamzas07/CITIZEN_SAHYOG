import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const API_BASE_URL = "http://localhost:7878/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("citizen_sahyog_user");
    const token = localStorage.getItem("citizen_sahyog_token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // -------------------------
  // REAL LOGIN (BACKEND)
  // -------------------------
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      const loggedInUser = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role
      };

      setUser(loggedInUser);
      localStorage.setItem(
        "citizen_sahyog_user",
        JSON.stringify(loggedInUser)
      );
      localStorage.setItem("citizen_sahyog_token", data.token);

      return { success: true, role: data.user.role };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // -------------------------
  // GUEST USER (READ-ONLY)
  // -------------------------
  const guestLogin = () => {
    const guestUser = {
      id: "guest-user",
      name: "Guest Citizen",
      email: "guest@citizensahyog.app",
      role: "guest"
    };

    setUser(guestUser);
    localStorage.setItem(
      "citizen_sahyog_user",
      JSON.stringify(guestUser)
    );
    localStorage.removeItem("citizen_sahyog_token");

    return { success: true, role: "guest" };
  };

  // -------------------------
  // REGISTER (BACKEND)
  // -------------------------
  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // -------------------------
  // LOGOUT
  // -------------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("citizen_sahyog_user");
    localStorage.removeItem("citizen_sahyog_token");
  };

const value = {
  user,
  loading,
  login,
  guestLogin,
  register,
  logout,
  isAuthenticated: !!user,
  isAdmin: user?.role === "admin",
  isGuest: user?.role === "guest"
};


  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
