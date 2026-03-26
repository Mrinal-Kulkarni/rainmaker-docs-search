'use client';
import { useState, useMemo } from 'react';
import { REPORTS } from '../data/reports';

const PER_PAGE = 20;

const ACTIVITIES = ['All', 'Increase precipitation', 'Augment snowpack', 'Fog dispersal', 'Hail suppression', 'Other'];

export default function Home() {
  const [query, setQuery] = useState('');
  const [activity, setActivity] = useState('All');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let data = [...REPORTS];
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(r =>
        r.designation.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.activity.toLowerCase().includes(q) ||
        (r.state && r.state.toLowerCase().includes(q))
      );
    }
    if (activity !== 'All') {
      data = data.filter(r => r.activity.toLowerCase().includes(activity.toLowerCase()));
    }
    if (sort === 'newest') {
      data.sort((a, b) => b.startYear - a.startYear);
    } else if (sort === 'oldest') {
      data.sort((a, b) => a.startYear - b.startYear);
    } else {
      data.sort((a, b) => a.designation.localeCompare(b.designation));
    }
    return data;
  }, [query, activity, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setPage(1);
  }

  function handleActivity(a: string) {
    setActivity(a);
    setPage(1);
  }

  const stateStats: Record<string, number> = {};
  REPORTS.forEach(r => { if (r.state) stateStats[r.state] = (stateStats[r.state] || 0) + 1; });
  const topState = Object.entries(stateStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'UT';

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
              Search all publicly available NOAA weather modification reports filed under the
              Weather Modification Reporting Act of 1972. Every operation is required by law to be disclosed.
            </p>
            <div className="source-banner">
              <span>📻</span>
              As discussed on the <strong style={{marginLeft:4, marginRight:4}}>Shawn Ryan Show #207 & #217</strong> with Rainmaker CEO Augustus Doricko
            </div>
            <div className="search-wrap">
              <input
                className="search-input"
                type="text"
                placeholder="Search by project name, state, operation ID, or activity type..."
                value={query}
                onChange={handleSearch}
                autoFocus
              />
              <span className="search-icon">🔍</span>
            </div>
            <div className="filters">
              {ACTIVITIES.map(a => (
                <button
                  key={a}
                  className={`filter-btn${activity === a ? ' active' : ''}`}
                  onClick={() => handleActivity(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </section>

          <div className="stats-row">
            <div className="stat">
              <span className="stat-num">{REPORTS.length.toLocaleString()}</span>
              <span className="stat-label">Total Reports</span>
            </div>
            <div className="stat">
              <span className="stat-num">{Object.keys(stateStats).length}</span>
              <span className="stat-label">States Covered</span>
            </div>
            <div className="stat">
              <span className="stat-num">{topState}</span>
              <span className="stat-label">Most Active State</span>
            </div>
            <div className="stat">
              <span className="stat-num">1972</span>
              <span className="stat-label">Law Since</span>
            </div>
          </div>

          <div className="info-box">
            <strong>📋 What are these documents?</strong> Under the <strong>Weather Modification Reporting Act of 1972</strong> and the <strong>Weather Modification Act of 1976</strong> (15 CFR § 908), every company conducting cloud seeding or weather modification in the US must file reports with NOAA at least 10 days before each operation. These are fully public records.
            {' '}<strong>Rainmaker CEO Augustus Doricko</strong> confirmed on the Shawn Ryan Show (<a href="https://shawnryanshow.com/blogs/vigilance-elite-blogs/srs-207-augustus-doricko-ceo-of-rainmaker-manipulating-the-weather" target="_blank" rel="noreferrer">SRS #207</a> and <a href="https://www.youtube.com/watch?v=cJhqXAZP7Mk" target="_blank" rel="noreferrer">SRS #217</a>) that Rainmaker's operations are fully permitted and logged in these public filings.
          </div>

          <div className="results-header">
            <span className="results-count">
              {filtered.length === 0
                ? 'No results found'
                : `Showing ${((page-1)*PER_PAGE)+1}–${Math.min(page*PER_PAGE, filtered.length)} of ${filtered.length.toLocaleString()} reports`}
            </span>
            <select className="sort-select" value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alpha">A–Z</option>
            </select>
          </div>

          {paginated.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🌤</div>
              <p>No reports match your search.</p>
              <p style={{marginTop:8, fontSize:'0.85rem'}}>Try a different keyword or filter.</p>
            </div>
          ) : (
            <div className="results-grid">
              {paginated.map((r) => (
                <div key={r.id} className="doc-card">
                  <div>
                    <div className="doc-id">{r.id}</div>
                    <div className="doc-title">{r.designation}</div>
                    <div className="doc-meta">
                      {r.state && <span>📍 {r.state}</span>}
                      <span>📅 {r.dateRange}</span>
                    </div>
                    <div className="doc-activity">⚡ {r.activity}</div>
                  </div>
                  <div className="doc-action">
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noreferrer" className="btn-pdf">
                        View PDF
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <pagination>
              {Array.from({length: Math.min(totalPages, 10)}, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`page-btn${page === p ? ' current' : ''}`}
                  onClick={() => { setPage(p); window.scrollTo({top:0, behavior:'smooth'}); }}
                >
                  {p}
                </button>
              ))}
              {totalPages > 10 && <span style={{color:'var(--muted)', alignSelf:'center'}}>...{totalPages} pages</span>}
            </pagination>
          )}
        </div>
      </main>

      <footer>
        <div className="container">
          <p>
            Data sourced from <a href="https://library.noaa.gov/weather-climate/weather-modification-project-reports" target="_blank" rel="noreferrer">NOAA Weather Modification Project Reports</a> — public records under 15 U.S.C. § 330 et seq.
            {' '}| Built for transparency based on context from the <a href="https://shawnryanshow.com" target="_blank" rel="noreferrer">Shawn Ryan Show</a>.
          </p>
        </div>
      </footer>
    </>
  );
}
