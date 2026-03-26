'use client';
import { useState, useMemo, useCallback } from 'react';
import { REPORTS, SourceType } from '../data/reports';

const US_STATES = [
  { code: 'ALL', name: 'All States' },
  { code: 'AK', name: 'Alaska' }, { code: 'AL', name: 'Alabama' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
];

export default function Home() {
  const [query, setQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [sourceType, setSourceType] = useState<SourceType | 'All'>('All');
  const [operator, setOperator] = useState('All Operators');
  const [yearMin, setYearMin] = useState(2020);
  const [yearMax, setYearMax] = useState(2026);
  const [showFilters, setShowFilters] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Only Rainmaker records
  const BASE = useMemo(() => REPORTS.filter(r => r.rainmakerRelated), []);

  const allSourceTypes = useMemo(() => {
    const s = new Set(BASE.map(r => r.sourceType));
    return ['All', ...Array.from(s).sort()] as (SourceType | 'All')[];
  }, [BASE]);

  const allOperators = useMemo(() => {
    const ops = new Set(BASE.map(r => r.operator));
    return ['All Operators', ...Array.from(ops).sort()];
  }, [BASE]);

  const stateLabel = (code: string) => US_STATES.find(s => s.code === code)?.name || code;

  const filtered = useMemo(() => {
    let data = [...BASE];
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(r =>
        r.designation.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.activity.toLowerCase().includes(q) ||
        r.operator.toLowerCase().includes(q) ||
        r.agency.toLowerCase().includes(q) ||
        (r.notes && r.notes.toLowerCase().includes(q)) ||
        (r.state && r.state.toLowerCase().includes(q))
      );
    }
    if (stateFilter !== 'ALL') data = data.filter(r => r.state === stateFilter);
    if (sourceType !== 'All') data = data.filter(r => r.sourceType === sourceType);
    if (operator !== 'All Operators') data = data.filter(r => r.operator === operator);
    data = data.filter(r => r.startYear >= yearMin && r.startYear <= yearMax);
    data.sort((a, b) => b.startYear - a.startYear);
    return data;
  }, [BASE, query, stateFilter, sourceType, operator, yearMin, yearMax]);

  const activeCount = [
    stateFilter !== 'ALL',
    sourceType !== 'All',
    operator !== 'All Operators',
    yearMin !== 2020 || yearMax !== 2026,
  ].filter(Boolean).length;

  const reset = useCallback(() => {
    setStateFilter('ALL');
    setSourceType('All');
    setOperator('All Operators');
    setYearMin(2020);
    setYearMax(2026);
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <div className="header-inner">
            <a href="/" className="logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.rainmaker.com/assets/rainmaker-logo.svg"
                alt="Rainmaker"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.onerror = null;
                  img.src = 'https://www.rainmaker.com/favicon.ico';
                }}
              />
              <div className="logo-divider" />
              <span className="logo-label">Operations Search</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="hero">
            <p className="hero-eyebrow">Public government records — Weather Modification Act 1972</p>
            <h1>Rainmaker Operations Database</h1>
            <p className="hero-sub">
              Search NOAA reports, FAA NOTAMs, state permits, government contracts, legal filings,
              FOIA records, and academic studies tied to Rainmaker Technology Corp operations.
            </p>
          </section>

          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-wrap">
              <input
                className="search-input"
                type="text"
                placeholder="Search records..."
                value={query}
                onChange={e => { setQuery(e.target.value); setExpanded(null); }}
              />
              <span className="search-kbd">/</span>
            </div>
            <button
              className={`toolbar-btn${showFilters ? ' active' : ''}`}
              onClick={() => setShowFilters(v => !v)}
            >
              Filters
              {activeCount > 0 && <span className="filter-badge">{activeCount}</span>}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="filter-panel">
              <div className="filter-grid">
                <div className="filter-cell">
                  <label className="filter-label">State</label>
                  <select
                    className="filter-select"
                    value={stateFilter}
                    onChange={e => { setStateFilter(e.target.value); setExpanded(null); }}
                  >
                    {US_STATES.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                  </select>
                </div>
                <div className="filter-cell">
                  <label className="filter-label">Source Type</label>
                  <select
                    className="filter-select"
                    value={sourceType}
                    onChange={e => { setSourceType(e.target.value as SourceType | 'All'); setExpanded(null); }}
                  >
                    {allSourceTypes.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="filter-cell">
                  <label className="filter-label">Operator</label>
                  <select
                    className="filter-select"
                    value={operator}
                    onChange={e => { setOperator(e.target.value); setExpanded(null); }}
                  >
                    {allOperators.map(op => <option key={op}>{op}</option>)}
                  </select>
                </div>
                <div className="filter-cell year-span">
                  <label className="filter-label">
                    Year Range — <span className="range-display">{yearMin} → {yearMax}</span>
                  </label>
                  <div className="range-row">
                    <input
                      type="range" min={2020} max={2026} value={yearMin}
                      onChange={e => setYearMin(Math.min(+e.target.value, yearMax))}
                    />
                    <input
                      type="range" min={2020} max={2026} value={yearMax}
                      onChange={e => setYearMax(Math.max(+e.target.value, yearMin))}
                    />
                  </div>
                </div>
              </div>
              {activeCount > 0 && (
                <div className="filter-footer">
                  <div className="chips">
                    {stateFilter !== 'ALL' && (
                      <span className="chip">{stateLabel(stateFilter)}<span className="chip-x" onClick={() => setStateFilter('ALL')}>×</span></span>
                    )}
                    {sourceType !== 'All' && (
                      <span className="chip">{sourceType}<span className="chip-x" onClick={() => setSourceType('All')}>×</span></span>
                    )}
                    {operator !== 'All Operators' && (
                      <span className="chip">{operator}<span className="chip-x" onClick={() => setOperator('All Operators')}>×</span></span>
                    )}
                    {(yearMin !== 2020 || yearMax !== 2026) && (
                      <span className="chip">{yearMin}–{yearMax}<span className="chip-x" onClick={() => { setYearMin(2020); setYearMax(2026); }}>×</span></span>
                    )}
                  </div>
                  <button className="clear-btn" onClick={reset}>Clear all</button>
                </div>
              )}
            </div>
          )}

          {/* Records */}
          <div className="view-area">
            <div className="results-count">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</div>
            {filtered.length === 0 ? (
              <div className="empty">No records match your filters.</div>
            ) : (
              <div className="records">
                {filtered.map(r => {
                  const isOpen = expanded === r.id;
                  return (
                    <div key={r.id}>
                      <div
                        className={`record-row${isOpen ? ' open' : ''}`}
                        onClick={() => setExpanded(isOpen ? null : r.id)}
                      >
                        <div className="record-left">
                          <span className="record-id">{r.id}</span>
                          <span className="record-type">{r.sourceType}</span>
                          {r.state && <span className="record-state">{stateLabel(r.state)}</span>}
                          <span className="record-year">{r.startYear}</span>
                        </div>
                        <div className="record-center">
                          <span className="record-title">{r.designation}</span>
                          <div className="record-meta">
                            <span>{r.operator}</span>
                            <span>{r.agency}</span>
                            <span>{r.activity}</span>
                          </div>
                        </div>
                        <div className="record-right">
                          <span className="chevron">▾</span>
                        </div>
                      </div>
                      {isOpen && (
                        <div className="record-detail">
                          <div className="detail-block">
                            <span className="detail-label">Date Range</span>
                            <span className="detail-value">{r.dateRange}</span>
                          </div>
                          <div className="detail-block">
                            <span className="detail-label">Issuing Agency</span>
                            <span className="detail-value">{r.agency}</span>
                          </div>
                          <div className="detail-block">
                            <span className="detail-label">Operator</span>
                            <span className="detail-value">{r.operator}</span>
                          </div>
                          <div className="detail-block">
                            <span className="detail-label">Activity</span>
                            <span className="detail-value">{r.activity}</span>
                          </div>
                          {r.notes && (
                            <div className="detail-notes">{r.notes}</div>
                          )}
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="detail-link"
                            onClick={e => e.stopPropagation()}
                          >
                            <span>View source document — {r.agency}</span>
                            <span>↗</span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <span className="footer-text">Public records. Not affiliated with Rainmaker Technology Corp.</span>
            <div className="footer-links">
              <a href="https://library.noaa.gov/weather-climate/weather-modification-project-reports" target="_blank" rel="noreferrer">NOAA Archive</a>
              <a href="https://sam.gov" target="_blank" rel="noreferrer">SAM.gov</a>
              <a href="https://notams.aim.faa.gov/notamSearch/" target="_blank" rel="noreferrer">FAA NOTAMs</a>
              <a href="https://www.rainmaker.com" target="_blank" rel="noreferrer">Rainmaker.com</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
