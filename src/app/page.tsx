'use client';

import { useState } from 'react';
import { REPORTS, Report, SourceType } from '../data/reports';

const ALL_OPTION = 'ALL' as const;

type SourceFilter = typeof ALL_OPTION | SourceType;
type SelectFilterKey = 'state' | 'sourceType' | 'activity';

interface Filters {
  state: string;
  sourceType: SourceFilter;
  activity: string;
  year: number;
}

interface Option {
  value: string;
  label: string;
}

const sortText = (left: string, right: string) => left.localeCompare(right);

function buildOptions(values: string[], allLabel: string): Option[] {
  const unique = [...new Set(values)].sort(sortText);
  return [
    { value: ALL_OPTION, label: allLabel },
    ...unique.map((v) => ({ value: v, label: v })),
  ];
}

const STATE_OPTIONS = buildOptions(REPORTS.map((r) => r.state), 'All states');
const SOURCE_OPTIONS = buildOptions(REPORTS.map((r) => r.sourceType), 'All types');
const ACTIVITY_OPTIONS = buildOptions(REPORTS.map((r) => r.activity), 'All activities');
const YEAR_OPTIONS = Array.from(new Set(REPORTS.map((r) => r.startYear))).sort((a, b) => b - a);

const DEFAULT_FILTERS: Filters = {
  state: ALL_OPTION,
  sourceType: ALL_OPTION,
  activity: ALL_OPTION,
  year: YEAR_OPTIONS[0] ?? new Date().getFullYear(),
};

const SORTED_REPORTS = [...REPORTS].sort((left, right) => {
  if (right.startYear !== left.startYear) return right.startYear - left.startYear;
  return left.designation.localeCompare(right.designation);
});

const SELECT_FILTERS: ReadonlyArray<{ key: SelectFilterKey; label: string; options: Option[] }> = [
  { key: 'state', label: 'State', options: STATE_OPTIONS },
  { key: 'sourceType', label: 'Source', options: SOURCE_OPTIONS },
  { key: 'activity', label: 'Activity', options: ACTIVITY_OPTIONS },
];

function matchesFilters(report: Report, filters: Filters): boolean {
  return (
    (filters.state === ALL_OPTION || report.state === filters.state) &&
    (filters.sourceType === ALL_OPTION || report.sourceType === filters.sourceType) &&
    (filters.activity === ALL_OPTION || report.activity === filters.activity) &&
    report.startYear <= filters.year
  );
}

function hasActiveFilters(filters: Filters): boolean {
  return (
    filters.state !== DEFAULT_FILTERS.state ||
    filters.sourceType !== DEFAULT_FILTERS.sourceType ||
    filters.activity !== DEFAULT_FILTERS.activity ||
    filters.year !== DEFAULT_FILTERS.year
  );
}

function getActiveFilterCount(filters: Filters): number {
  return (
    Number(filters.state !== DEFAULT_FILTERS.state) +
    Number(filters.sourceType !== DEFAULT_FILTERS.sourceType) +
    Number(filters.activity !== DEFAULT_FILTERS.activity) +
    Number(filters.year !== DEFAULT_FILTERS.year)
  );
}

