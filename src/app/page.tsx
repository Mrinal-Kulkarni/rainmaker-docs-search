'use client';
import { useState, useMemo, useCallback } from 'react';
import { REPORTS, SourceType } from '../data/reports';
import MapView from '../components/MapView';

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

const SOURCE_TABS: { key: SourceType | 'All'; label: string; icon: string }[] = [
  { key: 'All', label: 'All Records', icon: '' },
  { key: 'NOAA Report', label: 'NOAA Reports', icon: '☁' },
  { key: 'FAA NOTAM', label: 'FAA NOTAMs', icon: '✈' },
  { key: 'State Permit', label: 'State Permits', icon: '📋' },
  { key: 'Government Contract', label: 'Contracts', icon: '🏛' },
  { key: 'Legal Filing', label: 'Legal', icon: '⚖' },
  { key: 'FOIA Record', label: 'FOIA', icon: '🔓' },
  { key: 'Academic Study', label: 'Studies', icon: '🔬' },
];

const SOURCE_STYLE: Record<string, { bg: string; color: string }> = {
  'NOAA Report':        { bg: 'rgba(79,142,255,0.12)', color: '#4f8eff' },
  'FAA NOTAM':          { bg: 'rgba(181,123,255,0.12)', color: '#b57bff' },
  'State Permit':       { bg: 'rgba(62,207,142,0.12)', color: '#3ecf8e' },
  'Government Contract':{ bg: 'rgba(245,200,66,0.12)', color: '#f5c842' },
  'Legal Filing':       { bg: 'rgba(255,90,90,0.12)',  color: '#ff5a5a' },
  'FOIA Record':        { bg: 'rgba(56,189,248,0.12)', color: '#38bdf8' },
  'Academic Study':     { bg: 'rgba(168,85,247,0.12)', color: '#a855f7' },
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [activity, setActivity] = useState('All');
  const [sourceTab, setSourceTab] = useState<SourceType | 'All'>('All');
  const [rainmakerOnly, setRainmakerOnly] = useState(false);
  const [operator, setOperator] = useState('All Operators');
  const [yearMin, setYearMin] = useState(1960);
  const [yearMax, setYearMax] = useState(2026);
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [expanded, setExpanded] = useState<string | null>(null);

  const allOperators = useMemo(() => {
    const ops = new Set(REPORTS.map(r => r.operator));
    return ['All Operators', ...Array.from(ops).sort()];
  }, []);

  const allActivities = useMemo(() => {
    const acts = new Set(REPORTS.map(r => r.activity));
    return ['All', ...Array.from(acts).sort()];
  }, []);

  const filtered = useMemo(() => {
    let data = [...REPORTS];
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
    if (stateFilter !== 'ALL') data = data.filter(r => r.state === stateFilter || r.state === '');
    if (activity !== 'All') data = data.filter(r => r.activity === activity);
    if (sourceTab !== 'All') data = data.filter(r => r.sourceType === sourceTab);
    if (rainmakerOnly) data = data.filter(r => r.rainmakerRelated);
    if (operator !== 'All Operators') data = data.filter(r => r.operator === operator);
    data = data.filter(r => r.startYear >= yearMin && r.startYear <= yearMax);
    data.sort((a, b) => b.startYear - a.startYear);
    return data;
  }, [query, stateFilter, activity, sourceTab, rainmakerOnly, operator, yearMin, yearMax]);

  const sourceTabCounts = useMemo(() => {
    const c: Record<string, number> = {};
    REPORTS.forEach(r => { c[r.sourceType] = (c[r.sourceType] || 0) + 1; });
    return c;
  }, []);

  const activeFilterCount = [stateFilter !== 'ALL', activity !== 'All', operator !== 'All Operators',
    yearMin !== 1960 || yearMax !== 2026, rainmakerOnly].filter(Boolean).length;

  const reset = useCallback(() => {
    setStateFilter('ALL'); setActivity('All'); setOperator('All Operators');
    setYearMin(1960); setYearMax(2026); setRainmakerOnly(false);
  }, []);

  const stateLabel = (code: string) => US_STATES.find(s => s.code === code)?.name || code;

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
                onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }}
              />
              <div className="logo-divider" />
              <span className="logo-wordmark">Ops Search</span>
            </a>
            <div className="header-right">
              <div className="header-pill">
                <div className="dot-live" />
                {REPORTS.length} records indexed
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="hero">
            <p className="hero-eyebrow">Public government records &mdash; <span>Weather Modification Act 1972</span></p>
            <h1>Rainmaker Operations Database</h1>
            <p className="hero-sub">
              Search NOAA reports, FAA NOTAMs, state permits, government contracts, legal filings, FOIA records,
              and academic studies. Every operation is legally required to be disclosed.
            </p>
            <div className="hero-actions">
              <a href="https://shawnryanshow.com/blogs/vigilance-elite-blogs/srs-207-augustus-doricko-ceo-of-rainmaker-manipulating-the-weather"
                target="_blank" rel="noreferrer" className="btn-primary">
                📻 SRS #207 — Augustus Doricko
              </a>
              <a href="https://www.youtube.com/watch?v=cJhqXAZP7Mk" target="_blank" rel="noreferrer" className="btn-ghost">
                ▶ SRS #217 — Texas Floods Response
              </a>
            </div>
          </section>

          {/* Source Tabs */}
          <div className="source-tabs">
            {SOURCE_TABS.map(tab => (
              <button key={tab.key}
                className={`source-tab${sourceTab === tab.key ? ' active' : ''}`}
                onClick={() => { setSourceTab(tab.key); setExpanded(null); }}>
                {tab.icon && <span>{tab.icon}</span>}
                <span>{tab.label}</span>
                <span className="tab-count">
                  {tab.key === 'All' ? REPORTS.length : (sourceTabCounts[tab.key] || 0)}
                </span>
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="toolbar">
            <div className="search-wrap">
              <input className="search-input" type="text" placeholder="Search records..."
                value={query} onChange={e => { setQuery(e.target.value); setExpanded(null); }} />
              <span className="search-kbd">/</span>
            </div>
            <button className={`toolbar-btn${showFilters ? ' active' : ''}`}
              onClick={() => setShowFilters(v => !v)}>
              ⚙ Filters
              {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
            </button>
            <button className={`rm-toggle-btn${rainmakerOnly ? ' on' : ''}`}
              onClick={() => { setRainmakerOnly(v => !v); setExpanded(null); }}>
              {rainmakerOnly ? '● ' : '○ '}Rainmaker Only
            </button>
            <button className={`toolbar-btn${view === 'list' ? ' active' : ''}`}
              onClick={() => setView('list')}>List</button>
            <button className={`toolbar-btn${view === 'map' ? ' active' : ''}`}
              onClick={() => setView('map')}>🗺 Map</button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="filter-panel">
              <div className="container">
                <div className="filter-grid">
                  <div className="filter-cell">
                    <label className="filter-label">State</label>
                    <select className="filter-select" value={stateFilter}
                      onChange={e => { setStateFilter(e.target.value); setExpanded(null); }}>
                      {US_STATES.map(s => (
                        <option key={s.code} value={s.code}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-cell">
                    <label className="filter-label">Activity</label>
                    <select className="filter-select" value={activity}
                      onChange={e => { setActivity(e.target.value); setExpanded(null); }}>
                      {allActivities.map(a => <option key={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className="filter-cell">
                    <label className="filter-label">Operator</label>
                    <select className="filter-select" value={operator}
                      onChange={e => { setOperator(e.target.value); setExpanded(null); }}>
                      {allOperators.map(op => <option key={op}>{op}</option>)}
                    </select>
                  </div>
                  <div className="filter-cell year-range-cell">
                    <label className="filter-label">
                      Year Range — <span className="range-display">{yearMin} → {yearMax}</span>
                    </label>
                    <div className="range-row">
                      <input type="range" min={1960} max={2026} value={yearMin}
                        onChange={e => { const v = parseInt(e.target.value); setYearMin(Math.min(v, yearMax)); }} />
                      <input type="range" min={1960} max={2026} value={yearMax}
                        onChange={e => { const v = parseInt(e.target.value); setYearMax(Math.max(v, yearMin)); }} />
                    </div>
                  </div>
                </div>
                <div className="filter-footer">
                  <div className="active-filters">
                    {stateFilter !== 'ALL' && (
                      <span className="filter-chip">📍 {stateLabel(stateFilter)}<span className="chip-x" onClick={() => setStateFilter('ALL')}>×</span></span>
                    )}
                    {activity !== 'All' && (
                      <span className="filter-chip">⚡ {activity}<span className="chip-x" onClick={() => setActivity('All')}>×</span></span>
                    )}
                    {operator !== 'All Operators' && (
                      <span className="filter-chip">🏢 {operator}<span className="chip-x" onClick={() => setOperator('All Operators')}>×</span></span>
                    )}
                    {(yearMin !== 1960 || yearMax !== 2026) && (
                      <span className="filter-chip">📅 {yearMin}–{yearMax}<span className="chip-x" onClick={() => { setYearMin(1960); setYearMax(2026); }}>×</span></span>
                    )}
                  </div>
                  {activeFilterCount > 0 && (
                    <button className="clear-btn" onClick={reset}>Clear all</button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* View Area */}
          <div className="view-area">
            <div className="results-meta">
              <span className="results-count">
                {filtered.length === 0 ? 'no records' : `${filtered.length} record${filtered.length !== 1 ? 's' : ''}`}
              </span>
            </div>

            {view === 'map' ? (
              <MapView records={filtered} />
            ) : filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">🌤</div>
                <p>No records match your current filters.</p>
              </div>
            ) : (
              <div className="records-grid">
                {filtered.map(r => {
                  const isExp = expanded === r.id;
                  const style = SOURCE_STYLE[r.sourceType] || { bg: 'rgba(255,255,255,0.06)', color: '#a0a0a0' };
                  return (
                    <div key={r.id}>
                      <div className={`record-row${isExp ? ' expanded' : ''}`}
                        onClick={() => setExpanded(isExp ? null : r.id)}>
                        <div className="record-left">
                          <span className="record-id">{r.id}</span>
                          <span className="source-pill" style={{ background: style.bg, color: style.color }}>
                            {r.sourceType}
                          </span>
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
                          {r.rainmakerRelated && <span className="rm-dot" title="Rainmaker operation" />}
                          <span className="chevron">▼</span>
                        </div>
                      </div>
                      {isExp && (
                        <div className="record-detail">
                          <div className="detail-section">
                            <span className="detail-label">Date Range</span>
                            <span className="detail-value">{r.dateRange}</span>
                          </div>
                          <div className="detail-section">
                            <span className="detail-label">Issuing Agency</span>
                            <span className="detail-value">{r.agency}</span>
                          </div>
                          <div className="detail-section">
                            <span className="detail-label">Operator</span>
                            <span className="detail-value">{r.operator}</span>
                          </div>
                          <div className="detail-section">
                            <span className="detail-label">Activity</span>
                            <span className="detail-value">{r.activity}</span>
                          </div>
                          {r.notes && (
                            <div className="detail-notes">{r.notes}</div>
                          )}
                          <a href={r.url} target="_blank" rel="noreferrer" className="detail-link"
                            onClick={e => e.stopPropagation()}>
                            <span>View source document — {r.agency}</span>
                            <span className="detail-link-arrow">↗</span>
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
            <span className="footer-left">© {new Date().getFullYear()} — Public records engine. Not affiliated with Rainmaker Technology Corp.</span>
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
