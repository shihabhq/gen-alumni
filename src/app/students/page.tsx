"use client";

import { useState, useEffect } from "react";
import StudentCard from "@/components/StudentCard";
import Pagination from "@/components/pagination";
import Link from "next/link";
import { getStudentProfiles } from "@/lib/api";

// Dummy data for demonstration
const dummyStudents = [
  {
    id: 1,
    first_name: "Wasee",
    last_name: "Ahmed",
    uni_id: "2025-1-60-001",
    batch: "BBA 13",
    program: "bba",
    current_job_position: "CA",
    current_company: "MARICO",
    profile_pic:
      "https://media.licdn.com/dms/image/v2/D5603AQG-Mn_Df_lXIw/profile-displayphoto-shrink_200_200/B56ZYUJgWzH0Ag-/0/1744094758819?e=1764201600&v=beta&t=xDLlB70_1kqFDnFCZ5idYQF0Xllsu9XTVMmqaKSK6zc",
    email: "john@bup.edu.bd",
  },
  {
    id: 2,
    first_name: "Shabab",
    last_name: "Hassan",
    uni_id: "2024-1-60-002",
    batch: "BBA 15",
    program: "bba",
    current_job_position: "Student",
    current_company: "BUP",
    profile_pic:
      "https://media.licdn.com/dms/image/v2/D5603AQEDftRlbqMqYQ/profile-displayphoto-scale_200_200/B56ZoSXwKTJkAc-/0/1761244808614?e=1764201600&v=beta&t=AIhpxuH-aKJ1ZFWkYTn0Nh3pnkP91Xoww6ClVvXpP24",
    email: "sarah@bup.edu.bd",
  },
  {
    id: 3,
    first_name: "Nowshad Kamal",
    last_name: "Tasin",
    uni_id: "2023-1-60-003",
    batch: "BBA 12",
    program: "bba",
    current_job_position: "Junior Product Manager",
    current_company: "Shomvob Jobs",
    profile_pic:
      "https://media.licdn.com/dms/image/v2/D5603AQH0KXnrMzNhPg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692110912813?e=1764201600&v=beta&t=0YHLB5e_M2Z42xVcezCsNuKLg-TyYYvnim6SbPcWeGo",
    email: "ahmed@bup.edu.bd",
  },
  {
    id: 4,
    first_name: "Farzana",
    last_name: "Ahmed",
    uni_id: "2023-1-60-004",
    batch: "BBA 3",
    program: "bba",
    current_job_position: "Marketing Executive",
    current_company: "Digital Agency",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farzana",
    email: "farzana@bup.edu.bd",
  },
  {
    id: 5,
    first_name: "Karim",
    last_name: "Ali",
    uni_id: "2020-1-60-005",
    batch: "BBA 6",
    program: "bba",
    current_job_position: "Software Engineer",
    current_company: "Tech Solutions",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
    email: "karim@bup.edu.bd",
  },
  {
    id: 6,
    first_name: "Nasrin",
    last_name: "Akter",
    uni_id: "2016-1-60-006",
    batch: "BBA 10",
    program: "bba",
    current_job_position: "Business Manager",
    current_company: "Corporate Ventures",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nasrin",
    email: "nasrin@bup.edu.bd",
  },
  {
    id: 7,
    first_name: "John",
    last_name: "Doe",
    uni_id: "2025-1-60-001",
    batch: "BBA 1",
    program: "bba",
    current_job_position: "Student",
    current_company: "BUP",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=John1",
    email: "john@bup.edu.bd",
  },
  {
    id: 8,
    first_name: "Sarah",
    last_name: "Khan",
    uni_id: "2024-1-60-002",
    batch: "BBA 2",
    program: "bba",
    current_job_position: "Student",
    current_company: "BUP",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    email: "sarah@bup.edu.bd",
  },
  {
    id: 9,
    first_name: "Ahmed",
    last_name: "Hassan",
    uni_id: "2023-1-60-003",
    batch: "BBA 3",
    program: "bba",
    current_job_position: "Junior Analyst",
    current_company: "Finance Hub",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    email: "ahmed@bup.edu.bd",
  },
  {
    id: 110,
    first_name: "Farzana",
    last_name: "Ahmed",
    uni_id: "2023-1-60-004",
    batch: "BBA 3",
    program: "bba",
    current_job_position: "Marketing Executive",
    current_company: "Digital Agency",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farzana",
    email: "farzana@bup.edu.bd",
  },
  {
    id: 11,
    first_name: "Karim",
    last_name: "Ali",
    uni_id: "2020-1-60-005",
    batch: "BBA 6",
    program: "bba",
    current_job_position: "Software Engineer",
    current_company: "Tech Solutions",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
    email: "karim@bup.edu.bd",
  },
  {
    id: 12,
    first_name: "Nasrin",
    last_name: "Akter",
    uni_id: "2016-1-60-006",
    batch: "BBA 10",
    program: "bba",
    current_job_position: "Business Manager",
    current_company: "Corporate Ventures",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nasrin",
    email: "nasrin@bup.edu.bd",
  },
  {
    id: 13,
    first_name: "John",
    last_name: "Doe",
    uni_id: "2025-1-60-001",
    batch: "BBA 1",
    program: "bba",
    current_job_position: "Student",
    current_company: "BUP",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=John1",
    email: "john@bup.edu.bd",
  },
  {
    id: 26,
    first_name: "Sarah",
    last_name: "Khan",
    uni_id: "2024-1-60-002",
    batch: "BBA 2",
    program: "bba",
    current_job_position: "Student",
    current_company: "BUP",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    email: "sarah@bup.edu.bd",
  },
  {
    id: 83,
    first_name: "Ahmed",
    last_name: "Hassan",
    uni_id: "2023-1-60-003",
    batch: "BBA 3",
    program: "bba",
    current_job_position: "Junior Analyst",
    current_company: "Finance Hub",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    email: "ahmed@bup.edu.bd",
  },
  {
    id: 34,
    first_name: "Farzana",
    last_name: "Ahmed",
    uni_id: "2023-1-60-004",
    batch: "BBA 3",
    program: "bba",
    current_job_position: "Marketing Executive",
    current_company: "Digital Agency",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farzana",
    email: "farzana@bup.edu.bd",
  },
  {
    id: 51,
    first_name: "Karim",
    last_name: "Ali",
    uni_id: "2020-1-60-005",
    batch: "BBA 6",
    program: "bba",
    current_job_position: "Software Engineer",
    current_company: "Tech Solutions",
    profile_pic: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim",
    email: "karim@bup.edu.bd",
  },
];

const ITEMS_PER_PAGE = 9;

export default function Students() {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(dummyStudents);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      setCurrentPage(1);
      try {
        const result = await getStudentProfiles({
          batch: selectedBatch,
          company: searchCompany,
          position: searchPosition,
        });
        setFilteredStudents(result.results || dummyStudents);
      } catch (error) {
        console.error("[v0] Failed to fetch students:", error);
        setFilteredStudents(dummyStudents);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [selectedBatch, searchCompany, searchPosition]);

  const batches = Array.from(new Set(dummyStudents.map((s) => s.batch))).sort(
    (a, b) => {
      const numA = Number.parseInt(a.split(" ")[1]);
      const numB = Number.parseInt(b.split(" ")[1]);
      return numA - numB;
    }
  );

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
      <div className="bg-white shadow-md sticky top-20 z-40">
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
                <Link key={student.id} href={`/profile/${student.uni_id}`}>
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
