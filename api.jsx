import axios from 'axios';

const API_BASE_URL = "http://localhost:8000";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }
    
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Backend server is not running. Please start the backend server.');
    }
    
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || `HTTP ${error.response.status}: ${error.response.statusText}`;
      throw new Error(message);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

class GlowifyAPI {
  async makeRequest(endpoint, options = {}) {
    try {
      const response = await apiClient({
        url: endpoint,
        ...options,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    const response = await this.makeRequest("/users/register", {
      method: "POST",
      data: userData,
    });
    return response;
  }

  async login(credentials) {
    const response = await this.makeRequest("/users/login", {
      method: "POST",
      data: credentials,
    });
    
    if (response.token) {
      localStorage.setItem("authToken", response.token);
    }
    if (response.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  }

  async logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  async getProfile() {
    return this.makeRequest("/users/profile", {
      method: "GET",
    });
  }

  async createOrder(orderData) {
    return this.makeRequest("/orders", {
      method: "POST",
      data: orderData,
    });
  }

  async getUserOrders() {
    return this.makeRequest("/orders", {
      method: "GET",
    });
  }

  async getOrderById(orderId) {
    return this.makeRequest(`/orders/${orderId}`, {
      method: "GET",
    });
  }

  async sendChatMessage(message, conversationHistory = []) {
    return this.makeRequest("/chat", {
      method: "POST",
      data: {
        message,
        conversationHistory,
      },
    });
  }

  // Helper method to check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("authToken");
  }

  // Helper method to get current user
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}

const api = new GlowifyAPI();
export default api;