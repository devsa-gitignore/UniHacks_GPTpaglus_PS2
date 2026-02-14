const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const apiUrl = (path) => `${API_BASE_URL}${path}`;

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const response = await fetch(apiUrl("/api/token/refresh/"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  const access = data.access || null;
  if (access) {
    localStorage.setItem("accessToken", access);
  }
  return access;
};

export const authFetch = async (path, options = {}) => {
  const token = localStorage.getItem("accessToken");
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let response = await fetch(apiUrl(path), {
    ...options,
    headers,
  });

  if (response.status !== 401) return response;

  const newAccessToken = await refreshAccessToken();
  if (!newAccessToken) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/login";
    return response;
  }

  response = await fetch(apiUrl(path), {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${newAccessToken}`,
    },
  });

  return response;
};
