"use client";

import { Filters } from "@/app/page";
import { useState } from "react";

const BATCHES = Array.from({ length: 16 }, (_, i) => `BBA ${i + 1}`);
// const PROGRAMS = ["BBA", "MBA"];
const COUNTRIES = [
  "Bangladesh",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "India",
  "UAE",
  "Singapore",
  "Pakistan",
  "Malaysia",
  "Other",
];

interface SearchBarProps {
  onSearch: (query: string, filters: Filters) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    batch: "",
    program: "",
    company: "",
    country: "",
  });

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({ batch: "", program: "", company: "", country: "" });
    setQuery("");
    onSearch("", { batch: "", company: "", country: "" });
  };

  return (
    <div className="w-full">
      {/* Main Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, batch or company..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors"
          style={{
            borderColor: "#a3e635",
            backgroundColor: "#f8fafc",
          }}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-8 py-3 rounded-lg font-medium text-white transition-all"
          style={{ backgroundColor: "#a3e635", color: "#1e293b" }}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="text-white mb-4 font-medium flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1H3zm0 3a1 1 0 011-1h6a1 1 0 011 1H3zm0 3a1 1 0 011-1h4a1 1 0 011 1H3zm12-1a1 1 0 100 2h.01a1 1 0 100-2H15z"
            clipRule="evenodd"
          />
        </svg>
        {showFilters ? "Hide" : "Show"} Filters
      </button>

      {/* Filters */}
      {showFilters && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 rounded-lg"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        >
          {/* Batch Filter */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#1e293b" }}
            >
              Batch
            </label>
            <select
              value={filters.batch}
              onChange={(e) => {
                setFilters({ ...filters, batch: e.target.value });
                onSearch(query, { ...filters, batch: e.target.value });
              }}
              className="w-full px-3 py-2 rounded border-2 focus:outline-none"
              style={{ borderColor: "#007f8c" }}
            >
              <option value="">All Batches</option>
              {BATCHES.map((batch) => (
                <option key={batch} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>

          {/* Company Filter */}
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
              value={filters.company}
              onChange={(e) =>
                setFilters({ ...filters, company: e.target.value })
              }
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 rounded border-2 focus:outline-none"
              style={{ borderColor: "#007f8c" }}
            />
          </div>

          {/* Country Filter */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#1e293b" }}
            >
              Country
            </label>
            <select
              value={filters.country}
              onChange={(e) => {
                setFilters({ ...filters, country: e.target.value });
                onSearch(query, { ...filters, country: e.target.value });
              }}
              className="w-full px-3 py-2 rounded border-2 focus:outline-none"
              style={{ borderColor: "#007f8c" }}
            >
              <option value="">All Countries</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="col-span-1 md:col-span-2 lg:col-span-4 px-4 py-2 rounded font-medium transition-colors"
            style={{ backgroundColor: "#f8fafc", color: "#006747" }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
