const API_URL = "http://localhost:5000/api";

export const checkBackendHealth = async () => {
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("Backend connection failed");
  }

  return response.json();
};