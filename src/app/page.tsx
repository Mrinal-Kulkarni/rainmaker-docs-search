'use client';

import { useRef, useState } from 'react';
import { REPORTS, SourceType } from '../data/reports';

const US_STATES = [
  { code: 'ALL', name: 'All states' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AL', name: 'Alabama' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
];

type SourceFilter = SourceType | 'All';

const BASE_REPORTS = REPORTS.filter((report) => report.rainmakerRelated);
const YEAR_MIN = Math.min(...BASE_REPORTS.map((report) => report.startYear));
const YEAR_MAX = Math.max(...BASE_REPORTS.map((report) => report.startYear));
const YEAR_OPTIONS = Array.from(
  { length: YEAR_MAX - YEAR_MIN + 1 },
  (_, index) => YEAR_MAX - index,
);
const SOURCE_TYPE_OPTIONS = [
  'All',
  ...Array.from(new Set(BASE_REPORTS.map((report) => report.sourceType))).sort(),
] as SourceFilter[];
const OPERATOR_OPTIONS = [
  'All Operators',
  ...Array.from(new Set(BASE_REPORTS.map((report) => report.operator))).sort(),
];

function getStateLabel(code: string) {
  return US_STATES.find((state) => state.code === code)?.name ?? code;
}

function isPdfUrl(url: string) {
  return /\.pdf(?:$|[?#])/i.test(url);
}

export default function Home() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [sourceType, setSourceType] = useState<SourceFilter>('All');
  const [operator, setOperator] = useState('All Operators');
  const [yearMin, setYearMin] = useState(YEAR_MIN);
  const [yearMax, setYearMax] = useState(YEAR_MAX);
  const [showFilters, setShowFilters] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const hasActiveFilters =
    stateFilter !== 'ALL' ||
    sourceType !== 'All' ||
    operator !== 'All Operators' ||
    yearMin !== YEAR_MIN ||
    yearMax !== YEAR_MAX;
  const activeCount = [
    stateFilter !== 'ALL',
    sourceType !== 'All',
    operator !== 'All Operators',
    yearMin !== YEAR_MIN || yearMax !== YEAR_MAX,
  ].filter(Boolean).length;

  const hasStartedSearch = query.trim().length > 0 || hasActiveFilters;

  const filtered = BASE_REPORTS.filter((report) => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery) {
      const matchesQuery =
        report.designation.toLowerCase().includes(normalizedQuery) ||
        report.id.toLowerCase().includes(normalizedQuery) ||
        report.activity.toLowerCase().includes(normalizedQuery) ||
        report.operator.toLowerCase().includes(normalizedQuery) ||
        report.agency.toLowerCase().includes(normalizedQuery) ||
        report.state.toLowerCase().includes(normalizedQuery) ||
        report.sourceType.toLowerCase().includes(normalizedQuery) ||
        report.dateRange.toLowerCase().includes(normalizedQuery) ||
        report.notes?.toLowerCase().includes(normalizedQuery);

      if (!matchesQuery) {
        return false;
      }
    }

    if (stateFilter !== 'ALL' && report.state !== stateFilter) {
      return false;
    }

    if (sourceType !== 'All' && report.sourceType !== sourceType) {
      return false;
    }

    if (operator !== 'All Operators' && report.operator !== operator) {
      return false;
    }

    return report.startYear >= yearMin && report.startYear <= yearMax;
  }).sort((left, right) => right.startYear - left.startYear);

  const resultsLabel = `${filtered.length} record${filtered.length === 1 ? '' : 's'}`;

  function resetFilters() {
    setStateFilter('ALL');
    setSourceType('All');
    setOperator('All Operators');
    setYearMin(YEAR_MIN);
    setYearMax(YEAR_MAX);
    setExpanded(null);
  }

  function clearSearch() {
    setQuery('');
    setExpanded(null);
    searchRef.current?.focus();
  }

  function handleYearMinChange(value: number) {
    setYearMin(value);
    if (value > yearMax) {
      setYearMax(value);
    }
    setExpanded(null);
  }

  function handleYearMaxChange(value: number) {
    setYearMax(value);
    if (value < yearMin) {
      setYearMin(value);
    }
    setExpanded(null);
  }

  return (
    <>
      <header className="site-header">
        <div className="shell header-row">
          <a href="/" className="brand" aria-label="Rainmaker Operations Search">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rainmaker-wordmark.webp"
              alt="Rainmaker"
              className="brand-wordmark"
            />
          </a>
          <p className="brand-caption">Operations Search / public records archive</p>
        </div>
      </header>

      <main className="shell site-main">
        <section className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Rainmaker public records index</p>
            <h1>Search Rainmaker-linked weather modification filings.</h1>
            <p className="hero-text">
              A stripped-down archive of NOAA reports, state permits, contracts, and related
              public records tied to Rainmaker Technology Corporation operations.
            </p>
          </div>

          <div className="hero-panel">
            <div className="hero-panel-row">
              <span>Scope</span>
              <strong>Rainmaker-linked records only</strong>
            </div>
            <div className="hero-panel-row">
              <span>Archive window</span>
              <strong>
                {YEAR_MIN} to {YEAR_MAX}
              </strong>
            </div>
            <div className="hero-panel-row">
              <span>Sources</span>
              <strong>NOAA / permits / contracts / studies</strong>
            </div>
          </div>
        </section>

        <section className="search-frame">
          <div className="toolbar">
            <label className="search-field" htmlFor="record-search">
              <span className="toolbar-label">Search</span>
              <input
                id="record-search"
                ref={searchRef}
                className="search-input"
                type="text"
                placeholder="Operator, agency, record ID, activity, note"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setExpanded(null);
                }}
              />
            </label>

            <div className="toolbar-actions">
              <button
                type="button"
                className={`toolbar-button${showFilters ? ' is-active' : ''}`}
                onClick={() => setShowFilters((current) => !current)}
              >
                Filters
                {hasActiveFilters ? <span className="count-pill">{activeCount}</span> : null}
              </button>
              {(query || hasActiveFilters) && (
                <button
                  type="button"
                  className="toolbar-button toolbar-button-secondary"
                  onClick={() => {
                    clearSearch();
                    resetFilters();
                  }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-grid">
                <label className="filter-field">
                  <span className="toolbar-label">State</span>
                  <select
                    value={stateFilter}
                    onChange={(event) => {
                      setStateFilter(event.target.value);
                      setExpanded(null);
                    }}
                  >
                    {US_STATES.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-field">
                  <span className="toolbar-label">Source type</span>
                  <select
                    value={sourceType}
                    onChange={(event) => {
                      setSourceType(event.target.value as SourceFilter);
                      setExpanded(null);
                    }}
                  >
                    {SOURCE_TYPE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-field">
                  <span className="toolbar-label">Operator</span>
                  <select
                    value={operator}
                    onChange={(event) => {
                      setOperator(event.target.value);
                      setExpanded(null);
                    }}
                  >
                    {OPERATOR_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-field">
                  <span className="toolbar-label">From year</span>
                  <select
                    value={yearMin}
                    onChange={(event) => handleYearMinChange(Number(event.target.value))}
                  >
                    {YEAR_OPTIONS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-field">
                  <span className="toolbar-label">To year</span>
                  <select
                    value={yearMax}
                    onChange={(event) => handleYearMaxChange(Number(event.target.value))}
                  >
                    {YEAR_OPTIONS.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {hasActiveFilters && (
                <div className="active-strip">
                  <div className="chip-row">
                    {stateFilter !== 'ALL' && (
                      <button
                        type="button"
                        className="filter-chip"
                        onClick={() => {
                          setStateFilter('ALL');
                          setExpanded(null);
                        }}
                      >
                        State: {getStateLabel(stateFilter)} <span>×</span>
                      </button>
                    )}
                    {sourceType !== 'All' && (
                      <button
                        type="button"
                        className="filter-chip"
                        onClick={() => {
                          setSourceType('All');
                          setExpanded(null);
                        }}
                      >
                        Source: {sourceType} <span>×</span>
                      </button>
                    )}
                    {operator !== 'All Operators' && (
                      <button
                        type="button"
                        className="filter-chip"
                        onClick={() => {
                          setOperator('All Operators');
                          setExpanded(null);
                        }}
                      >
                        Operator: {operator} <span>×</span>
                      </button>
                    )}
                    {(yearMin !== YEAR_MIN || yearMax !== YEAR_MAX) && (
                      <button
                        type="button"
                        className="filter-chip"
                        onClick={() => {
                          setYearMin(YEAR_MIN);
                          setYearMax(YEAR_MAX);
                          setExpanded(null);
                        }}
                      >
                        Years: {yearMin} to {yearMax} <span>×</span>
                      </button>
                    )}
                  </div>

                  <button type="button" className="inline-reset" onClick={resetFilters}>
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="results-frame">
          <div className="results-header">
            <div>
              <p className="eyebrow">Archive</p>
              <h2>{hasStartedSearch ? resultsLabel : 'No records loaded yet'}</h2>
            </div>
            <p className="results-note">
              PDF and source links stay hidden until a record is expanded.
            </p>
          </div>

          {!hasStartedSearch ? (
            <div className="empty-state">
              <p className="empty-kicker">Start with a filter</p>
              <h3>Pick a state, source type, operator, year range, or enter a keyword.</h3>
              <p>
                The archive stays empty on first load so the search starts with intent instead of
                noise.
              </p>
              <div className="empty-actions">
                <button
                  type="button"
                  className="toolbar-button is-active"
                  onClick={() => setShowFilters(true)}
                >
                  Open filters
                </button>
                <button
                  type="button"
                  className="toolbar-button toolbar-button-secondary"
                  onClick={() => searchRef.current?.focus()}
                >
                  Focus search
                </button>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <p className="empty-kicker">No matches</p>
              <h3>No records match the current search.</h3>
              <p>Widen the year range, clear a filter, or try a broader keyword.</p>
            </div>
          ) : (
            <div className="record-list">
              {filtered.map((report) => {
                const isOpen = expanded === report.id;

                return (
                  <article key={report.id} className={`record-card${isOpen ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      className="record-trigger"
                      aria-expanded={isOpen}
                      onClick={() => setExpanded(isOpen ? null : report.id)}
                    >
                      <div className="record-meta-row">
                        <span>{report.id}</span>
                        <span>{getStateLabel(report.state)}</span>
                        <span>{report.sourceType}</span>
                        <span>{report.startYear}</span>
                      </div>
                      <h3 className="record-title">{report.designation}</h3>
                      <p className="record-summary">
                        {report.operator} / {report.agency} / {report.activity}
                      </p>
                    </button>

                    {isOpen && (
                      <div className="record-detail">
                        <div className="detail-grid">
                          <div>
                            <span className="detail-label">Date range</span>
                            <p>{report.dateRange}</p>
                          </div>
                          <div>
                            <span className="detail-label">Issuing agency</span>
                            <p>{report.agency}</p>
                          </div>
                          <div>
                            <span className="detail-label">Operator</span>
                            <p>{report.operator}</p>
                          </div>
                          <div>
                            <span className="detail-label">Activity</span>
                            <p>{report.activity}</p>
                          </div>
                        </div>

                        {report.notes && <p className="detail-notes">{report.notes}</p>}

                        <a
                          href={report.url}
                          target="_blank"
                          rel="noreferrer"
                          className="detail-link"
                        >
                          {isPdfUrl(report.url) ? 'Open PDF source' : 'Open source document'}
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-row">
          <p>Public records archive. Not affiliated with Rainmaker Technology Corporation.</p>
          <p>Brutalist monochrome rebuild.</p>
        </div>
      </footer>
    </>
  );
}
