"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../../../lib/api";

const BATCHES = Array.from({ length: 16 }, (_, i) => `BBA ${i + 1}`);

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    batch: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    console.log(formData);

    setIsLoading(true);

    try {
      const data = await register({
        username: formData.username || formData.email,
        password: formData.password,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        batch: formData.batch,
        country: formData.country,
      });

      if (!data) {
        setError("Registration failed. Please try again.");
        return;
      }

      localStorage.setItem("access_token", data.access_token || data.access);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/member/profile");
    } catch (err) {
      console.log(err);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-20 flex items-center justify-center px-4"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#006747" }}>
            Create Account
          </h1>
          <p className="text-charcoal/60">Join the BBA Alumni Network</p>
        </div>

        {/* Form Card */}
        <div
          className="bg-white rounded-lg shadow-lg p-8 border-t-4"
          style={{ borderColor: "#006747" }}
        >
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1e293b" }}
                >
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{ borderColor: "#007f8c" }}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1e293b" }}
                >
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{ borderColor: "#007f8c" }}
                  required
                />
              </div>
            </div>

            {/* University ID (Optional) */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1e293b" }}
              >
                University ID (Optional but recommended)
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g., 24230115084"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                style={{ borderColor: "#007f8c" }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1e293b" }}
              >
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@example.com"
                className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                style={{ borderColor: "#007f8c" }}
                required
              />
            </div>

            {/* Batch and Program */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1e293b" }}
                >
                  Country of Residence *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Bangladesh"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{ borderColor: "#007f8c" }}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1e293b" }}
                >
                  Batch *
                </label>
                <select
                  name="batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{ borderColor: "#007f8c" }}
                  required
                >
                  <option value="">Select Batch</option>
                  {BATCHES.map((batch) => (
                    <option key={batch} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1e293b" }}
                >
                  Program *
                </label>
                <select
                  name="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{ borderColor: "#007f8c" }}
                  required
                >
                  <option value="">Select Program</option>
                  {PROGRAMS.map((program) => (
                    <option key={program} value={program}>
                      {program.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div> */}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1e293b" }}
                >
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{ borderColor: "#007f8c" }}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1e293b" }}
                >
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
                  style={{ borderColor: "#007f8c" }}
                  required
                />
              </div>
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

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
              style={{ backgroundColor: "#006747" }}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-charcoal/70 mb-3">Already have an account?</p>
            <Link
              href="/member/login"
              className="inline-block px-6 py-2 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: "#a3e635",
                color: "#1e293b",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
