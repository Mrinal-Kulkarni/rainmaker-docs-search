'use client';

import { type ReactNode, useState } from 'react';
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

function buildOptionsWithCounts(values: string[], allLabel: string): Option[] {
  const counts = new Map<string, number>();
  for (const v of values) {
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  const total = values.length;
  return [
    { value: ALL_OPTION, label: `${allLabel} (${total})` },
    ...[...counts.entries()]
      .sort((a, b) => sortText(a[0], b[0]))
      .map(([value, count]) => ({ value, label: `${value} (${count})` })),
  ];
}

const STATE_OPTIONS = buildOptionsWithCounts(REPORTS.map((r) => r.state), 'All states');
const SOURCE_OPTIONS = buildOptionsWithCounts(REPORTS.map((r) => r.sourceType), 'All types');
const ACTIVITY_OPTIONS = buildOptionsWithCounts(REPORTS.map((r) => r.activity), 'All activities');
const YEAR_OPTIONS = Array.from(new Set(REPORTS.map((r) => r.startYear))).sort((a, b) => b - a);
const DEFAULT_FILTERS: Filters = {
  state: ALL_OPTION,
  sourceType: ALL_OPTION,
  activity: ALL_OPTION,
  year: YEAR_OPTIONS[0] ?? new Date().getFullYear(),
};
const SORTED_REPORTS = [...REPORTS].sort((left, right) => {
  if (right.startYear !== left.startYear) {
    return right.startYear - left.startYear;
  }
  return left.designation.localeCompare(right.designation);
});
const SELECT_FILTERS: ReadonlyArray<{ key: SelectFilterKey; label: string; options: Option[] }> = [
  { key: 'state', label: 'State', options: STATE_OPTIONS },
  { key: 'sourceType', label: 'Source', options: SOURCE_OPTIONS },
  { key: 'activity', label: 'Activity', options: ACTIVITY_OPTIONS },
];

function formatRecordCount(count: number) {
  return `${count} record${count === 1 ? '' : 's'}`;
}

function isPdfUrl(url: string) {
  return /\.pdf(?:$|[?#])/i.test(url);
}

function matchesFilters(report: Report, filters: Filters) {
  return (
    (filters.state === ALL_OPTION || report.state === filters.state) &&
    (filters.sourceType === ALL_OPTION || report.sourceType === filters.sourceType) &&
    (filters.activity === ALL_OPTION || report.activity === filters.activity) &&
    report.startYear <= filters.year
  );
}

function getActiveFilterCount(filters: Filters) {
  return Number(filters.state !== DEFAULT_FILTERS.state) +
    Number(filters.sourceType !== DEFAULT_FILTERS.sourceType) +
    Number(filters.activity !== DEFAULT_FILTERS.activity) +
    Number(filters.year !== DEFAULT_FILTERS.year);
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

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.5l1.26 2.67 2.94.43-2.14 2.08.5 2.93L12 10.8l-2.56 1.81.5-2.93L7.8 6.6l2.94-.43L12 3.5Zm0 7.4a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2ZM6.3 13.05l1.38 1.09-.2 1.75-1.66.59 1.01 1.76 1.63-.69 1.38 1.1-.1 1.8h2.04l-.1-1.8 1.38-1.1 1.63.69 1.01-1.76-1.66-.59-.2-1.75 1.38-1.09-1.04-1.75-1.58.73-1.44-.99.16-1.8h-2.04l.16 1.8-1.44.99-1.58-.73-1.04 1.75Z"
        fill="currentColor"
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

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: ReadonlyArray<Option>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="filter-field">
      <span className="filter-label">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function FilterPanel({
  filters,
  activeFilterCount,
  onSelectChange,
  onYearChange,
  onReset,
  onShowAll,
}: {
  filters: Filters;
  activeFilterCount: number;
  onSelectChange: (key: SelectFilterKey, value: string) => void;
  onYearChange: (year: number) => void;
  onReset: () => void;
  onShowAll: () => void;
}) {
  return (
    <div className="filters-panel">
      <div className="filter-stack">
        {SELECT_FILTERS.map((field) => (
          <SelectField
            key={field.key}
            label={field.label}
            value={filters[field.key]}
            options={field.options}
            onChange={(value) => onSelectChange(field.key, value)}
          />
        ))}

        <SelectField
          label="Year to"
          value={String(filters.year)}
          options={YEAR_OPTIONS.map((year) => ({ value: String(year), label: String(year) }))}
          onChange={(value) => onYearChange(Number(value))}
        />
      </div>

      <div className="filters-footer">
        <div className="filters-status">
          <span>
            {activeFilterCount} active filter{activeFilterCount === 1 ? '' : 's'}
          </span>
        </div>

        <div className="filters-actions">
          <button type="button" className="ghost-button" onClick={onReset}>
            Reset
          </button>
          <button type="button" className="solid-button" onClick={onShowAll}>
            Show all {REPORTS.length}
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="empty-state">
      <div className="empty-state-mark">
        <SettingsIcon />
      </div>
      <p className="empty-state-copy">{children}</p>
    </div>
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
          <div className="record-meta">{`${report.state} • ${report.sourceType} • ${report.startYear}`}</div>
          <h3 className="record-name">{report.designation}</h3>
          <p className="record-subtitle">{report.dateRange}</p>
        </div>

        <span className="record-toggle">
          <span>{expanded ? 'Close' : 'Open'}</span>
          <ChevronIcon open={expanded} />
        </span>
      </button>

      {expanded ? (
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
              <dt>Dates</dt>
              <dd>{report.dateRange}</dd>
            </div>
            <div className="detail-row">
              <dt>Notes</dt>
              <dd>{report.notes ?? 'No additional notes.'}</dd>
            </div>
          </dl>

          <a href={report.url} target="_blank" rel="noreferrer" className="record-link">
            {isPdfUrl(report.url) ? '↗ View PDF source document' : '↗ View source document'}
          </a>
        </div>
      ) : null}
    </article>
  );
}

export default function Home() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isArchiveVisible, setIsArchiveVisible] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [useLogoFallback, setUseLogoFallback] = useState(false);

  const activeFilterCount = getActiveFilterCount(filters);
  const shouldShowRecords = isArchiveVisible || activeFilterCount > 0;
  const filteredReports = shouldShowRecords
    ? SORTED_REPORTS.filter((report) => matchesFilters(report, filters))
    : [];
  const recordCountLabel = formatRecordCount(filteredReports.length);

  function updateSelectFilter(key: SelectFilterKey, value: string) {
    setFilters((current) => (current[key] === value ? current : { ...current, [key]: value }));
    setExpandedId(null);
    setIsArchiveVisible(false);
  }

  function updateYear(year: number) {
    setFilters((current) => (current.year === year ? current : { ...current, year }));
    setExpandedId(null);
    setIsArchiveVisible(false);
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
    setExpandedId(null);
    setIsArchiveVisible(false);
  }

  function showAllRecords() {
    setFilters(DEFAULT_FILTERS);
    setExpandedId(null);
    setIsArchiveVisible(true);
    setIsMobileFiltersOpen(false);
  }

  return (
    <div className="ops-app">
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

        <button
          type="button"
          className="drawer-toggle"
          aria-expanded={isMobileFiltersOpen}
          aria-controls="mobile-filters"
          onClick={() => setIsMobileFiltersOpen(true)}
        >
          <MenuIcon />
          <span>Filters</span>
          {activeFilterCount > 0 ? <span className="count-badge">{activeFilterCount}</span> : null}
        </button>
      </header>

      <div className="ops-layout">
        <aside className="filters-rail">
          <FilterPanel
            filters={filters}
            activeFilterCount={activeFilterCount}
            onSelectChange={updateSelectFilter}
            onYearChange={updateYear}
            onReset={resetFilters}
            onShowAll={showAllRecords}
          />
        </aside>

        <section className="records-shell" aria-label="Records">
          <div className="records-header">
            <div>
              <p className="panel-kicker">Records</p>
              <h2 className="records-title">
                {shouldShowRecords
                  ? `${filteredReports.length} matching record${filteredReports.length === 1 ? '' : 's'}`
                  : 'Archive idle'}
              </h2>
            </div>
            <span className="records-tab">{recordCountLabel}</span>
          </div>

          <div className="records-body">
            {!shouldShowRecords ? (
              <EmptyState>
                <>
                  Use the Filters panel to search
                  <br />
                  Rainmaker&apos;s publicly available government records
                </>
              </EmptyState>
            ) : filteredReports.length === 0 ? (
              <EmptyState>
                <>
                  No records match the current filters.
                  <br />
                  Reset the panel or loosen a filter.
                </>
              </EmptyState>
            ) : (
              <div className="records-list">
                {filteredReports.map((report) => (
                  <RecordCard
                    key={report.id}
                    report={report}
                    expanded={expandedId === report.id}
                    onToggle={() => setExpandedId((current) => (current === report.id ? null : report.id))}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

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
          <div>
            <p className="panel-kicker">Filters</p>
            <h2 className="mobile-drawer-title">Refine records</h2>
          </div>
          <div className="mobile-drawer-actions">
            <span className="records-tab">{recordCountLabel}</span>
            <button type="button" className="ghost-button" onClick={() => setIsMobileFiltersOpen(false)}>
              Close
            </button>
          </div>
        </div>

        <div className="mobile-drawer-body">
          <FilterPanel
            filters={filters}
            activeFilterCount={activeFilterCount}
            onSelectChange={updateSelectFilter}
            onYearChange={updateYear}
            onReset={resetFilters}
            onShowAll={showAllRecords}
          />
        </div>
      </aside>
    </div>
  );
}
