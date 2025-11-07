"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import StudentCard from "@/components/StudentCard";
import Link from "next/link";
import { searchStudents, getStudentProfiles } from "@/lib/api";

interface Student {
  id: number;
  uni_id: string;
  first_name: string;
  last_name: string;
  profile_pic?: string;
  current_company?: string;
  current_job_position?: string;
  batch: string;
}

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
          position: filters.country,
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
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div
        className="py-20 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #006747 0%, #007f8c 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            BBA General Students and Alumni Network
          </h1>
          <p className="text-lg text-white/90 mb-8">
            Connect, share, and grow with fellow alumni and current students
          </p>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2"
              style={{ borderColor: "#006747" }}
            ></div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <Link key={student.id} href={`/profile/${student.id}`}>
                  <StudentCard student={student as Student} />
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-charcoal/60">
              Adjust your Search filters to get students
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
