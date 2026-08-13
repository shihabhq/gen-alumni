"use client";

import { useState, useEffect } from "react";
import StudentCard, { Student, StudentCardSkeleton } from "@/components/StudentCard";
import Pagination from "@/components/pagination";
import BatchFilter from "@/components/BatchFilter";
import Link from "next/link";
import { Briefcase, Search, Users, X } from "lucide-react";
import { getStudentProfiles } from "@/lib/api";
import { useDebounce } from "@/hooks/debounce";

const ITEMS_PER_PAGE = 9;

export default function Students() {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedCompany = useDebounce(searchCompany, 500);
  const debouncedPosition = useDebounce(searchPosition, 500);

  const hasActiveFilters = selectedBatch || searchCompany || searchPosition;

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      setCurrentPage(1);
      try {
        const result = await getStudentProfiles({
          batch: selectedBatch,
          company: debouncedCompany,
          position: debouncedPosition,
        });
        setFilteredStudents(result.results || []);
      } catch (error) {
        console.error("[v0] Failed to fetch students:", error);
        setFilteredStudents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [selectedBatch, debouncedCompany, debouncedPosition]);

  const clearFilters = () => {
    setSelectedBatch("");
    setSearchCompany("");
    setSearchPosition("");
  };

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-offwhite pt-20">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-emerald via-emerald-dark to-teal px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-white md:text-5xl">
            All Students &amp; Alumni
          </h1>
          <p className="mt-4 text-lg text-white/85">
            Browse the full BBA General directory by batch, company, or role
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-20 z-40 border-b border-border bg-surface/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-5">
          <BatchFilter value={selectedBatch} onChange={setSelectedBatch} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-ink">Company</label>
              <div className="relative">
                <Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint" />
                <input
                  type="text"
                  placeholder="Search company..."
                  value={searchCompany}
                  onChange={(e) => setSearchCompany(e.target.value)}
                  className="w-full rounded-xl border border-border bg-offwhite py-2.5 pr-3 pl-10 text-sm outline-none transition-colors focus:border-emerald focus:bg-surface focus:ring-2 focus:ring-emerald/15"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">Position</label>
              <div className="relative">
                <Briefcase size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint" />
                <input
                  type="text"
                  placeholder="Search position..."
                  value={searchPosition}
                  onChange={(e) => setSearchPosition(e.target.value)}
                  className="w-full rounded-xl border border-border bg-offwhite py-2.5 pr-3 pl-10 text-sm outline-none transition-colors focus:border-emerald focus:bg-surface focus:ring-2 focus:ring-emerald/15"
                />
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted hover:text-emerald"
            >
              <X size={14} />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <StudentCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredStudents.length > 0 ? (
          <>
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl font-bold text-ink">
                {filteredStudents.length} Result
                {filteredStudents.length !== 1 ? "s" : ""}
              </h2>
              <p className="text-sm text-muted">
                Showing {startIndex + 1}–{Math.min(endIndex, filteredStudents.length)} of{" "}
                {filteredStudents.length}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedStudents.map((student) => (
                <Link key={student.id} href={`/profile/${student.id}`}>
                  <StudentCard student={student} />
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald">
              <Users size={24} />
            </div>
            <p className="text-lg font-medium text-body">No students found</p>
            <p className="mt-1 text-sm text-muted">
              Try clearing a filter or picking a different batch.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
