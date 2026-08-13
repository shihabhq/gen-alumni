"use client";

const BATCHES = Array.from({ length: 16 }, (_, i) => `BBA ${i + 1}`);

interface BatchFilterProps {
  value: string;
  onChange: (batch: string) => void;
  label?: string;
}

// Replaces a plain <select> with a scrollable row of chips: every batch is
// visible at a glance and switching batches is a single tap instead of
// opening/closing a dropdown.
export default function BatchFilter({ value, onChange, label = "Batch" }: BatchFilterProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink">{label}</label>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        <Chip label="All Batches" active={value === ""} onClick={() => onChange("")} />
        {BATCHES.map((batch) => (
          <Chip
            key={batch}
            label={batch.replace("BBA ", "")}
            active={value === batch}
            onClick={() => onChange(batch)}
          />
        ))}
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-all ${
        active
          ? "border-emerald bg-emerald text-white shadow-sm"
          : "border-border bg-surface text-body hover:border-emerald/40 hover:text-emerald"
      }`}
    >
      {label}
    </button>
  );
}
