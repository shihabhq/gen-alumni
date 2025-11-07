"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout, updateProfile, getStudentProfile } from "@/lib/api";

interface User {
  id?: number;
  username?: string;
  email?: string;
  role?: string | null;
  student_profile?: {
    id: number;
    uni_id: string;
    batch: string;
    program: string;
    is_cr?: boolean;
  } | null;
}

interface UserProfile {
  id: number;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [originalProfile, setOriginalProfile] = useState<UserProfile | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("access_token");
      const userData = localStorage.getItem("user");

      if (!token) {
        router.push("/member/login");
        return;
      }

      if (!userData) {
        setError("User data not found");
        setIsLoading(false);
        return;
      }

      try {
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);

        // Get user id from user data
        const userId = parsedUser.id;

        if (!userId) {
          setError("User ID not found. Please contact support.");
          setIsLoading(false);
          return;
        }

        console.log("Fetching profile for user id:", userId);

        // Fetch complete profile data from API using user id (not uni_id)
        const profileData = await getStudentProfile(String(userId));
        console.log("Profile data fetched:", profileData);
        setProfile(profileData);
        setOriginalProfile(profileData); // Store original for comparison
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(
          `Failed to load profile data: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // preview before upload
    }
  };

  const handleSave = async () => {
    if (!profile || !originalProfile) return;

    setIsSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No authentication token");

      let imageUrl = profile.profile_pic;

      // Upload the image first if user selected one
      if (selectedFile) {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("fileName", selectedFile.name);

        const res = await fetch("/api/imagekit-upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Image upload failed");
        const data = await res.json();
        imageUrl = data.url;
        setUploadingImage(false);
      }

      // Build object with only changed fields
      const changedFields: Partial<{
        first_name: string;
        last_name: string;
        bio: string;
        profile_pic: string;
        current_job_position: string;
        current_company: string;
        phone: string;
        linkedin: string;
        facebook: string;
        instagram: string;
      }> = {};

      // Compare each editable field and only include if changed
      if (profile.first_name !== originalProfile.first_name) {
        changedFields.first_name = profile.first_name;
      }
      if (profile.last_name !== originalProfile.last_name) {
        changedFields.last_name = profile.last_name;
      }
      if (profile.bio !== originalProfile.bio) {
        changedFields.bio = profile.bio;
      }
      if (imageUrl !== originalProfile.profile_pic) {
        changedFields.profile_pic = imageUrl;
      }
      if (
        profile.current_job_position !== originalProfile.current_job_position
      ) {
        changedFields.current_job_position = profile.current_job_position;
      }
      if (profile.current_company !== originalProfile.current_company) {
        changedFields.current_company = profile.current_company;
      }
      if (profile.phone !== originalProfile.phone) {
        changedFields.phone = profile.phone;
      }
      if (profile.linkedin !== originalProfile.linkedin) {
        changedFields.linkedin = profile.linkedin;
      }
      if (profile.facebook !== originalProfile.facebook) {
        changedFields.facebook = profile.facebook;
      }
      if (profile.instagram !== originalProfile.instagram) {
        changedFields.instagram = profile.instagram;
      }

      // Only send request if there are changes
      if (Object.keys(changedFields).length === 0) {
        setError("No changes detected");
        setIsSaving(false);
        return;
      }

      console.log("Sending only changed fields:", changedFields);

      // Update profile with only changed fields
      await updateProfile(profile.id, changedFields);

      // Refresh profile data
      const updatedProfile = await getStudentProfile(String(profile.id));
      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile); // Update original to new values
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
      setUploadingImage(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/member/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "#006747" }}
        ></div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-lg font-semibold text-white"
            style={{ backgroundColor: "#006747" }}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
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
            {profile.profile_pic ? (
              <img
                src={profile.profile_pic}
                alt={`${profile.first_name} ${profile.last_name}`}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white"
                style={{ backgroundColor: "#006747" }}
              >
                {profile.first_name?.[0] || "?"}
                {profile.last_name?.[0] || "?"}
              </div>
            )}
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
        {/* Error Message */}
        {error && (
          <div
            className="mb-6 p-4 rounded-lg text-sm"
            style={{ backgroundColor: "#ef4444", color: "white" }}
          >
            {error}
          </div>
        )}

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
                onClick={() => {
                  setIsEditing(false);
                  setSelectedFile(null);
                  setPreviewUrl(null);
                  setError("");
                  // Reset to original values
                  if (originalProfile) {
                    setProfile(originalProfile);
                  }
                }}
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
                    value={profile.phone || ""}
                    onChange={handleChange}
                    placeholder="e.g., 01712345678"
                    className="w-full px-4 py-2 rounded border-2 focus:outline-none"
                    style={{ borderColor: "#007f8c" }}
                  />
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <label
                    htmlFor="profile-pic"
                    className="text-sm font-semibold text-slate-700 tracking-wide"
                  >
                    Profile Picture
                  </label>

                  <div className="flex flex-col items-center gap-3">
                    {/* Profile Picture Preview */}
                    <div className="relative group">
                      <div
                        onClick={() =>
                          document.getElementById("profile-pic")?.click()
                        }
                        className="w-28 h-28 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-slate-500 transition-all duration-200"
                      >
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : profile.profile_pic ? (
                          <img
                            src={profile.profile_pic}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="text-center text-slate-400 text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="mx-auto mb-1 h-6 w-6 opacity-60"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                            Upload
                          </div>
                        )}
                      </div>
                      <input
                        id="profile-pic"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>

                    {/* Upload Button */}
                    <button
                      onClick={() =>
                        document.getElementById("profile-pic")?.click()
                      }
                      className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald text-white hover:bg-emerald-800 transition-all duration-200 shadow-sm"
                    >
                      Choose Image
                    </button>
                  </div>

                  <p className="text-xs text-slate-500">
                    PNG, JPG, JPEG (max 5MB)
                  </p>
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
                      value={profile.current_company || ""}
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
                      value={profile.current_job_position || ""}
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
                    value={profile.bio || ""}
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
                    value={profile.linkedin || ""}
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
                    value={profile.facebook || ""}
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
                    value={profile.instagram || ""}
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
                    <p className="text-sm text-charcoal/60 mb-1">
                      University ID
                    </p>
                    <p className="font-medium">{profile?.uni_id || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Professional Info Display */}
              {(profile.current_company ||
                profile.current_job_position ||
                profile.bio) && (
                <div
                  className="pt-6 border-t"
                  style={{ borderColor: "#e2e8f0" }}
                >
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
              )}

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
                  <div className="flex gap-4 flex-wrap">
                    {profile.linkedin && (
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded font-medium text-white"
                        style={{ backgroundColor: "#0A66C2" }}
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
                        style={{ backgroundColor: "#1877F2" }}
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
                        style={{ backgroundColor: "#E1306C" }}
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          {isEditing && (
            <div className="mt-8 flex gap-3 text-center">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-block cursor-pointer px-6 py-3 rounded-lg font-semibold text-white transition-all"
                style={{ backgroundColor: "#006747" }}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedFile(null);
                  setPreviewUrl(null);
                  setError("");
                  // Reset to original values
                  if (originalProfile) {
                    setProfile(originalProfile);
                  }
                }}
                className="px-6 py-3 cursor-pointer rounded-lg font-semibold transition-all"
                style={{ backgroundColor: "#f8fafc", color: "#006747" }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* View Public Profile Button */}
      </div>
    </div>
  );
}
