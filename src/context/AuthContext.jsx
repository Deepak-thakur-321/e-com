import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Persist across page refreshes
    try {
      const saved = localStorage.getItem("velor_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    // ── In production: call your API here and get back user object ──
    // For now, store minimal identity (name won't be known on login unless fetched)
    const userData = {
      email,
      name: email.split("@")[0].replace(/[^a-zA-Z\s]/g, " ").trim() || "Member",
      createdAt: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem("velor_user", JSON.stringify(userData));
  };

  const register = (name, email, password) => {
    // ── In production: call your API, get token, store user ──
    const userData = {
      name,
      email,
      createdAt: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem("velor_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("velor_user");
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("velor_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};