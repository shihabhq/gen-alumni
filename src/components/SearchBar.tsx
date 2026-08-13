"use client";

import { Filters } from "@/app/page";
import { useEffect, useState } from "react";
import { Building2, Globe2, Search, SlidersHorizontal, X } from "lucide-react";
import { useDebounce } from "@/hooks/debounce";
import BatchFilter from "@/components/BatchFilter";

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
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({ batch: "", company: "", country: "" });

  const debouncedQuery = useDebounce(query, 400);
  const debouncedCompany = useDebounce(filters.company, 400);

  const hasActiveFilters = filters.batch || filters.country || filters.company;

  // Search-as-you-type: fires automatically whenever the debounced query or
  // any filter changes, so results stay live without needing the button.
  useEffect(() => {
    onSearch(debouncedQuery, { ...filters, company: debouncedCompany });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, debouncedCompany, filters.batch, filters.country]);

  const clearFilters = () => {
    setFilters({ batch: "", company: "", country: "" });
    setQuery("");
  };

  return (
    <div className="w-full rounded-2xl bg-surface/95 p-4 shadow-pop backdrop-blur-sm sm:p-5">
      {/* Main Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-faint"
          />
          <input
            type="text"
            placeholder="Search by name, university ID, or company..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-offwhite py-3 pr-4 pl-11 text-ink transition-colors outline-none focus:border-emerald focus:bg-surface focus:ring-2 focus:ring-emerald/15"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-colors ${
            hasActiveFilters
              ? "border-emerald bg-emerald-50 text-emerald"
              : "border-border text-body hover:border-emerald/40 hover:text-emerald"
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald text-[10px] font-bold text-white">
              {[filters.batch, filters.country, filters.company].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {isLoading && (
        <p className="mt-2 text-xs font-medium text-faint">Searching…</p>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="mt-5 space-y-5 border-t border-border pt-5">
          <BatchFilter value={filters.batch} onChange={(batch) => setFilters({ ...filters, batch })} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-ink">Company</label>
              <div className="relative">
                <Building2 size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint" />
                <input
                  type="text"
                  placeholder="Search company..."
                  value={filters.company}
                  onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                  className="w-full rounded-xl border border-border bg-offwhite py-2.5 pr-3 pl-10 text-sm outline-none focus:border-emerald focus:bg-surface focus:ring-2 focus:ring-emerald/15"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-ink">Country</label>
              <div className="relative">
                <Globe2 size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint" />
                <select
                  value={filters.country}
                  onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                  className="w-full appearance-none rounded-xl border border-border bg-offwhite py-2.5 pr-3 pl-10 text-sm outline-none focus:border-emerald focus:bg-surface focus:ring-2 focus:ring-emerald/15"
                >
                  <option value="">All Countries</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
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
      )}
    </div>
  );
}
