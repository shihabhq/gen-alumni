"use client";

import { useState, useEffect } from "react";
import StudentCard from "@/components/StudentCard";
import Pagination from "@/components/pagination";
import Link from "next/link";
import { getStudentProfiles } from "@/lib/api";
import { useDebounce } from "@/hooks/debounce";

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  uni_id: string;
  batch: string;
  program: string;
  profile_pic?: string;
  company?: string;
  position?: string;
}

// Dummy data for demonstration

const ITEMS_PER_PAGE = 9;

export default function Students() {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedCompany = useDebounce(searchCompany, 500);
  const debouncedPosition = useDebounce(searchPosition, 500);

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
  const batches = Array.from({ length: 16 }, (_, i) => `BBA ${i + 1}`);

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div
        className="py-16 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #006747 0%, #007f8c 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Students & Alumni
          </h1>
          <p className="text-lg text-white/90">
            Browse by batch, company, and position
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-md md:sticky top-20 z-40">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Batch Filter */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1e293b" }}
              >
                Batch
              </label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full px-3 py-2 rounded border-2 focus:outline-none"
                style={{ borderColor: "#007f8c" }}
              >
                <option value="">All Batches</option>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Search */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1e293b" }}
              >
                Company
              </label>
              <input
                type="text"
                placeholder="Search company..."
                value={searchCompany}
                onChange={(e) => setSearchCompany(e.target.value)}
                className="w-full px-3 py-2 rounded border-2 focus:outline-none"
                style={{ borderColor: "#007f8c" }}
              />
            </div>

            {/* Position Search */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#1e293b" }}
              >
                Position
              </label>
              <input
                type="text"
                placeholder="Search position..."
                value={searchPosition}
                onChange={(e) => setSearchPosition(e.target.value)}
                className="w-full px-3 py-2 rounded border-2 focus:outline-none"
                style={{ borderColor: "#007f8c" }}
              />
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedBatch("");
              setSelectedProgram("");
              setSearchCompany("");
              setSearchPosition("");
            }}
            className="mt-4 px-4 py-2 rounded font-medium transition-colors"
            style={{ backgroundColor: "#f8fafc", color: "#006747" }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-lg text-charcoal/60">Loading students...</p>
          </div>
        ) : filteredStudents.length > 0 ? (
          <>
            <h2
              className="text-2xl font-bold mb-8"
              style={{ color: "#006747" }}
            >
              {filteredStudents.length} Result
              {filteredStudents.length !== 1 ? "s" : ""}
            </h2>
            <p className="text-sm text-charcoal/60 mb-6">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredStudents.length)} of{" "}
              {filteredStudents.length} students
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-12">
            <p className="text-lg text-charcoal/60">
              No students found with the selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
