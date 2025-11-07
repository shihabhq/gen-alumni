"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getStudentProfile } from "@/lib/api";
import { Facebook, Instagram, Linkedin } from "lucide-react";

interface StudentProfile {
  id: number;
  first_name: string;
  last_name: string;
  uni_id: string;
  bio: string;
  profile_pic?: string;
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
  is_verified: boolean;
}

export default function PublicProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Check localStorage login status
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (user && accessToken && refreshToken) {
      setIsLoggedIn(true);
    }

    // ✅ Fetch profile data
    const fetchProfile = async () => {
      try {
        const profileData = await getStudentProfile(id);
        setProfile(profileData);
      } catch (error) {
        console.error(error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "#006747" }}
        ></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div
        className="min-h-screen pt-20 flex items-center justify-center"
        style={{ backgroundColor: "#f8fafc" }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "#006747" }}>
            Profile Not Found
          </h1>
          <p className="text-charcoal/60 mb-6">
            The profile you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white transition-all"
            style={{ backgroundColor: "#006747" }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: "#f8fafc" }}>
      {/* Header */}
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
              className="w-28 h-28 rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-white overflow-hidden"
              style={{ backgroundColor: "#006747" }}
            >
              {profile.profile_pic ? (
                <img
                  src={profile.profile_pic || "/placeholder.svg"}
                  alt={`${profile.first_name} ${profile.last_name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                `${profile.first_name[0]}${profile.last_name[0]}`
              )}
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">
            {profile.first_name} {profile.last_name}
          </h1>

          <div className="flex justify-center gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-sm text-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              {profile.batch}
            </span>
            {profile.is_cr && (
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "#a3e635", color: "#1e293b" }}
              >
                Class Representative
              </span>
            )}
          </div>

          {profile.current_company && (
            <div className="text-white/90">
              <p className="font-semibold text-lg">
                {profile.current_job_position}
              </p>
              <p>at {profile.current_company}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* About Section */}
          {profile.bio && (
            <div className="mb-8">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#006747" }}
              >
                About
              </h2>
              <p className="text-charcoal leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {/* Professional Details */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y"
            style={{ borderColor: "#e2e8f0" }}
          >
            <div>
              <h3
                className="text-sm font-semibold mb-2"
                style={{ color: "#007f8c" }}
              >
                UNIVERSITY ID
              </h3>
              <p className="font-medium">{profile.uni_id}</p>
            </div>

            {profile.current_company && (
              <div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "#007f8c" }}
                >
                  CURRENT COMPANY
                </h3>
                <p className="font-medium">{profile.current_company}</p>
              </div>
            )}

            {profile?.current_job_position && (
              <div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "#007f8c" }}
                >
                  JOB POSITION
                </h3>
                <p className="font-medium">{profile.current_job_position}</p>
              </div>
            )}

            {/* ✅ Only show if logged in */}
            {isLoggedIn && profile?.email && (
              <div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "#007f8c" }}
                >
                  EMAIL
                </h3>
                <p className="font-medium">{profile.email}</p>
              </div>
            )}

            {isLoggedIn && profile?.phone && (
              <div>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "#007f8c" }}
                >
                  PHONE
                </h3>
                <p className="font-medium">{profile.phone}</p>
              </div>
            )}
          </div>

          {/* Social Media Links */}
          {(profile?.linkedin || profile?.facebook || profile?.instagram) && (
            <div className="mt-8">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: "#006747" }}
              >
                Connect
              </h2>
              <div className="flex gap-4 flex-wrap">
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 flex items-center gap-1 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                    style={{ backgroundColor: "#0A66C2" }}
                  >
                    <Linkedin size={20} /> LinkedIn
                  </a>
                )}
                {profile.facebook && (
                  <a
                    href={profile.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-lg flex items-center gap-1 font-semibold text-white transition-all hover:shadow-lg"
                    style={{ backgroundColor: "#1877F2" }}
                  >
                    <Facebook size={20} /> Facebook
                  </a>
                )}
                {profile.instagram && (
                  <a
                    href={profile.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 flex items-center gap-1 rounded-lg font-semibold transition-all text-white hover:shadow-lg"
                    style={{ backgroundColor: "#E1306C" }}
                  >
                    <Instagram size={20} /> Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg font-semibold transition-all"
            style={{ backgroundColor: "#f8fafc", color: "#006747" }}
          >
            ← Back to Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
