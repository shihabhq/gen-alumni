"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken || refreshToken) {
      router.replace("/member/profile"); // prevents going back to login page
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await login(username, password);
      if (!data) {
        setError("An unexpected error occured");
        return;
      }

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user?.student_profile));
      router.push("/member/profile");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-20 flex items-center justify-center px-4"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#006747" }}>
            Member Login
          </h1>
          <p className="text-charcoal/60">Sign in to your BBA Alumni account</p>
        </div>

        {/* Form Card */}
        <div
          className="bg-white rounded-lg shadow-lg p-8 border-t-4"
          style={{ borderColor: "#006747" }}
        >
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username/ID Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1e293b" }}
              >
                Username, Email, or University ID
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., 24230115084 or student@example.com"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                style={{ borderColor: "#007f8c" }}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1e293b" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                style={{ borderColor: "#007f8c" }}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="p-3 rounded-lg text-sm"
                style={{ backgroundColor: "#ef4444", color: "white" }}
              >
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
              style={{ backgroundColor: "#006747" }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full border-t"
                style={{ borderColor: "#e2e8f0" }}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-2"
                style={{ backgroundColor: "white", color: "#64748b" }}
              >
                or
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-charcoal/70 mb-3">Don&apos;t have an account?</p>
            <Link
              href="/member/register"
              className="inline-block px-6 py-2 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: "#a3e635",
                color: "#1e293b",
              }}
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Demo Info */}
        <div
          className="mt-6 p-4 rounded-lg text-sm"
          style={{
            backgroundColor: "#f8fafc",
            borderLeft: "4px solid #a3e635",
            color: "#1e293b",
          }}
        >
          <p className="font-semibold mb-2">Demo Credentials:</p>
          <p>Username: 24230115084</p>
          <p>Password: any password</p>
        </div>
      </div>
    </div>
  );
}
