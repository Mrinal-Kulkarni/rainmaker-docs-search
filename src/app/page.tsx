'use client';

import { useState } from 'react';
import { REPORTS, SourceType } from '../data/reports';

const ALL_OPTION = 'ALL';
const YEAR_MIN = 2020;
const YEAR_MAX = 2025;

const STATE_OPTIONS = [ALL_OPTION, ...Array.from(new Set(REPORTS.map((report) => report.state))).sort()];
const SOURCE_OPTIONS: Array<typeof ALL_OPTION | SourceType> = [
  ALL_OPTION,
  'NOAA Report',
  'State Permit',
  'Government Contract',
  'Academic Study',
];
const ACTIVITY_OPTIONS = [ALL_OPTION, ...Array.from(new Set(REPORTS.map((report) => report.activity))).sort()];
const OPERATOR_OPTIONS = [ALL_OPTION, ...Array.from(new Set(REPORTS.map((report) => report.operator))).sort()];
const YEAR_OPTIONS = Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, index) => YEAR_MIN + index);

function isPdfUrl(url: string) {
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

export default function Home() {
  const [logoFailed, setLogoFailed] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [stateFilter, setStateFilter] = useState<string>(ALL_OPTION);
  const [sourceType, setSourceType] = useState<typeof ALL_OPTION | SourceType>(ALL_OPTION);
  const [activity, setActivity] = useState<string>(ALL_OPTION);
  const [operator, setOperator] = useState<string>(ALL_OPTION);
  const [yearFilter, setYearFilter] = useState(YEAR_MAX);
  const [showAllRecords, setShowAllRecords] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const hasActiveFilters =
    stateFilter !== ALL_OPTION ||
    sourceType !== ALL_OPTION ||
    activity !== ALL_OPTION ||
    operator !== ALL_OPTION ||
    yearFilter !== YEAR_MAX;

  const activeFilterCount = [
    stateFilter !== ALL_OPTION,
    sourceType !== ALL_OPTION,
    activity !== ALL_OPTION,
    operator !== ALL_OPTION,
    yearFilter !== YEAR_MAX,
  ].filter(Boolean).length;

  const shouldShowRecords = hasActiveFilters || showAllRecords;

  const filteredReports = REPORTS.filter((report) => {
    if (stateFilter !== ALL_OPTION && report.state !== stateFilter) {
      return false;
    }

    if (sourceType !== ALL_OPTION && report.sourceType !== sourceType) {
      return false;
    }

    if (activity !== ALL_OPTION && report.activity !== activity) {
      return false;
    }

    if (operator !== ALL_OPTION && report.operator !== operator) {
      return false;
    }

    return report.startYear <= yearFilter;
  }).sort((left, right) => {
    if (right.startYear !== left.startYear) {
      return right.startYear - left.startYear;
    }

    return left.designation.localeCompare(right.designation);
  });

  const visibleRecordCount = shouldShowRecords ? filteredReports.length : 0;
  const recordCountLabel = `${visibleRecordCount} record${visibleRecordCount === 1 ? '' : 's'}`;

  function handleStateChange(value: string) {
    setShowAllRecords(false);
    setExpandedId(null);
    setStateFilter(value);
  }

  function handleSourceChange(value: typeof ALL_OPTION | SourceType) {
    setShowAllRecords(false);
    setExpandedId(null);
    setSourceType(value);
  }

  function handleActivityChange(value: string) {
    setShowAllRecords(false);
    setExpandedId(null);
    setActivity(value);
  }

  function handleOperatorChange(value: string) {
    setShowAllRecords(false);
    setExpandedId(null);
    setOperator(value);
  }

  function handleYearFilterChange(value: number) {
    setShowAllRecords(false);
    setExpandedId(null);
    setYearFilter(value);
  }

  function resetFilters() {
    setStateFilter(ALL_OPTION);
    setSourceType(ALL_OPTION);
    setActivity(ALL_OPTION);
    setOperator(ALL_OPTION);
    setYearFilter(YEAR_MAX);
    setShowAllRecords(false);
    setExpandedId(null);
  }

  function openAllRecords() {
    setStateFilter(ALL_OPTION);
    setSourceType(ALL_OPTION);
    setActivity(ALL_OPTION);
    setOperator(ALL_OPTION);
    setYearFilter(YEAR_MAX);
    setShowAllRecords(true);
    setExpandedId(null);
    setMobileFiltersOpen(false);
  }

  function renderFilterPanel() {
    return (
      <div className="filters-panel">
        <div className="filter-stack">
          <label className="filter-field">
            <span className="filter-label">State</span>
            <select value={stateFilter} onChange={(event) => handleStateChange(event.target.value)}>
              <option value={ALL_OPTION}>All states</option>
              {STATE_OPTIONS.filter((state) => state !== ALL_OPTION).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span className="filter-label">Source type</span>
            <select
              value={sourceType}
              onChange={(event) => handleSourceChange(event.target.value as typeof ALL_OPTION | SourceType)}
            >
              <option value={ALL_OPTION}>All source types</option>
              {SOURCE_OPTIONS.filter((option) => option !== ALL_OPTION).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span className="filter-label">Activity</span>
            <select value={activity} onChange={(event) => handleActivityChange(event.target.value)}>
              <option value={ALL_OPTION}>All activities</option>
              {ACTIVITY_OPTIONS.filter((option) => option !== ALL_OPTION).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span className="filter-label">Operator</span>
            <select value={operator} onChange={(event) => handleOperatorChange(event.target.value)}>
              <option value={ALL_OPTION}>All operators</option>
              {OPERATOR_OPTIONS.filter((option) => option !== ALL_OPTION).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-field">
            <span className="filter-label">Year to</span>
            <select value={yearFilter} onChange={(event) => handleYearFilterChange(Number(event.target.value))}>
              {YEAR_OPTIONS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="filters-footer">
          <div className="filters-status">
            <span>{activeFilterCount} active filter{activeFilterCount === 1 ? '' : 's'}</span>
          </div>

          <div className="filters-actions">
            <button type="button" className="ghost-button" onClick={resetFilters}>
              Reset
            </button>
            <button type="button" className="solid-button" onClick={openAllRecords}>
              Show all {REPORTS.length}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ops-app">
      <header className="ops-header">
        <a href="/" className="brand-lockup" aria-label="Rainmaker Operations Search">
          <span className="brand-mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoFailed ? '/r-logo.svg' : 'https://www.rainmaker.com/favicon.ico'}
              alt="Rainmaker R"
              className="brand-mark-image"
              onError={() => setLogoFailed(true)}
            />
          </span>

          <span className="brand-copy">
            <span className="brand-word">Rainmaker</span>
            <span className="brand-title">Ops Search</span>
          </span>
        </a>

        <div className="header-meta">
          <button
            type="button"
            className="drawer-toggle"
            aria-expanded={mobileFiltersOpen}
            aria-controls="mobile-filters"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <MenuIcon />
            <span>Filters</span>
            {activeFilterCount > 0 ? <span className="count-badge">{activeFilterCount}</span> : null}
          </button>
        </div>
      </header>

      <div className="ops-layout">
        <aside className="filters-rail">{renderFilterPanel()}</aside>

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
              <div className="empty-state">
                <div className="empty-state-mark">
                  <SettingsIcon />
                </div>
                <p className="empty-state-copy">
                  Use the Filters panel to search
                  <br />
                  Rainmaker&apos;s publicly available government records
                </p>
              </div>
            ) : filteredReports.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-mark">
                  <SettingsIcon />
                </div>
                <p className="empty-state-copy">
                  No records match the current filters.
                  <br />
                  Reset the panel or loosen a filter.
                </p>
              </div>
            ) : (
              <div className="records-list">
                {filteredReports.map((report) => {
                  const expanded = expandedId === report.id;
                  return (
                    <article key={report.id} className={`record-card${expanded ? ' is-expanded' : ''}`}>
                      <button
                        type="button"
                        className="record-trigger"
                        onClick={() => setExpandedId(expanded ? null : report.id)}
                        aria-expanded={expanded}
                      >
                        <div>
                          <div className="record-meta">{`${report.state} • ${report.sourceType} • ${report.startYear}`}</div>
                          <h3 className="record-name">{report.designation}</h3>
                          <p className="record-subtitle">{`${report.dateRange} · ${report.operator}`}</p>
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
                              <dt>Operator</dt>
                              <dd>{report.operator}</dd>
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
                })}
              </div>
            )}
          </div>
        </section>
      </div>

      <div
        className={`drawer-backdrop${mobileFiltersOpen ? ' is-visible' : ''}`}
        onClick={() => setMobileFiltersOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-filters"
        className={`mobile-drawer${mobileFiltersOpen ? ' is-open' : ''}`}
        aria-hidden={!mobileFiltersOpen}
      >
        <div className="mobile-drawer-header">
          <div>
            <p className="panel-kicker">Filters</p>
            <h2 className="mobile-drawer-title">Refine records</h2>
          </div>
          <div className="mobile-drawer-actions">
            <span className="records-tab">{recordCountLabel}</span>
            <button type="button" className="ghost-button" onClick={() => setMobileFiltersOpen(false)}>
              Close
            </button>
          </div>
        </div>

        <div className="mobile-drawer-body">{renderFilterPanel()}</div>
      </aside>
    </div>
  );
}
