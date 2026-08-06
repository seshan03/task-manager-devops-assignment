import { createContext, useContext, useEffect, useState } from "react";
import { fetchWithAuth, setToken, clearToken } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth("/api/auth/me");
      const body = await res.json();
      if (res.ok && body.success) setUser(body.data);
      else setUser(null);
    } catch {
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) setToken(token);
      await loadUser();
    };

    initAuth();
  }, []);

  const loginAdmin = async (email, password) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text();
  const body = text ? JSON.parse(text) : {};

  if (!res.ok) throw new Error(body.message || `Login failed (${res.status})`);
  setToken(body.data.token);
  setUser(body.data.user);
  return body.data;
};

  const googleLogin = async (idToken) => {
    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    const body = await res.json();
    if (!res.ok || body.success === false) throw new Error(body.message || "Google login failed");
    setToken(body.data.token);
    setUser(body.data.user);
    return body.data;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginAdmin, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);