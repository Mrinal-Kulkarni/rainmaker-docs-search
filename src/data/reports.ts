export type SourceType = 'NOAA Report' | 'State Permit' | 'Government Contract' | 'Academic Study';

export interface Report {
  id: string;
  designation: string;
  dateRange: string;
  startYear: number;
  activity: string;
  state: string;
  url: string;
  sourceType: SourceType;
  operator: string;
  agency: string;
  notes?: string;
  rainmakerRelated?: boolean;
  lat?: number;
  lng?: number;
}

export const REPORTS: Report[] = [
  // ===== NOAA REPORTS — RAINMAKER 2025 TEXAS OPERATIONS =====
  {
    id: '2025TXGU-1',
    designation: 'Project Precipitation Enhancement — Gulf Coast',
    dateRange: 'Jan 24, 2025 - Dec 27, 2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025TXGU-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'NOAA',
    notes: '1,236 sq mi Gulf of Mexico coastline. Dispersing charged water droplets into warm stratocumulus/cumulus clouds. No Environmental Impact Statement filed.',
    rainmakerRelated: true,
    lat: 27.8,
    lng: -97.4
  },
  {
    id: '2025TXST-1',
    designation: 'Project South Texas Weather Modification Association',
    dateRange: 'Mar 5, 2025 - Nov 29, 2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q3/2025TXST-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'NOAA',
    notes: '10,830 sq mi South Texas region. Operations conducted July 2, 2025, two days before catastrophic Kerr County floods that killed 100+ people. Widely criticized amid conspiracy theories. Marjorie Taylor Greene introduced federal ban targeting this project. No EIS filed.',
    rainmakerRelated: true,
    lat: 28.5,
    lng: -99.0
  },
  {
    id: '2025TXTP-1',
    designation: 'Project Trans-Pecos Weather Modification Association',
    dateRange: 'Mar 15, 2025 - Oct 31, 2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q3/2025TXTP-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'NOAA',
    notes: 'Trans-Pecos region (Pecos, Reeves, Ward, Loving, portions of Culberson Counties). Rainfall enhancement + hail suppression. No EIS filed.',
    rainmakerRelated: true,
    lat: 31.4,
    lng: -103.5
  },
  {
    id: '2025TXWT-1',
    designation: 'Project West Texas Weather Modification',
    dateRange: 'Mar 15, 2025 - Oct 31, 2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q3/2025TXWT-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'NOAA',
    notes: 'Region from San Angelo to Midland, TX. Rainfall enhancement + hail suppression. Single engine aircraft with flare racks. No EIS filed.',
    rainmakerRelated: true,
    lat: 31.9,
    lng: -102.1
  },

  // ===== STATE PERMITS — UTAH & OREGON =====
  {
    id: 'UT-CACHE-2024',
    designation: 'Cache Valley UAV Cloud Seeding Program',
    dateRange: 'Nov 2024 - Apr 2025',
    startYear: 2024,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://water.utah.gov/wp-content/uploads/2025/09/Cache-Valley-UAV-Seasonal-Report-2024-2025.pdf',
    sourceType: 'State Permit',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Utah Division of Water Resources',
    notes: 'First licensed UAV-based precipitation enhancement in Utah. Autonomous drone system (Elijah V2.0) with onboard silver iodide generators. Proof-of-concept deployment. Anti-icing system allows 45-min operation in icing conditions.',
    rainmakerRelated: true,
    lat: 41.7,
    lng: -111.8
  },
  {
    id: 'OR-UMATILLA-2024',
    designation: 'Umatilla County Precipitation Enhancement',
    dateRange: 'Nov 2024 - Apr 2025',
    startYear: 2024,
    activity: 'Increase precipitation',
    state: 'OR',
    url: 'https://zerogeoengineering.com/2025/rainmaker-cloud-seeding-operations-in-umatilla-oregon-2024-2025/',
    sourceType: 'State Permit',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Oregon Department of Agriculture',
    notes: 'Licensed under ORS 558. Silver iodide (AgI) used. First licensed precipitation enhancement in Umatilla County. No environmental impact statement provided to NOAA.',
    rainmakerRelated: true,
    lat: 45.5,
    lng: -118.5
  },

  // ===== GOVERNMENT CONTRACTS =====
  {
    id: 'CO-OPS-2025',
    designation: 'Colorado Rainfall Enhancement Operations',
    dateRange: 'Oct 2025 - ongoing',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'CO',
    url: 'https://www.kunc.org/news/2025-10-10/this-tech-will-make-it-rain-literally-above-colorado',
    sourceType: 'Government Contract',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Colorado Water Conservation Board',
    notes: 'Technology can increase annual rainfall by 15-17% according to Rainmaker officials. Drone-based delivery system. Publicly reported operations as of Oct 2025.',
    rainmakerRelated: true,
    lat: 39.5,
    lng: -105.8
  },

  // ===== ACADEMIC STUDIES =====
  {
    id: 'DRI-SIERRA-2023',
    designation: 'Sierra Nevada Cloud Seeding Efficacy Study',
    dateRange: '2020 - 2023',
    startYear: 2020,
    activity: 'Augment snowpack',
    state: 'CA',
    url: 'https://www.dri.edu/cloud-seeding/',
    sourceType: 'Academic Study',
    operator: 'Desert Research Institute',
    agency: 'DRI / California Dept of Water Resources',
    notes: 'Independent peer-reviewed study found 10-15% precipitation increase from ground-based silver iodide generators in the Sierra Nevada. Rainmaker uses similar AgI-based techniques.',
    rainmakerRelated: false,
    lat: 39.3,
    lng: -120.2
  }
];
