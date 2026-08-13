"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getStudentProfile } from "@/lib/api";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Crown,
  Facebook,
  Globe2,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";

interface StudentProfile {
  id: number;
  first_name: string;
  country: string;
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

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald">
        {icon}
      </span>
      <div>
        <h3 className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</h3>
        <p className="mt-0.5 font-medium text-ink">{value}</p>
      </div>
    </div>
  );
}

export default function PublicProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (user && accessToken && refreshToken) {
      setIsLoggedIn(true);
    }

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
      <div className="flex min-h-screen items-center justify-center bg-offwhite pt-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-50 border-t-emerald" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 pt-20 text-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">Profile Not Found</h1>
          <p className="mt-2 text-muted">
            The profile you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-emerald px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-dark"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const initials = `${profile.first_name[0] ?? ""}${profile.last_name[0] ?? ""}`;
  const socials = [
    { key: "linkedin", href: profile.linkedin, icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
    { key: "facebook", href: profile.facebook, icon: Facebook, label: "Facebook", color: "#1877F2" },
    { key: "instagram", href: profile.instagram, icon: Instagram, label: "Instagram", color: "#E1306C" },
  ].filter((s) => s.href);

  return (
    <div className="min-h-screen bg-offwhite pt-20">
      {/* Header */}
      <div className="relative overflow-hidden bg-linear-to-br from-emerald via-emerald-dark to-teal px-4 pt-16 pb-24 text-center">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white/90 shadow-pop">
                {profile.profile_pic ? (
                  <img
                    src={profile.profile_pic}
                    alt={`${profile.first_name} ${profile.last_name}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-emerald to-teal text-4xl font-bold text-white">
                    {initials}
                  </div>
                )}
              </div>
              {profile.is_cr && (
                <span
                  className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-lime text-emerald-dark shadow-sm"
                  title="Class Representative"
                >
                  <Crown size={15} strokeWidth={2.5} />
                </span>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-1.5">
            <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
              {profile.first_name} {profile.last_name}
            </h1>
            {profile.is_verified && (
              <BadgeCheck size={22} className="shrink-0 fill-white text-emerald" aria-label="Verified" />
            )}
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white">
              {profile.batch}
            </span>
            {profile.program && (
              <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-medium text-white">
                {profile.program}
              </span>
            )}
          </div>

          {profile.current_company && (
            <div className="mt-4 text-white/90">
              <p className="text-lg font-semibold">{profile.current_job_position}</p>
              <p>at {profile.current_company}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto -mt-12 max-w-4xl px-4 pb-16">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-pop sm:p-8">
          {/* About Section */}
          {profile.bio && (
            <div className="mb-8">
              <h2 className="font-display mb-3 text-xl font-bold text-ink">About</h2>
              <p className="leading-relaxed text-body">{profile.bio}</p>
            </div>
          )}

          {/* Details */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 border-y border-border py-8 sm:grid-cols-2">
            <InfoItem icon={<GraduationCap size={17} />} label="University ID" value={profile?.uni_id} />
            <InfoItem icon={<Globe2 size={17} />} label="Residing Country" value={profile?.country} />
            <InfoItem icon={<Building2 size={17} />} label="Current Company" value={profile.current_company} />
            <InfoItem icon={<Building2 size={17} />} label="Job Position" value={profile?.current_job_position} />
            {isLoggedIn && <InfoItem icon={<Mail size={17} />} label="Email" value={profile?.email} />}
            {isLoggedIn && <InfoItem icon={<Phone size={17} />} label="Phone" value={profile?.phone} />}
          </div>

          {!isLoggedIn && (profile.email || profile.phone) && (
            <p className="mt-4 text-xs text-faint">
              Contact details are visible to logged-in members only.
            </p>
          )}

          {/* Social Media Links */}
          {socials.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display mb-4 text-xl font-bold text-ink">Connect</h2>
              <div className="flex flex-wrap gap-3">
                {socials.map(({ key, href, icon: Icon, label, color }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
                    style={{ backgroundColor: color }}
                  >
                    <Icon size={18} /> {label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 font-semibold text-emerald transition-colors hover:bg-emerald-50"
          >
            <ArrowLeft size={16} />
            Back to Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
