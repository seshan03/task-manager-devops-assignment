const API_URL = "/api";

let _token = null;

export const setToken = (token) => {
  _token = token;
  if (token) localStorage.setItem("authToken", token);
  else localStorage.removeItem("authToken");
};

export const getToken = () => _token || localStorage.getItem("authToken");

export const clearToken = () => {
  _token = null;
  localStorage.removeItem("authToken");
};

export const checkBackendHealth = async () => {
  const response = await fetch(`${API_URL}/health`);
  if (!response.ok) throw new Error("Backend connection failed");
  return response.json();
};

export const fetchWithAuth = async (path, options = {}) => {
  const headers = { ...(options.headers || {}) };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(path.startsWith("http") ? path : `${path}`, {
    ...options,
    headers,
  });
  if (res.status === 401) {
    clearToken();
    throw new Error("Unauthorized");
  }
  return res;
};