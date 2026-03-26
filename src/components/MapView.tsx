'use client';
import { useState } from 'react';
import { Report } from '../data/reports';

interface Props {
  records: Report[];
}

// Approximate centroids for US states + international locations
const COORDS: Record<string, [number, number]> = {
  // US States — [lng, lat]
  AL: [-86.9, 32.8], AK: [-153.4, 61.4], AZ: [-111.9, 34.0], AR: [-92.4, 34.9],
  CA: [-119.4, 36.8], CO: [-105.5, 39.0], CT: [-72.7, 41.6], DE: [-75.5, 39.0],
  FL: [-81.5, 27.8], GA: [-83.4, 32.7], HI: [-157.5, 20.3], ID: [-114.5, 44.1],
  IL: [-89.2, 40.4], IN: [-86.1, 40.3], IA: [-93.1, 42.0], KS: [-98.4, 38.5],
  KY: [-84.3, 37.5], LA: [-91.8, 31.2], ME: [-69.4, 45.3], MD: [-76.6, 39.0],
  MA: [-71.8, 42.3], MI: [-85.4, 44.3], MN: [-94.6, 46.4], MS: [-89.7, 32.4],
  MO: [-92.3, 38.5], MT: [-110.5, 47.0], NE: [-99.9, 41.5], NV: [-116.4, 38.8],
  NH: [-71.6, 43.7], NJ: [-74.4, 40.1], NM: [-106.2, 34.3], NY: [-75.5, 43.0],
  NC: [-79.4, 35.6], ND: [-100.5, 47.5], OH: [-82.9, 40.4], OK: [-97.5, 35.5],
  OR: [-120.5, 44.0], PA: [-77.2, 41.2], RI: [-71.5, 41.7], SC: [-80.9, 33.8],
  SD: [-100.3, 44.4], TN: [-86.7, 35.9], TX: [-99.3, 31.5], UT: [-111.5, 39.3],
  VT: [-72.7, 44.0], VA: [-78.7, 37.5], WA: [-120.5, 47.5], WV: [-80.6, 38.6],
  WI: [-89.6, 44.2], WY: [-107.5, 43.0],
  // International
  'UAE': [54.3, 24.5],
  'SA': [45.0, 24.0],   // Saudi Arabia
  'IND': [78.9, 20.6],  // India
  'AUS': [133.8, -25.3],
  'CHN': [104.2, 35.9],
  'IDN': [113.9, -0.8], // Indonesia
  'MAR': [-7.1, 31.8],  // Morocco
  'KAZ': [66.9, 48.0],  // Kazakhstan
};

// Simple equirectangular projection
function project(lng: number, lat: number, w: number, h: number): [number, number] {
  // Viewport: lng -170 to 180, lat -60 to 80
  const x = ((lng + 170) / 350) * w;
  const y = ((80 - lat) / 140) * h;
  return [x, y];
}

const SOURCE_COLORS: Record<string, string> = {
  'NOAA Report': '#4f8eff',
  'FAA NOTAM': '#b57bff',
  'State Permit': '#3ecf8e',
  'Government Contract': '#f5c842',
  'Legal Filing': '#ff5a5a',
  'FOIA Record': '#38bdf8',
  'Academic Study': '#a855f7',
};

const INTL_LOCATIONS: { code: string; name: string; ops: string[] }[] = [
  { code: 'UAE', name: 'UAE / Dubai', ops: ['UAE National Center of Meteorology cloud seeding', 'Average 100+ ops/year across Al Ain, Abu Dhabi, Dubai'] },
  { code: 'SA', name: 'Saudi Arabia', ops: ['Saudi Presidency of Meteorology & Environment operations', 'Ongoing King Abdulaziz City for Science program'] },
  { code: 'IND', name: 'India', ops: ['Maharashtra cloud seeding operations', 'Karnataka drought relief programs'] },
  { code: 'CHN', name: 'China', ops: ['China Meteorological Administration — largest program globally', '500+ aircraft, 12,000+ rockets annually'] },
  { code: 'AUS', name: 'Australia', ops: ['Snowy Hydro cloud seeding (Snowy Mountains)', 'Tasmania Hydro cloud seeding program'] },
  { code: 'IDN', name: 'Indonesia', ops: ['National Technology Research & Innovation Agency ops', 'Used to suppress fires and drought'] },
  { code: 'MAR', name: 'Morocco', ops: ['Operation Al Ghait — Royal Air Maroc weather program'] },
  { code: 'KAZ', name: 'Kazakhstan', ops: ['"Artificial rain" ops for agriculture and hail suppression'] },
];

