"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateProfile } from "@/lib/api";

interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  student_profile?: {
    uni_id: string;
    batch: string;
    program: string;
    is_cr?: boolean;
  };
}

interface UserProfile {
  first_name: string;
  last_name: string;
  uni_id: string;
  bio: string;
  profile_pic: string;
  batch: string;
  program: string;
  current_job_position: string;
  current_company: string;
  email: string;
  phone: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  is_cr: boolean;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    uni_id: "",
    bio: "",
    profile_pic: "",
    batch: "",
    program: "",
    current_job_position: "",
    current_company: "",
    email: "",
    phone: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    is_cr: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user");

    if (!token) {
      router.push("/member/login");
      return;
    }

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Initialize profile with user data
      setProfile((prev) => ({
        ...prev,
        first_name: parsedUser.first_name || "",
        last_name: parsedUser.last_name || "",
        email: parsedUser.email || "",
        uni_id: parsedUser.student_profile?.uni_id || "",
        batch: parsedUser.student_profile?.batch || "",
        program: parsedUser.student_profile?.program || "",
        is_cr: parsedUser.student_profile?.is_cr || false,
      }));
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const token = localStorage.getItem("access_token");
      const uniId = user?.student_profile?.uni_id;

      if (!token || !uniId) {
        throw new Error("Missing token or university ID");
      }

      await updateProfile(uniId, {
        first_name: profile.first_name,
        last_name: profile.last_name,
        bio: profile.bio,
        profile_pic: profile.profile_pic,
        current_job_position: profile.current_job_position,
        current_company: profile.current_company,
        phone: profile.phone,
        linkedin: profile.linkedin,
        facebook: profile.facebook,
        instagram: profile.instagram,
      });

      // Update local state with new data
      if (user) {
        const updatedUser: User = {
          ...user,
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      setIsEditing(false);
    } catch (err) {
      console.error("[v0] Failed to save profile:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/member/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "#006747" }}
        ></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "#f8fafc" }}>
      {/* Header with Profile Image */}
      <div
        className="py-12 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #006747 0%, #007f8c 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-6 flex justify-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white"
              style={{ backgroundColor: "#006747" }}
            >
              {profile.first_name[0]}
              {profile.last_name[0]}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="text-white/80 mb-4">{profile.uni_id}</p>

          {profile.current_company && (
            <div className="text-white/90">
              <p className="font-semibold">{profile.current_job_position}</p>
              <p>at {profile.current_company}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: "#006747" }}
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-lg font-semibold transition-all"
                style={{ backgroundColor: "#f8fafc", color: "#006747" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-6 py-2 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: "#006747" }}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 rounded-lg font-semibold transition-all"
                style={{ backgroundColor: "#f8fafc", color: "#006747" }}
              >
                Cancel
              </button>
            </>
          )}
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {isEditing ? (
            <div className="space-y-6">
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: "#006747" }}
              >
                Edit Profile
              </h2>

              {/* Basic Info */}
              <div className="space-y-4">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#007f8c" }}
                >
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1e293b" }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={profile.first_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                      style={{ borderColor: "#007f8c" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1e293b" }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={profile.last_name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                      style={{ borderColor: "#007f8c" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1e293b" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                    style={{ borderColor: "#007f8c" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1e293b" }}
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="e.g., 01712345678"
                    className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                    style={{ borderColor: "#007f8c" }}
                  />
                </div>
              </div>

              {/* Professional Info */}
              <div
                className="space-y-4 pt-4 border-t"
                style={{ borderColor: "#e2e8f0" }}
              >
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#007f8c" }}
                >
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1e293b" }}
                    >
                      Current Company
                    </label>
                    <input
                      type="text"
                      name="current_company"
                      value={profile.current_company}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                      style={{ borderColor: "#007f8c" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1e293b" }}
                    >
                      Job Position
                    </label>
                    <input
                      type="text"
                      name="current_job_position"
                      value={profile.current_job_position}
                      onChange={handleChange}
                      placeholder="Job title"
                      className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                      style={{ borderColor: "#007f8c" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1e293b" }}
                  >
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                    style={{ borderColor: "#007f8c" }}
                  />
                </div>
              </div>

              {/* Social Media */}
              <div
                className="space-y-4 pt-4 border-t"
                style={{ borderColor: "#e2e8f0" }}
              >
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#007f8c" }}
                >
                  Social Media Links
                </h3>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1e293b" }}
                  >
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                    style={{ borderColor: "#007f8c" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1e293b" }}
                  >
                    Facebook
                  </label>
                  <input
                    type="url"
                    name="facebook"
                    value={profile.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/yourprofile"
                    className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                    style={{ borderColor: "#007f8c" }}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1e293b" }}
                  >
                    Instagram
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={profile.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/yourprofile"
                    className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                    style={{ borderColor: "#007f8c" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: "#006747" }}
                >
                  Profile Information
                </h2>
              </div>

              {/* Basic Info Display */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#007f8c" }}
                >
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-charcoal/60 mb-1">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal/60 mb-1">Phone</p>
                    <p className="font-medium">
                      {profile.phone || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal/60 mb-1">Batch</p>
                    <p className="font-medium">{profile.batch}</p>
                  </div>
                  <div>
                    <p className="text-sm text-charcoal/60 mb-1">Program</p>
                    <p className="font-medium">
                      {profile.program.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Info Display */}
              <div className="pt-6 border-t" style={{ borderColor: "#e2e8f0" }}>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#007f8c" }}
                >
                  Professional Information
                </h3>
                <div className="space-y-4">
                  {profile.current_company && (
                    <div>
                      <p className="text-sm text-charcoal/60 mb-1">
                        Current Company
                      </p>
                      <p className="font-medium">{profile.current_company}</p>
                    </div>
                  )}
                  {profile.current_job_position && (
                    <div>
                      <p className="text-sm text-charcoal/60 mb-1">
                        Job Position
                      </p>
                      <p className="font-medium">
                        {profile.current_job_position}
                      </p>
                    </div>
                  )}
                  {profile.bio && (
                    <div>
                      <p className="text-sm text-charcoal/60 mb-1">Bio</p>
                      <p className="font-medium">{profile.bio}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links Display */}
              {(profile.linkedin || profile.facebook || profile.instagram) && (
                <div
                  className="pt-6 border-t"
                  style={{ borderColor: "#e2e8f0" }}
                >
                  <h3
                    className="text-lg font-semibold mb-4"
                    style={{ color: "#007f8c" }}
                  >
                    Social Media
                  </h3>
                  <div className="flex gap-4">
                    {profile.linkedin && (
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded font-medium text-white"
                        style={{ backgroundColor: "#006747" }}
                      >
                        LinkedIn
                      </a>
                    )}
                    {profile.facebook && (
                      <a
                        href={profile.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded font-medium text-white"
                        style={{ backgroundColor: "#007f8c" }}
                      >
                        Facebook
                      </a>
                    )}
                    {profile.instagram && (
                      <a
                        href={profile.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded font-medium text-white"
                        style={{ backgroundColor: "#a3e635", color: "#1e293b" }}
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* View Public Profile Button */}
        <div className="mt-8 text-center">
          <Link
            href={`/profile/${profile.uni_id}`}
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: "#006747" }}
          >
            View Public Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
