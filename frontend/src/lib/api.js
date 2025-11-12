export const authApi = {
  signup: (payload) => api.post("/auth/signup", payload),
  login: (payload) => api.post("/auth/login", payload),
};
const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    let message = "";
    try {
      message = await response.text();
    } catch (e) {
      // ignore
    }
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await response.json();
  }

  return await response.text();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  del: (path) =>
    request(path, {
      method: "DELETE",
    }),
};

export const projectsApi = {
  list: () => api.get("/projects"),
  create: (payload) => api.post("/projects", payload),
  remove: (id) => api.del(`/projects/${id}`),
};

export const alumniApi = {
  list: () => api.get("/alumni"),
  create: (payload) => api.post("/alumni", payload),
  remove: (id) => api.del(`/alumni/${id}`),
};

export const eventsApi = {
  list: () => api.get("/events"),
  create: (payload) => api.post("/events", payload),
  remove: (id) => api.del(`/events/${id}`),
};

export const notificationsApi = {
  list: () => api.get("/notifications"),
  create: (payload) => api.post("/notifications", payload),
  remove: (id) => api.del(`/notifications/${id}`),
};

export default api;
