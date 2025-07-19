const API_BASE_URL = "http://localhost:8000";

class GlowifyAPI {
  async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    return this.makeRequest("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const response = await this.makeRequest("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }
    if (response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  }

  async createOrder(orderData) {
    return this.makeRequest("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }
}

const api = new GlowifyAPI();
export default api;