export default function MapView({ records }: Props) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; title: string; lines: string[] } | null>(null);
  const W = 1000, H = 480;

  // Aggregate US ops by state
  const stateOps: Record<string, Report[]> = {};
  records.forEach(r => {
    if (r.state && COORDS[r.state]) {
      if (!stateOps[r.state]) stateOps[r.state] = [];
      stateOps[r.state].push(r);
    }
  });

  const maxCount = Math.max(...Object.values(stateOps).map(v => v.length), 1);

  return (
    <div className="map-container">
      <svg viewBox={`0 0 ${W} ${H}`} className="map-svg"
        onMouseLeave={() => setTooltip(null)}>
        {/* Background */}
        <rect width={W} height={H} fill="#050505" />

        {/* Grid lines */}
        {[-30, 0, 30, 60].map(lat => {
          const [, y] = project(0, lat, W, H);
          return <line key={lat} x1={0} y1={y} x2={W} y2={y} stroke="#151515" strokeWidth="1" />;
        })}
        {[-120, -60, 0, 60, 120].map(lng => {
          const [x] = project(lng, 0, W, H);
          return <line key={lng} x1={x} y1={0} x2={x} y2={H} stroke="#151515" strokeWidth="1" />;
        })}

        {/* US region outline (rough bounding box) */}
        {(() => {
          const corners = [[-125, 49], [-67, 49], [-67, 25], [-125, 25]] as [number,number][];
          const pts = corners.map(([lng, lat]) => project(lng, lat, W, H));
          const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';
          return <path d={d} fill="none" stroke="#1a1a2e" strokeWidth="1" />;
        })()}

        {/* US State dots */}
        {Object.entries(stateOps).map(([state, ops]) => {
          const [lng, lat] = COORDS[state];
          const [cx, cy] = project(lng, lat, W, H);
          const intensity = ops.length / maxCount;
          const r = 5 + intensity * 14;
          const hasRM = ops.some(o => o.rainmakerRelated);
          const color = hasRM ? '#4f8eff' : '#3ecf8e';
          return (
            <g key={state}
              onMouseEnter={(e) => {
                const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                setTooltip({
                  x: cx / W * 100,
                  y: cy / H * 100,
                  title: `${state} — ${ops.length} record${ops.length !== 1 ? 's' : ''}`,
                  lines: ops.slice(0, 4).map(o => o.designation.slice(0, 55) + (o.designation.length > 55 ? '…' : '')),
                });
              }}
              style={{ cursor: 'pointer' }}>
              <circle cx={cx} cy={cy} r={r + 4} fill={color} opacity={0.06} />
              <circle cx={cx} cy={cy} r={r} fill={color} opacity={0.2} />
              <circle cx={cx} cy={cy} r={Math.min(r, 8)} fill={color} opacity={0.85} />
              {hasRM && <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke={color} strokeWidth="1" opacity={0.4} />}
              <text x={cx} y={cy - Math.min(r, 8) - 4} textAnchor="middle" fontSize="9"
                fill="#606060" fontFamily="monospace">{state}</text>
            </g>
          );
        })}

        {/* International dots */}
        {INTL_LOCATIONS.map(loc => {
          const [lng, lat] = COORDS[loc.code];
          const [cx, cy] = project(lng, lat, W, H);
          return (
            <g key={loc.code}
              onMouseEnter={() => setTooltip({
                x: cx / W * 100, y: cy / H * 100,
                title: loc.name,
                lines: loc.ops,
              })}
              style={{ cursor: 'pointer' }}>
              <circle cx={cx} cy={cy} r={12} fill="#f5c842" opacity={0.08} />
              <circle cx={cx} cy={cy} r={6} fill="#f5c842" opacity={0.6} />
              <text x={cx} y={cy - 10} textAnchor="middle" fontSize="9"
                fill="#606060" fontFamily="monospace">{loc.code}</text>
            </g>
          );
        })}

        {/* Label: US Region */}
        {(() => {
          const [x, y] = project(-96, 42, W, H);
          return <text x={x} y={y} textAnchor="middle" fontSize="10" fill="#2a2a3e"
            fontFamily="monospace" fontWeight="600">CONTINENTAL US</text>;
        })()}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div className="map-tooltip" style={{
          left: `${Math.min(tooltip.x, 70)}%`,
          top: `${Math.min(tooltip.y + 5, 65)}%`,
        }}>
          <div className="map-tooltip-title">{tooltip.title}</div>
          <div className="map-tooltip-sub">
            {tooltip.lines.map((l, i) => <div key={i}>· {l}</div>)}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="map-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#4f8eff' }} />
          <span>Rainmaker operation</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#3ecf8e' }} />
          <span>Other US operation</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background: '#f5c842' }} />
          <span>International program</span>
        </div>
      </div>
    </div>
  );
}