function isPdfUrl(url: string): boolean {
  return /\.pdf(?:$|[?#])/i.test(url);
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M3 5.5h14M3 10h14M3 14.5h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={open ? 'is-open' : ''}>
      <path
        d="m5.75 8 4.25 4.25L14.25 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RecordCard({
  report,
  expanded,
  onToggle,
}: {
  report: Report;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={`record-card${expanded ? ' is-expanded' : ''}`}>
      <button type="button" className="record-trigger" onClick={onToggle} aria-expanded={expanded}>
        <div>
          <div className="record-meta">{`${report.state} / ${report.sourceType} / ${report.startYear}`}</div>
          <h3 className="record-name">{report.designation}</h3>
          <p className="record-subtitle">{report.dateRange}</p>
        </div>

        <span className="record-toggle">
          <ChevronIcon open={expanded} />
        </span>
      </button>

      {expanded && (
        <div className="record-detail">
          <dl className="record-detail-grid">
            <div className="detail-row">
              <dt>Agency</dt>
              <dd>{report.agency}</dd>
            </div>
            <div className="detail-row">
              <dt>Activity</dt>
              <dd>{report.activity}</dd>
            </div>
            <div className="detail-row">
              <dt>Operator</dt>
              <dd>{report.operator}</dd>
            </div>
            <div className="detail-row">
              <dt>Dates</dt>
              <dd>{report.dateRange}</dd>
            </div>
            <div className="detail-row full-width">
              <dt>Notes</dt>
              <dd>{report.notes ?? 'No additional notes.'}</dd>
            </div>
          </dl>

          <a href={report.url} target="_blank" rel="noreferrer" className="record-link">
            {isPdfUrl(report.url) ? '↗ View PDF source' : '↗ View source'}
          </a>
        </div>
      )}
    </article>
  );
}

export default function Home() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [useLogoFallback, setUseLogoFallback] = useState(false);

  const filtersActive = hasActiveFilters(filters);
  const activeFilterCount = getActiveFilterCount(filters);
  const filteredReports = SORTED_REPORTS.filter((report) => matchesFilters(report, filters));
  const count = filteredReports.length;

  function updateSelectFilter(key: SelectFilterKey, value: string) {
    setFilters((current) => (current[key] === value ? current : { ...current, [key]: value }));
    setExpandedId(null);
  }

  function updateYear(year: number) {
    setFilters((current) => (current.year === year ? current : { ...current, year }));
    setExpandedId(null);
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    setExpandedId(null);
  }

  return (
    <div className="ops-app">
      {/* ─── Header ─── */}
      <header className="ops-header">
        <a href="/" className="brand-lockup" aria-label="Rainmaker Operations Search">
          <span className="brand-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={useLogoFallback ? '/r-logo.svg' : 'https://www.rainmaker.com/favicon.ico'}
              alt="Rainmaker R"
              className="brand-mark-image"
              onError={() => setUseLogoFallback(true)}
            />
          </span>
          <span className="brand-copy">
            <span className="brand-word">Rainmaker</span>
            <span className="brand-title">Ops Search</span>
          </span>
        </a>

        {/* Mobile-only filter toggle */}
        <button
          type="button"
          className="drawer-toggle"
          aria-expanded={isMobileFiltersOpen}
          aria-controls="mobile-filters"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <MenuIcon />
          <span>Filters</span>
          {activeFilterCount > 0 && <span className="count-badge">{activeFilterCount}</span>}
        </button>

        {/* Mobile-only result count in header */}
        <span className="mobile-header-count" style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>
          <strong style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{count}</strong> record{count === 1 ? '' : 's'}
        </span>
      </header>

      {/* ─── Desktop Filter Bar ─── */}
      <div className="filter-bar-wrapper filter-bar-desktop">
        <div className="filter-bar">
          {SELECT_FILTERS.map((field) => (
            <div key={field.key} className="filter-field">
              <select
                value={filters[field.key]}
                onChange={(e) => updateSelectFilter(field.key, e.target.value)}
                aria-label={field.label}
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="filter-field">
            <select
              value={String(filters.year)}
              onChange={(e) => updateYear(Number(e.target.value))}
              aria-label="Year"
            >
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={String(year)}>
                  Since {year}
                </option>
              ))}
            </select>
          </div>

          <span className="filter-spacer" />

          <span className="filter-result-count">
            <strong>{count}</strong> record{count === 1 ? '' : 's'}
          </span>

          {filtersActive && (
            <button type="button" className="clear-btn" onClick={resetFilters}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ─── Records ─── */}
      <main className="records-main">
        {count === 0 ? (
          <div className="empty-state">
            <p className="empty-state-copy">
              No records match the current filters.<br />
              Try broadening your search or clearing filters.
            </p>
          </div>
        ) : (
          <div className="records-list">
            {filteredReports.map((report) => (
              <RecordCard
                key={report.id}
                report={report}
                expanded={expandedId === report.id}
                onToggle={() => setExpandedId((cur) => (cur === report.id ? null : report.id))}
              />
            ))}
          </div>
        )}
      </main>

      {/* ─── Mobile Drawer ─── */}
      <div
        className={`drawer-backdrop${isMobileFiltersOpen ? ' is-visible' : ''}`}
        onClick={() => setIsMobileFiltersOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-filters"
        className={`mobile-drawer${isMobileFiltersOpen ? ' is-open' : ''}`}
        aria-hidden={!isMobileFiltersOpen}
      >
        <div className="mobile-drawer-header">
          <h2 className="mobile-drawer-title">Filters</h2>
          <div className="mobile-drawer-actions">
            {filtersActive && (
              <button type="button" className="clear-btn" onClick={resetFilters}>
                Clear
              </button>
            )}
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={() => setIsMobileFiltersOpen(false)}
            >
              Done
            </button>
          </div>
        </div>

        <div className="mobile-drawer-body">
          <div className="mobile-filter-stack">
            {SELECT_FILTERS.map((field) => (
              <label key={field.key}>
                <span className="mobile-filter-label">{field.label}</span>
                <select
                  value={filters[field.key]}
                  onChange={(e) => updateSelectFilter(field.key, e.target.value)}
                >
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}

            <label>
              <span className="mobile-filter-label">Year</span>
              <select
                value={String(filters.year)}
                onChange={(e) => updateYear(Number(e.target.value))}
              >
                {YEAR_OPTIONS.map((year) => (
                  <option key={year} value={String(year)}>
                    Since {year}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mobile-filter-footer">
            <span className="mobile-result-count">
              <strong>{count}</strong> record{count === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}
