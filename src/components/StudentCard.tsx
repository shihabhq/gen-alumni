"use client";

import { BadgeCheck, Briefcase, Crown, MapPin } from "lucide-react";

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  uni_id?: string;
  profile_pic?: string | null;
  current_company?: string | null;
  current_job_position?: string | null;
  country?: string | null;
  batch: string;
  is_cr?: boolean;
  is_verified?: boolean;
}

interface StudentCardProps {
  student: Student;
}

// Deterministic gradient per student, so the initials avatar isn't the same
// flat color for every card in a grid full of people without a photo.
const AVATAR_GRADIENTS = [
  "from-emerald to-teal",
  "from-teal to-emerald-dark",
  "from-emerald-dark to-lime-dark",
  "from-teal to-emerald",
];

function avatarGradient(id: number) {
  return AVATAR_GRADIENTS[id % AVATAR_GRADIENTS.length];
}

export default function StudentCard({ student }: StudentCardProps) {
  const initials = `${student.first_name[0] ?? ""}${student.last_name[0] ?? ""}`;
  const jobTitle = student.current_job_position;
  const company = student.current_company;

  return (
    <div className="group relative flex flex-col items-center rounded-2xl border border-border bg-surface p-6 pt-14 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald/30 hover:shadow-card-hover">
      {/* Batch badge */}
      <span className="absolute left-5 top-5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald">
        {student.batch}
      </span>

      {student.is_cr && (
        <span
          className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-lime/20 px-2.5 py-1 text-xs font-semibold text-emerald-dark"
          title="Class Representative"
        >
          <Crown size={12} strokeWidth={2.5} />
          CR
        </span>
      )}

      {/* Avatar */}
      <div
        className={`absolute -top-10 h-24 w-24 overflow-hidden rounded-full bg-linear-to-br ${avatarGradient(
          student.id
        )} p-[3px] shadow-pop`}
      >
        <div className="h-full w-full overflow-hidden rounded-full bg-surface">
          {student.profile_pic ? (
            <img
              src={student.profile_pic}
              alt={`${student.first_name} ${student.last_name}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-white bg-linear-to-br from-emerald to-teal">
              {initials}
            </div>
          )}
        </div>
      </div>

      {/* Identity */}
      <div className="mt-4 flex items-center gap-1.5">
        <h3 className="font-display text-lg font-semibold text-ink">
          {student.first_name} {student.last_name}
        </h3>
        {student.is_verified && (
          <BadgeCheck
            size={17}
            className="shrink-0 fill-emerald text-white"
            aria-label="Verified"
          />
        )}
      </div>
      {student.uni_id && (
        <p className="mt-0.5 text-xs font-medium tracking-wide text-faint">
          {student.uni_id}
        </p>
      )}

      {/* Role / location */}
      <div className="mt-4 w-full space-y-1.5 border-t border-border pt-4 text-sm">
        {jobTitle || company ? (
          <div className="flex items-center justify-center gap-1.5 text-body">
            <Briefcase size={14} className="shrink-0 text-teal" />
            <span className="truncate">
              {jobTitle}
              {jobTitle && company ? " · " : ""}
              {company}
            </span>
          </div>
        ) : (
          <p className="text-faint italic">No position added yet</p>
        )}
        {student.country && (
          <div className="flex items-center justify-center gap-1.5 text-muted">
            <MapPin size={13} className="shrink-0" />
            <span>{student.country}</span>
          </div>
        )}
      </div>

      {/* Action */}
      <button className="mt-5 inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-emerald px-5 py-2 text-sm font-medium text-white transition-all duration-200 group-hover:bg-emerald-dark group-hover:gap-2.5">
        View Profile
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </button>
    </div>
  );
}

export function StudentCardSkeleton() {
  return (
    <div className="relative flex flex-col items-center rounded-2xl border border-border bg-surface p-6 pt-14">
      <div className="absolute -top-10 h-24 w-24 rounded-full border-4 border-surface bg-border animate-shimmer" />
      <div className="mt-4 h-5 w-32 rounded animate-shimmer" />
      <div className="mt-2 h-3 w-20 rounded animate-shimmer" />
      <div className="mt-6 h-3 w-40 rounded animate-shimmer" />
      <div className="mt-5 h-9 w-28 rounded-full animate-shimmer" />
    </div>
  );
}
