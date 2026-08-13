"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import StudentCard, { Student, StudentCardSkeleton } from "@/components/StudentCard";
import Link from "next/link";
import { Users } from "lucide-react";
import { searchStudents, getStudentProfiles } from "@/lib/api";

export interface Filters {
  batch: string;
  company: string;
  country: string;
}

export default function Home() {
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string, filters: Filters) => {
    setIsLoading(true);
    try {
      let results: Student[] = [];

      if (query) {
        const searchResults = await searchStudents(query);
        results = searchResults.results || [];
      } else {
        const profileResults = await getStudentProfiles({
          batch: filters.batch,
          company: filters.company,
          country: filters.country,
        });
        results = profileResults.results || [];
      }

      setFilteredStudents(results);
    } catch (error) {
      console.error("[v0] Search error:", error);
      setFilteredStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-offwhite pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-br from-emerald via-emerald-dark to-teal px-4 py-20 text-center sm:py-24">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90 uppercase">
            <Users size={13} />
            BUP · Department of BBA General
          </span>
          <h1 className="font-display text-3xl font-bold text-white sm:text-5xl">
            BBA General Students &amp; Alumni Network
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85 sm:text-lg">
            Connect, share, and grow with fellow alumni and current students
            across every batch.
          </p>
        </div>
      </div>

      {/* Search — overlaps the hero for a tighter, more app-like feel */}
      <div className="relative mx-auto -mt-8 max-w-3xl px-4">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {/* Results Section */}
      <div className="mx-auto max-w-7xl px-4 py-14">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <StudentCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredStudents.length > 0 ? (
          <>
            <h2 className="mb-8 font-display text-2xl font-bold text-ink">
              {filteredStudents.length} Result
              {filteredStudents.length !== 1 ? "s" : ""}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.map((student) => (
                <Link key={student.id} href={`/profile/${student.id}`}>
                  <StudentCard student={student} />
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald">
              <Users size={24} />
            </div>
            <p className="text-lg font-medium text-body">No students found</p>
            <p className="mt-1 text-sm text-muted">
              Try a different name, batch, or company.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
