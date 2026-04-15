const API_URL = "http://localhost:8000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    ...options
  });

  const isJSON = response.headers.get("content-type")?.includes("application/json");
  const payload = isJSON ? await response.json() : null;

  if (!response.ok) {
    const detail = payload?.detail ?? "Error inesperado en la API";
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }

  return payload;
}

export const api = {
  register: (data) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  login: (data) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  logout: (simulateError = true) => request(`/auth/logout?simulate_error=${simulateError}`, { method: "POST" }),
  listUsers: () => request("/users"),
  getUser: (userId) => request(`/users/${userId}`),
  createProduct: (data) =>
    request("/products", {
      method: "POST",
      body: JSON.stringify(data)
    }),
  listProducts: (includeInactive = true) => request(`/products?include_inactive=${includeInactive}`),
  getProduct: (productId) => request(`/products/${productId}`),
  updateProduct: (productId, data) =>
    request(`/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),
  deleteProduct: (productId) =>
    request(`/products/${productId}`, {
      method: "DELETE"
    }),
  dashboardSummary: () => request("/dashboard/summary"),
  dashboardStockAlerts: () => request("/dashboard/stock-alerts"),
  dashboardRecentProducts: () => request("/dashboard/recent-products")
};

