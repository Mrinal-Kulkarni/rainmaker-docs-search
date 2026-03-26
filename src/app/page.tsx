'use client';
import { useState, useMemo } from 'react';
import { REPORTS, SourceType } from '../data/reports';

const PER_PAGE = 20;

const US_STATES = [
  { code: 'ALL', name: 'All States' },
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
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
  { key: 'All', label: 'All Sources', icon: '🗂️' },
  { key: 'NOAA Report', label: 'NOAA Reports', icon: '☁️' },
  { key: 'FAA NOTAM', label: 'FAA NOTAMs', icon: '✈️' },
  { key: 'State Permit', label: 'State Permits', icon: '📋' },
  { key: 'Government Contract', label: 'Gov\'t Contracts', icon: '🏛️' },
  { key: 'Legal Filing', label: 'Legal Filings', icon: '⚖️' },
  { key: 'FOIA Record', label: 'FOIA Records', icon: '🔓' },
  { key: 'Academic Study', label: 'Academic Studies', icon: '🔬' },
];

const ACTIVITIES = ['All', 'Increase precipitation', 'Augment snowpack', 'Hail suppression', 'Fog dispersal', 'Litigation', 'Other'];

const SOURCE_COLORS: Record<string, string> = {
  'NOAA Report': '#1e4a80',
  'FAA NOTAM': '#3d1a6e',
  'State Permit': '#1a4d2e',
  'Government Contract': '#4d3b00',
  'Legal Filing': '#5c1a1a',
  'FOIA Record': '#1a3d4d',
  'Academic Study': '#2e1a4d',
};

