import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { GoPersonAdd, GoPerson } from "react-icons/go";
import api from "../../api";

export const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN über Backend
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Backend-Login!
      const response = await api.login(loginData);

      setSuccess("Login erfolgreich!");
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      window.dispatchEvent(new Event("authStatusChanged"));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setError(error.message || "Login fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.register(registerData);

      setSuccess("Registration successful!");
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      setTimeout(() => {
        setIsLogin(true);
        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }, 2000);
    } catch (error) {
      setError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-30 px-6 md:px-12 pb-20">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div
          className="px-8 py-6"
          style={{
            background:
              "linear-gradient(50deg, #326287 25%, #D59C8C 85%, #E8B09E 100%)",
          }}
        >
          <h2 className="flex justify-center gap-2 items-center text-3xl font-bold text-white text-center">
            <BsStars className="text-[#E8B09E]" />
            Glowify Shop
          </h2>
          <p className="text-white text-center mt-1">
            {isLogin ? "Welcome back!" : "Welcome!"}
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-100 border border-gray-200 text-[#D59C8C] px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-gray-200 border border-gray-200 text-[#D59C8C] px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#326287] mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-3 py-2 rounded border focus:ring-1 focus:ring-[#264a66]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#326287] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full px-3 py-2 rounded border focus:ring-1 focus:ring-[#264a66]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#326287] hover:bg-[#264a66] text-white py-2 rounded"
              >
                <GoPerson className="inline-block mr-2" />
                {loading ? "Login..." : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#326287] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-3 py-2 rounded border focus:ring-1 focus:ring-[#264a66]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#326287] mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-3 py-2 rounded border focus:ring-1 focus:ring-[#264a66]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#326287] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-3 py-2 rounded border focus:ring-1 focus:ring-[#264a66]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#326287] mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                  className="w-full px-3 py-2 rounded border focus:ring-1 focus:ring-[#264a66]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#326287] hover:bg-[#264a66] text-white py-2 rounded"
              >
                <GoPersonAdd className="inline-block mr-2" />
                {loading ? "Register..." : "Register"}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-[#326287]">
              {isLogin ? "New here?" : "Already registered?"}{" "}
              <button
                onClick={switchForm}
                className="text-[#D59C8C] font-semibold"
              >
                {isLogin ? "Register now →" : "Login here →"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;