const SOURCE_TEXT: Record<string, string> = {
  'NOAA Report': '#7dd3fc',
  'FAA NOTAM': '#c4b5fd',
  'State Permit': '#86efac',
  'Government Contract': '#fde68a',
  'Legal Filing': '#fca5a5',
  'FOIA Record': '#67e8f9',
  'Academic Study': '#d8b4fe',
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [state, setState] = useState('ALL');
  const [activity, setActivity] = useState('All');
  const [sourceTab, setSourceTab] = useState<SourceType | 'All'>('All');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [rainmakerOnly, setRainmakerOnly] = useState(false);
  const [yearMin, setYearMin] = useState(1995);
  const [yearMax, setYearMax] = useState(2026);
  const [showFilters, setShowFilters] = useState(false);

  const allOperators = useMemo(() => {
    const ops = new Set(REPORTS.map(r => r.operator));
    return ['All Operators', ...Array.from(ops).sort()];
  }, []);
  const [operator, setOperator] = useState('All Operators');

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
    if (state !== 'ALL') {
      data = data.filter(r => r.state === state || r.state === '');
    }
    if (activity !== 'All') {
      data = data.filter(r => r.activity.toLowerCase().includes(activity.toLowerCase()));
    }
    if (sourceTab !== 'All') {
      data = data.filter(r => r.sourceType === sourceTab);
    }
    if (rainmakerOnly) {
      data = data.filter(r => r.rainmakerRelated);
    }
    if (operator !== 'All Operators') {
      data = data.filter(r => r.operator === operator);
    }
    data = data.filter(r => r.startYear >= yearMin && r.startYear <= yearMax);
    if (sort === 'newest') {
      data.sort((a, b) => b.startYear - a.startYear);
    } else if (sort === 'oldest') {
      data.sort((a, b) => a.startYear - b.startYear);
    } else {
      data.sort((a, b) => a.designation.localeCompare(b.designation));
    }
    return data;
  }, [query, state, activity, sourceTab, rainmakerOnly, operator, yearMin, yearMax, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function reset() {
    setQuery(''); setState('ALL'); setActivity('All'); setSourceTab('All');
    setRainmakerOnly(false); setOperator('All Operators'); setYearMin(1995); setYearMax(2026);
    setSort('newest'); setPage(1);
  }

  const stateStats: Record<string, number> = {};
  REPORTS.forEach(r => { if (r.state) stateStats[r.state] = (stateStats[r.state] || 0) + 1; });
  const topState = Object.entries(stateStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'UT';
  const rainmakerCount = REPORTS.filter(r => r.rainmakerRelated).length;

  const sourceTabCounts: Record<string, number> = {};
  REPORTS.forEach(r => { sourceTabCounts[r.sourceType] = (sourceTabCounts[r.sourceType] || 0) + 1; });

  return (
    <>
      <header>
        <div className="container">
          <div className="header-inner">
            <div className="logo">
              <div className="logo-icon">🌧</div>
              <div className="logo-text">
                Rainmaker Ops Search
                <span className="logo-sub">Public Government Records</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <section className="hero">
            <h1>Government Weather Modification Records</h1>
            <p>
              Search NOAA reports, FAA NOTAMs, state permits, government contracts, legal filings, FOIA records,
              and academic studies — all public records under federal and state law.
            </p>
            <div className="source-banner">
              <span>📻</span>
              As discussed on the <strong style={{marginLeft:4, marginRight:4}}>Shawn Ryan Show #207 & #217</strong> with Rainmaker CEO Augustus Doricko
            </div>
            <div className="search-wrap">
              <input
                className="search-input"
                type="text"
                placeholder="Search by project name, operator, agency, state, notes..."
                value={query}
                onChange={e => { setQuery(e.target.value); setPage(1); }}
                autoFocus
              />
              <span className="search-icon">🔍</span>
            </div>
          </section>

          {/* Source Type Tabs */}
          <div className="source-tabs">
            {SOURCE_TABS.map(tab => (
              <button
                key={tab.key}
                className={`source-tab${sourceTab === tab.key ? ' active' : ''}`}
                onClick={() => { setSourceTab(tab.key); setPage(1); }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.key !== 'All' && (
                  <span className="tab-count">{sourceTabCounts[tab.key] || 0}</span>
                )}
              </button>
            ))}
          </div>

          {/* Filter Row */}
          <div className="filter-row">
            <button className={`filter-toggle${showFilters ? ' open' : ''}`} onClick={() => setShowFilters(v => !v)}>
              ⚙️ Filters {showFilters ? '▲' : '▼'}
            </button>
            <label className="rm-toggle">
              <input type="checkbox" checked={rainmakerOnly} onChange={e => { setRainmakerOnly(e.target.checked); setPage(1); }} />
              <span>🌧 Rainmaker only</span>
            </label>
            <select className="sort-select" value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alpha">A–Z</option>
            </select>
            <button className="reset-btn" onClick={reset}>Reset</button>
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label className="filter-label">State</label>
                <select className="filter-select" value={state} onChange={e => { setState(e.target.value); setPage(1); }}>
                  {US_STATES.map(s => (
                    <option key={s.code} value={s.code}>
                      {s.name}{s.code !== 'ALL' && stateStats[s.code] ? ` (${stateStats[s.code]})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Activity Type</label>
                <select className="filter-select" value={activity} onChange={e => { setActivity(e.target.value); setPage(1); }}>
                  {ACTIVITIES.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Operator</label>
                <select className="filter-select" value={operator} onChange={e => { setOperator(e.target.value); setPage(1); }}>
                  {allOperators.map(op => <option key={op}>{op}</option>)}
                </select>
              </div>
              <div className="filter-group year-range">
                <label className="filter-label">Year Range: {yearMin} – {yearMax}</label>
                <div className="range-row">
                  <input type="range" min={1960} max={2026} value={yearMin}
                    onChange={e => { const v = parseInt(e.target.value); setYearMin(Math.min(v, yearMax)); setPage(1); }} />
                  <input type="range" min={1960} max={2026} value={yearMax}
                    onChange={e => { const v = parseInt(e.target.value); setYearMax(Math.max(v, yearMin)); setPage(1); }} />
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="stats-row">
            <div className="stat">
              <span className="stat-num">{REPORTS.length}</span>
              <span className="stat-label">Total Records</span>
            </div>
            <div className="stat">
              <span className="stat-num">{rainmakerCount}</span>
              <span className="stat-label">Rainmaker Ops</span>
            </div>
            <div className="stat">
              <span className="stat-num">{Object.keys(stateStats).length}</span>
              <span className="stat-label">States</span>
            </div>
            <div className="stat">
              <span className="stat-num">{topState}</span>
              <span className="stat-label">Most Active</span>
            </div>
            <div className="stat">
              <span className="stat-num">{Object.keys(sourceTabCounts).length}</span>
              <span className="stat-label">Source Types</span>
            </div>
          </div>

          <div className="info-box">
            <strong>📋 Why do these records exist?</strong> Under the <strong>Weather Modification Reporting Act of 1972</strong> (15 U.S.C. § 330) and <strong>15 CFR § 908</strong>, every cloud seeding operator must notify NOAA at least 10 days before operations. FAA NOTAMs are issued for flight safety. State permits are required in TX, UT, OR, AZ, WY, ID, ND, and others. All contracts above $10k are published on SAM.gov. <strong>Rainmaker CEO Augustus Doricko</strong> confirmed this on <a href="https://shawnryanshow.com/blogs/vigilance-elite-blogs/srs-207-augustus-doricko-ceo-of-rainmaker-manipulating-the-weather" target="_blank" rel="noreferrer">SRS #207</a> and <a href="https://www.youtube.com/watch?v=cJhqXAZP7Mk" target="_blank" rel="noreferrer">SRS #217</a>.
          </div>

          {/* Results */}
          <div className="results-header">
            <span className="results-count">
              {filtered.length === 0
                ? 'No results'
                : `${filtered.length.toLocaleString()} record${filtered.length !== 1 ? 's' : ''} found`}
            </span>
          </div>

          {paginated.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🌤</div>
              <p>No records match your filters.</p>
              <button className="reset-btn" style={{marginTop:12}} onClick={reset}>Clear all filters</button>
            </div>
          ) : (
            <div className="results-grid">
              {paginated.map(r => (
                <div key={r.id} className="doc-card">
                  <div className="card-main">
                    <div className="card-top-row">
                      <div className="doc-id">{r.id}</div>
                      <span
                        className="source-badge"
                        style={{ background: SOURCE_COLORS[r.sourceType], color: SOURCE_TEXT[r.sourceType] }}
                      >
                        {SOURCE_TABS.find(t => t.key === r.sourceType)?.icon} {r.sourceType}
                      </span>
                      {r.rainmakerRelated && <span className="rm-badge">🌧 Rainmaker</span>}
                    </div>
                    <div className="doc-title">{r.designation}</div>
                    <div className="doc-meta">
                      {r.state && <span>📍 {US_STATES.find(s => s.code === r.state)?.name || r.state}</span>}
                      <span>📅 {r.dateRange}</span>
                      <span>🏢 {r.operator}</span>
                      <span>🏛 {r.agency}</span>
                    </div>
                    {r.activity !== 'Other' && <div className="doc-activity">⚡ {r.activity}</div>}
                    {r.notes && <div className="doc-notes">💡 {r.notes}</div>}
                  </div>
                  <div className="doc-action">
                    <a href={r.url} target="_blank" rel="noreferrer" className="btn-pdf">
                      View Source
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              {page > 1 && (
                <button className="page-btn" onClick={() => { setPage(p => p-1); window.scrollTo({top:0,behavior:'smooth'}); }}>← Prev</button>
              )}
              {Array.from({length: Math.min(totalPages, 7)}, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`page-btn${page === p ? ' current' : ''}`}
                  onClick={() => { setPage(p); window.scrollTo({top:0, behavior:'smooth'}); }}
                >
                  {p}
                </button>
              ))}
              {totalPages > 7 && <span style={{color:'var(--muted)',alignSelf:'center'}}>…{totalPages}</span>}
              {page < totalPages && (
                <button className="page-btn" onClick={() => { setPage(p => p+1); window.scrollTo({top:0,behavior:'smooth'}); }}>Next →</button>
              )}
            </div>
          )}
        </div>
      </main>

      <footer>
        <div className="container">
          <p>
            Data from <a href="https://library.noaa.gov/weather-climate/weather-modification-project-reports" target="_blank" rel="noreferrer">NOAA</a>,
            {' '}<a href="https://notams.aim.faa.gov/notamSearch/" target="_blank" rel="noreferrer">FAA NOTAMs</a>,
            {' '}<a href="https://sam.gov" target="_blank" rel="noreferrer">SAM.gov</a>,
            {' '}<a href="https://www.tdlr.texas.gov/weather/weathermod.htm" target="_blank" rel="noreferrer">TDLR</a>, and state agencies.
            Built for transparency · <a href="https://shawnryanshow.com" target="_blank" rel="noreferrer">Shawn Ryan Show</a>
          </p>
        </div>
      </footer>
    </>
  );
}
