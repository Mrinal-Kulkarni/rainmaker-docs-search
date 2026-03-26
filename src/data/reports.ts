export type SourceType = 'NOAA Report' | 'NOAA Final Report' | 'State Permit' | 'Government Contract' | 'State Seasonal Report' | 'Academic Study' | 'Interstate Agreement' | 'FAA Waiver' | 'Federal Register' | 'State Proposal';

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
  // ══════════════════════════════════════════════════════════════════════════
  //  NOAA FY26 Q2  (Jan – Mar 2026) — FINAL REPORTS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: '2026TXTP-F',
    designation: 'Trans-Pecos WMA — 2025 Season Final Report',
    dateRange: 'Mar 1, 2025 – Nov 30, 2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q2/2026TXTP-F.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Final report for 2025 Trans-Pecos season. 40 modification days, 162.07 airborne hours. 6,292g silver iodide, 26,000g sodium chloride. Final activity Oct 24, 2025. Filed by Samuel Kim, Director of Regulatory, Jan 15, 2026.',
    rainmakerRelated: true,
    lat: 31.4,
    lng: -103.5
  },
  {
    id: '2026TXWT-F',
    designation: 'West Texas WMA — 2025 Season Final Report',
    dateRange: 'Mar 1, 2025 – Nov 30, 2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q2/2026TXWT-F.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Final report for 2025 West Texas season. 33 modification days, 100.20 airborne hours. 6,044.5g silver iodide, 30,500g sodium chloride. Dual-purpose: rainfall enhancement + hail suppression. Final activity Oct 24, 2025. Filed by Samuel Kim, Jan 15, 2026.',
    rainmakerRelated: true,
    lat: 31.9,
    lng: -102.1
  },
  {
    id: '2026UTS-F',
    designation: 'Snowbird, Utah — 2025-2026 Final Report',
    dateRange: 'Nov 1, 2025 – Dec 24, 2025',
    startYear: 2025,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q2/2026UTS-F.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Final report for Snowbird Resort cloud seeding. 8 modification days. Nov: 3 days, 24.5 hrs, 490g AgI. Dec: 5 days, 51.25 hrs, 1,025g AgI. Ground-based seeding. Filed by Samuel Kim, Jan 26, 2026.',
    rainmakerRelated: true,
    lat: 40.58,
    lng: -111.65
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  NOAA FY26 Q2  (Jan – Mar 2026) — CONTINUATION REPORTS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: '2026UTCS-1-Q2',
    designation: 'Southern & Central Utah Ground-Based Seeding (2026 Q2)',
    dateRange: 'Nov 1, 2025 – Apr 30, 2026',
    startYear: 2026,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q2/2026UTCS-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Continuation report for the 70 ground-based remotely-operated generators covering ~10,000 sq mi across Southern and Central Utah. Silver iodide at 20g/hr per generator. Filed by Samuel Kim, Director of Regulatory.',
    rainmakerRelated: true,
    lat: 39.0,
    lng: -111.5
  },
  {
    id: '2026UTHU-1-Q2',
    designation: 'High Uintas Snowpack Enhancement (2026 Q2)',
    dateRange: 'Nov 1, 2025 – Apr 30, 2026',
    startYear: 2026,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q2/2026UTHU-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Continuation report. ~28 ground-based generators (some shared with adjacent Western Uintas program) covering 2,000 sq mi in Duchesne/Uinta counties. 20g AgI/hr per generator.',
    rainmakerRelated: true,
    lat: 40.7,
    lng: -110.4
  },
  {
    id: '2026UTWU-1-Q2',
    designation: 'Western Uintas Snowpack Enhancement (2026 Q2)',
    dateRange: 'Nov 1, 2025 – Apr 30, 2026',
    startYear: 2026,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q2/2026UTWU-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Continuation report covering 600 sq mi of Weber/Provo River Basins above 7,000 ft elevation. Ground-based generators shared with High Uintas program.',
    rainmakerRelated: true,
    lat: 40.6,
    lng: -111.2
  },
  {
    id: '2026UTSCS-1-Q2',
    designation: 'Utah Six Creeks Snowpack Enhancement (2026 Q2)',
    dateRange: 'Nov 1, 2025 – Apr 30, 2026',
    startYear: 2026,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q2/2026UTSCS-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Continuation report for the Six Creeks seeding program in Utah, part of the statewide cloud seeding network operated by Rainmaker.',
    rainmakerRelated: true,
    lat: 39.6,
    lng: -111.3
  },
  {
    id: '2026UTNU-F',
    designation: 'Northern Utah Cloud Seeding — Final Report',
    dateRange: 'Nov 1, 2025 – Jan 26, 2026',
    startYear: 2026,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q2/2026UTNU-1.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Final report for Northern Utah program. 3 modification days. 64.75 airborne hours, 9 ground hours. 1,295g silver iodide and 3,590g sodium chloride used. Filed by Samuel Kim.',
    rainmakerRelated: true,
    lat: 41.5,
    lng: -111.8
  },
  {
    id: '2026UTES-F',
    designation: 'East Shore Cloud Seeding — Final Report',
    dateRange: 'Nov 1, 2025 – Jan 26, 2026',
    startYear: 2026,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q2/2026UTES-1.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Final report for East Shore (Great Salt Lake area). 21.25 airborne hours, 6 ground hours. 425g silver iodide, 760g sodium chloride. Filed by Samuel Kim.',
    rainmakerRelated: true,
    lat: 41.1,
    lng: -112.0
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  NOAA FY26 Q1  (Oct – Dec 2025)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: '2026IDBR-1',
    designation: 'Bear River Basin Interstate Pilot — Idaho',
    dateRange: 'Oct 1, 2025 – Apr 30, 2026',
    startYear: 2025,
    activity: 'Augment snowpack',
    state: 'ID',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q1/2026IDBR-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Bear River Basin 1-Year Collaborative Interstate Pilot. 1,464 sq mi across Idaho. 32 Rainmaker V2 drones releasing 3.5g/min aerosolized AgI, plus 3 remote ground-based generators. Three target areas: Alpha, Bravo, Charlie. Funded by Idaho Water Resource Board ($950K) and Utah Legislature ($3M). Third-party validation by NCAR.',
    rainmakerRelated: true,
    lat: 42.5,
    lng: -111.5
  },
  {
    id: '2026UTCS-1',
    designation: 'Southern & Central Utah Ground-Based Seeding',
    dateRange: 'Nov 1, 2025 – Apr 30, 2026',
    startYear: 2025,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q1/2026UTCS-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: '~70 ground-based remotely-operated generators covering 10,000 sq mi across Southern and Central Utah. Each emits 20g silver iodide/hr. Operational decisions by Rainmaker meteorologists. Filed by Samuel Kim, Director of Regulatory.',
    rainmakerRelated: true,
    lat: 39.0,
    lng: -111.5
  },
  {
    id: '2026UTHU-1',
    designation: 'High Uintas Snowpack Enhancement',
    dateRange: 'Nov 1, 2025 – Apr 30, 2026',
    startYear: 2025,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q1/2026UTHU-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: '~28 ground-based generators (some shared with Western Uintas program) covering 2,000 sq mi in Duchesne/Uinta counties. 20g AgI/hr per generator.',
    rainmakerRelated: true,
    lat: 40.7,
    lng: -110.4
  },
  {
    id: '2026UTWU-1',
    designation: 'Western Uintas Snowpack Enhancement',
    dateRange: 'Nov 1, 2025 – Apr 30, 2026',
    startYear: 2025,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q1/2026UTWU-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Weber/Provo River Basins above 7,000 ft. 600 sq mi. Ground-based generators shared with High Uintas program.',
    rainmakerRelated: true,
    lat: 40.6,
    lng: -111.2
  },
  {
    id: '2026UTSU-1',
    designation: 'Utah North-South Drone Seeding Program',
    dateRange: 'Oct 1, 2025 – Apr 30, 2026',
    startYear: 2025,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q1/2026UTSU-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Drone-based glaciogenic seeding covering 2,589 sq mi across 7 target areas: SNOWSCAPE, Kamas, S Uintas, Mt. Pleasant, Fillmore, LaSal, Brian Head. Elijah V2 drones release 3.5g/min AgI for up to 30 min per flight (105g total). Max altitude 15,000 ft AGL. Billed as "largest cloud seeding program in modern American history."',
    rainmakerRelated: true,
    lat: 39.5,
    lng: -111.5
  },
  {
    id: '2026ORBM-1',
    designation: 'Pendleton / Umatilla County Drone Seeding (Season 2)',
    dateRange: 'Oct 1, 2025 – Apr 30, 2026',
    startYear: 2025,
    activity: 'Augment snowpack',
    state: 'OR',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY26/Q1/2026ORBM-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corp',
    agency: 'NOAA',
    notes: 'Season 2 in Umatilla County, OR. 3,231 sq mi target area in the Blue Mountains. Two launch sites (Southern Site and Cabin). Drone-based glaciogenic seeding: 3.5g/min AgI, 30-min flights, max 15,000 ft AGL. Licensed under ORS 558.',
    rainmakerRelated: true,
    lat: 45.5,
    lng: -118.5
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  NOAA FY25 Q3  (Apr – Jun 2025)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: '2025TXST-1',
    designation: 'Project South Texas Weather Modification Association',
    dateRange: 'Mar 5, 2025 – Nov 29, 2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q3/2025TXST-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'NOAA',
    notes: '10,830 sq mi South Texas region. Contracted by the nonprofit STWMA. Operations conducted July 2, 2025, two days before catastrophic Kerr County floods that killed 135+ people. Operations were 125 mi from the flood zone and released just 70g AgI. Widely criticized amid conspiracy theories. Marjorie Taylor Greene introduced federal ban targeting this project. Rainmaker suspended operations same day due to high moisture. No EIS filed.',
    rainmakerRelated: true,
    lat: 28.5,
    lng: -99.0
  },
  {
    id: '2025TXTP-1',
    designation: 'Project Trans-Pecos Weather Modification Association',
    dateRange: 'Mar 15, 2025 – Oct 31, 2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q3/2025TXTP-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'NOAA',
    notes: 'Trans-Pecos region — 7,969 sq mi across Pecos, Reeves, Ward, Loving, and portions of Culberson Counties. Single engine aircraft with flare racks. 40g glaciogenic (5.5g AgI) and 1kg hygroscopic flares. Rainfall enhancement + hail suppression. No EIS filed. Sponsored by Ward County Irrigation District.',
    rainmakerRelated: true,
    lat: 31.4,
    lng: -103.5
  },
  {
    id: '2025TXWT-1',
    designation: 'Project West Texas Weather Modification',
    dateRange: 'Mar 15, 2025 – Oct 31, 2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q3/2025TXWT-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'NOAA',
    notes: 'Region from San Angelo to Midland, TX. Third largest target area in the state — ~6.4 million acres. Rainfall enhancement + hail suppression. Single engine aircraft with flare racks. No EIS filed.',
    rainmakerRelated: true,
    lat: 31.9,
    lng: -102.1
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  NOAA FY25 Q2  (Jan – Mar 2025)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: '2025TXGU-1',
    designation: 'Project Precipitation Enhancement — Gulf Coast',
    dateRange: 'Jan 24, 2025 – Dec 27, 2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025TXGU-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'NOAA',
    notes: '1,236 sq mi Gulf of Mexico coastline. Dispersing charged water droplets into warm stratocumulus/cumulus clouds. Less than 500 gallons of water per flight at >80 knots. Warm cloud seeding technique — no AgI. Rainmaker HQ listed at 251 Little Falls Drive, Wilmington, DE. No EIS filed.',
    rainmakerRelated: true,
    lat: 27.8,
    lng: -97.4
  },
  {
    id: '2025ORBM-1',
    designation: 'Pendleton / Umatilla County Drone Seeding (Season 1)',
    dateRange: 'Dec 13, 2024 – Apr 30, 2025',
    startYear: 2024,
    activity: 'Increase precipitation',
    state: 'OR',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025ORBM-1.pdf',
    sourceType: 'NOAA Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'NOAA',
    notes: 'First licensed precipitation enhancement in Umatilla County. 24,000 sq mi target area — Blue Mountains, SE of Pendleton. Quadcopter UAS dispersing dry, pure AgI at 200g/hr. Each UAS carries 50g AgI for 15-min dispersal at altitude. NEXRAD-based phase change detection used for validation. Filed by Harrison Thomas. First successful operation created a snow day at a local school 15 mi downwind on Dec 12, 2024.',
    rainmakerRelated: true,
    lat: 45.5,
    lng: -118.5
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  STATE PERMITS & LICENSES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'OR-UMATILLA-LICENSE-2024',
    designation: 'Oregon Weather Modification License — Umatilla County',
    dateRange: 'Nov 15, 2024 – Apr 30, 2025',
    startYear: 2024,
    activity: 'Increase precipitation',
    state: 'OR',
    url: 'https://zerogeoengineering.com/2025/rainmaker-cloud-seeding-operations-in-umatilla-oregon-2024-2025/',
    sourceType: 'State Permit',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Oregon Department of Agriculture',
    notes: 'Licensed under ORS 558. Proof-of-concept deployment season — goal was to design, build, and qualify the first version of the autonomous drone-based cloud seeding system. Silver iodide (AgI) used. Monthly operations reports filed Nov 2024 through Apr 2025. ODA determination letter issued Nov 15, 2024. Required to maintain comprehensive records per ORS 558.110.',
    rainmakerRelated: true,
    lat: 45.7,
    lng: -118.8
  },
  {
    id: 'TX-TDLR-LICENSE-2025',
    designation: 'Texas Weather Modification License — TDLR',
    dateRange: '2025',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://www.tdlr.texas.gov/weather/summary.htm',
    sourceType: 'State Permit',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Texas Dept of Licensing and Regulation',
    notes: 'Annual Texas weather modification license required to operate in state. TDLR permits cover up to 4-year periods. Rainmaker operates as contractor for WTWMA, TPWMA, and STWMA under these permits. Texas has required licensing since 1967.',
    rainmakerRelated: true,
    lat: 31.0,
    lng: -100.0
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  STATE SEASONAL / OPERATIONAL REPORTS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'UT-CACHE-2024-25',
    designation: 'Cache Valley UAV Cloud Seeding Program — Season 1',
    dateRange: 'Jan 27, 2025 – Apr 30, 2025',
    startYear: 2025,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://water.utah.gov/wp-content/uploads/2025/09/Cache-Valley-UAV-Seasonal-Report-2024-2025.pdf',
    sourceType: 'State Seasonal Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Utah Division of Water Resources',
    notes: 'First-ever drone-based cloud seeding in Utah. Joint effort with Utah State University and recently-acquired NAWC. 10 "Elijah" UAVs certified. 14 flight missions, 80+ hours of flight time, 8,637g AgI dispersed. Operated within USU Certificate of Authorization — drones limited to within 500 ft of cloud base (1,500–3,000 ft AGL). Concurrent R&D produced Elijah V2.0, Eden forecasting platform, and Prophet validation software.',
    rainmakerRelated: true,
    lat: 41.7,
    lng: -111.8
  },
  {
    id: 'OR-UMATILLA-REPORTS-2024-25',
    designation: 'Umatilla County Monthly Operations Reports',
    dateRange: 'Nov 2024 – Apr 2025',
    startYear: 2024,
    activity: 'Increase precipitation',
    state: 'OR',
    url: 'https://zerogeoengineering.com/2025/rainmaker-cloud-seeding-operations-in-umatilla-oregon-2024-2025/',
    sourceType: 'State Seasonal Report',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Oregon Department of Agriculture',
    notes: 'Monthly operations reports filed with ODA for Nov 2024, Dec 2024, Jan 2025, Feb 2025, Mar 2025, Apr 2025. Includes Pendleton Operations Briefing. First successful operation on Dec 12, 2024 created a snow day at a local school 15 mi downwind. This was Rainmaker\'s proof-of-concept season.',
    rainmakerRelated: true,
    lat: 45.5,
    lng: -118.5
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  GOVERNMENT CONTRACTS & INTERSTATE AGREEMENTS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'UT-DNR-CONTRACT',
    designation: 'Utah Dept of Natural Resources — Statewide Cloud Seeding Contract',
    dateRange: '2024 – ongoing',
    startYear: 2024,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://water.utah.gov/cloudseeding/',
    sourceType: 'Government Contract',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Utah Division of Water Resources',
    notes: 'One of Rainmaker\'s earliest clients. Utah contracted with Rainmaker after acquiring North American Weather Consultants (Oct 2024). Utah is the second-driest state in the US. 2023 Utah Legislature invested $12M one-time + $5M ongoing for cloud seeding. 2025 Legislature added $3M for Bear River Basin. Rainmaker now operates the largest remote-controlled cloud seeding program in the world for Utah.',
    rainmakerRelated: true,
    lat: 39.5,
    lng: -111.5
  },
  {
    id: 'ID-UT-BEAR-RIVER-2025',
    designation: 'Bear River Basin Interstate Pilot Project — Idaho/Utah',
    dateRange: 'Nov 1, 2025 – Apr 30, 2026',
    startYear: 2025,
    activity: 'Augment snowpack',
    state: 'ID',
    url: 'https://idwr.idaho.gov/wp-content/uploads/sites/2/Cloud-Seeding-Committee-Meeting-No.-2-25MATERIALS.pdf',
    sourceType: 'Interstate Agreement',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Idaho Water Resource Board / Utah Division of Water Resources',
    notes: '1-Year Collaborative Interstate Pilot. Idaho Water Resource Board approved $950K (resolution 29-2025, Jul 25, 2025). Utah Legislature mandated $3M contribution. Total UDWR contribution up to $3.496M. 32 Rainmaker V2 drones (3g/min AgI) + 3 remote ground generators in Idaho. Targets Bear River Basin to replenish the Great Salt Lake. Third-party evaluation by NCAR. Working with University of Utah and Utah State University. Approved Oct 31, 2025 by IWRB resolution.',
    rainmakerRelated: true,
    lat: 42.3,
    lng: -111.3
  },
  {
    id: 'CO-DNR-CONTRACT-2025',
    designation: 'Colorado Department of Natural Resources — Cloud Seeding',
    dateRange: '2025 – ongoing',
    startYear: 2025,
    activity: 'Increase precipitation',
    state: 'CO',
    url: 'https://mcj.vc/inevitable-podcast/rainmaker',
    sourceType: 'Government Contract',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Colorado Department of Natural Resources',
    notes: 'Rainmaker contracted with Colorado DNR for cloud seeding operations. Augustus Doricko confirmed Colorado as one of six primary domestic states of operation in Jan 2026 MCJ podcast. Colorado has a long history of wintertime cloud seeding via the Colorado Water Conservation Board.',
    rainmakerRelated: true,
    lat: 39.5,
    lng: -105.8
  },
  {
    id: 'CA-SLO-CONTRACT',
    designation: 'San Luis Obispo County Cloud Seeding Program',
    dateRange: '2019 – 2024',
    startYear: 2019,
    activity: 'Increase precipitation',
    state: 'CA',
    url: 'https://www.latimes.com/environment/story/2025-07-21/how-a-california-company-became-the-center-of-a-texas-flood-conspiracy',
    sourceType: 'Government Contract',
    operator: 'Rainmaker Technology Corporation',
    agency: 'San Luis Obispo County Public Works',
    notes: 'Municipal-level program. County explored cloud seeding in early 2000s due to severe drought and declining Lopez Lake reservoir supplies (~50,000 acre-feet). Program ran 2019–2024. Added ~1,200 acre-feet/year on average, ~2,500 in best year. Cost ~$300/acre-foot vs $1,500 for State Water Project imports. Challenge: limited clouds during drought. Supervising engineer David Spiegel considered program a success.',
    rainmakerRelated: true,
    lat: 35.3,
    lng: -120.7
  },
  {
    id: 'CA-SB-CONTRACT',
    designation: 'Santa Barbara County Precipitation Enhancement Program',
    dateRange: '2019 – ongoing',
    startYear: 2019,
    activity: 'Increase precipitation',
    state: 'CA',
    url: 'https://www.countyofsb.org/2548/Cloud-Seeding-Precipitation-Enhancement',
    sourceType: 'Government Contract',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Santa Barbara County Water Agency',
    notes: 'Municipal-level program. SBCWA has conducted cloud seeding since 1981. Rainmaker contracted to enhance precipitation to increase surface water runoff in watersheds behind major water reservoirs. Ground-based generators and flare-based seeding techniques.',
    rainmakerRelated: true,
    lat: 34.7,
    lng: -119.8
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  STATE PROPOSALS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'UT-BRB-PROPOSAL-2025',
    designation: 'Bear River Basin Cloud Seeding Proposal',
    dateRange: 'Mar 2025',
    startYear: 2025,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://zerogeoengineering.com/wp-content/uploads/2025/08/UT-Bear-Proposal.Mar-2025.pdf',
    sourceType: 'State Proposal',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Utah Division of Water Resources',
    notes: 'Formal proposal for the Bear River Basin interstate UAS cloud seeding pilot project. Outlines plan to use 32 Rainmaker Elijah V2 drones across the Bear River Basin to replenish the Great Salt Lake. Includes operational plan, suspension criteria, airspace evaluation, and equipment specs. Led to $3M Utah legislative appropriation and $950K Idaho Water Resource Board funding.',
    rainmakerRelated: true,
    lat: 41.5,
    lng: -111.5
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  NAWC / PRE-ACQUISITION REPORTS (operated by NAWC, now owned by Rainmaker)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: '2025UTGSL-F',
    designation: 'Great Salt Lake Ground-Based Seeding — Final Report (Pre-Acquisition)',
    dateRange: 'Nov 1, 2024 – Dec 31, 2024',
    startYear: 2024,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025UTGSL-1.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'North American Weather Consultants (Rainmaker subsidiary)',
    agency: 'NOAA',
    notes: 'Filed by Todd Flanagan (NAWC). 24 modification days. 33,720g AgI total. NAWC was acquired by Rainmaker in October 2024. NAWC had operated cloud seeding in Utah since 1974 — over 40 years of operations. This program targeted the Great Salt Lake watershed.',
    rainmakerRelated: true,
    lat: 41.0,
    lng: -112.5
  },
  {
    id: '2025UTBC-F',
    designation: 'Book Cliffs Airborne Seeding — Final Report (Pre-Acquisition)',
    dateRange: 'Nov 1, 2024 – Jan 10, 2025',
    startYear: 2024,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025UTBC-1.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'North American Weather Consultants (Rainmaker subsidiary)',
    agency: 'NOAA',
    notes: 'Filed by Todd Flanagan (NAWC). 6 modification days, 154 airborne hours. 2,030g AgI total plus 74.5g urea and 234.5g NaCl. Book Cliffs region of eastern Utah. NAWC was acquired by Rainmaker Oct 2024.',
    rainmakerRelated: true,
    lat: 39.8,
    lng: -110.0
  },
  {
    id: '2025UTCS-F',
    designation: 'Southern & Central Utah — Final Report (Pre-Acquisition)',
    dateRange: 'Nov 1, 2024 – Dec 31, 2024',
    startYear: 2024,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025UTCS-1.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'North American Weather Consultants (Rainmaker subsidiary)',
    agency: 'NOAA',
    notes: 'Filed by Todd Flanagan (NAWC). 20 modification days. 1,847.25 ground apparatus hours. 19,159g AgI total. Ground-based seeding covering Southern and Central Utah. NAWC acquired by Rainmaker Oct 2024.',
    rainmakerRelated: true,
    lat: 39.0,
    lng: -111.5
  },
  {
    id: '2025UTHU-F',
    designation: 'High Uintas — Final Report (Pre-Acquisition)',
    dateRange: 'Nov 1, 2024 – Dec 31, 2024',
    startYear: 2024,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025UTHU-1.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'North American Weather Consultants (Rainmaker subsidiary)',
    agency: 'NOAA',
    notes: 'Filed by David Yorty (NAWC). 17 modification days. 643 ground hours. 7,728g AgI total. High Uintas region of Duchesne/Uinta counties. NAWC acquired by Rainmaker Oct 2024.',
    rainmakerRelated: true,
    lat: 40.7,
    lng: -110.4
  },
  {
    id: '2025UTNU-F',
    designation: 'Northern Utah — Final Report (Pre-Acquisition)',
    dateRange: 'Nov 1, 2024 – Dec 31, 2024',
    startYear: 2024,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025UTNU-1.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'North American Weather Consultants (Rainmaker subsidiary)',
    agency: 'NOAA',
    notes: 'Filed by Cole Osborne (NAWC). 24 modification days. 969 ground hours. 7,752g AgI total. Northern Utah. NAWC acquired by Rainmaker Oct 2024.',
    rainmakerRelated: true,
    lat: 41.5,
    lng: -111.8
  },
  {
    id: '2025UTSCS-F',
    designation: 'Six Creeks — Final Report (Pre-Acquisition)',
    dateRange: 'Nov 15, 2024 – Dec 31, 2024',
    startYear: 2024,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025UTSCS-1.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'North American Weather Consultants (Rainmaker subsidiary)',
    agency: 'NOAA',
    notes: 'Filed by David Yorty (NAWC). 20 modification days. 253 ground hours. 2,024g AgI total. Six Creeks region. NAWC acquired by Rainmaker Oct 2024.',
    rainmakerRelated: true,
    lat: 39.6,
    lng: -111.3
  },
  {
    id: '2025UTWU-F',
    designation: 'Western Uintas — Final Report (Pre-Acquisition)',
    dateRange: 'Nov 1, 2024 – Dec 31, 2024',
    startYear: 2024,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025UTWU-1.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'North American Weather Consultants (Rainmaker subsidiary)',
    agency: 'NOAA',
    notes: 'Filed by David Yorty (NAWC). 11,039g AgI total. Weber/Provo River Basins. Ground-based seeding. NAWC acquired by Rainmaker Oct 2024.',
    rainmakerRelated: true,
    lat: 40.6,
    lng: -111.2
  },
  {
    id: '2025UTS-F',
    designation: 'Snowbird Resort — Final Report (Pre-Acquisition)',
    dateRange: 'Nov 1, 2024 – Dec 17, 2024',
    startYear: 2024,
    activity: 'Augment snowpack',
    state: 'UT',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025UTS-F.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'North American Weather Consultants (Rainmaker subsidiary)',
    agency: 'NOAA',
    notes: 'Filed by David Yorty (NAWC), Dec 24, 2024. Snowbird Resort ground-based seeding. Final activity Dec 17, 2024. The FY26 Snowbird report (2026UTS-F) was filed under Rainmaker directly. NAWC acquired by Rainmaker Oct 2024.',
    rainmakerRelated: true,
    lat: 40.58,
    lng: -111.65
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  ACADEMIC / RESEARCH PARTNERSHIPS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'NCAR-BEAR-RIVER-2025',
    designation: 'NCAR / University of Utah Bear River Validation Study',
    dateRange: '2025 – 2026',
    startYear: 2025,
    activity: 'Research & validation',
    state: 'UT',
    url: 'https://www.eenews.net/articles/a-startup-blamed-for-deadly-floods-is-pitching-cloud-seeding-to-lawmakers/',
    sourceType: 'Academic Study',
    operator: 'Rainmaker Technology Corporation',
    agency: 'NCAR / University of Utah / Utah State University',
    notes: 'Rainmaker working with NCAR, University of Utah, and Utah State University to quantify cloud seeding effectiveness in the Bear River Basin (primary tributary to the Great Salt Lake). Third-party validation funded at $500K from Idaho WRB. Part of the SNOWSCAPE 2026 research campaign — described as the largest cloud seeding research effort ever conducted in Utah. Note: Trump administration is seeking to dismantle NCAR.',
    rainmakerRelated: true,
    lat: 41.5,
    lng: -111.5
  },
  {
    id: 'SNOWSCAPE-2026',
    designation: 'SNOWSCAPE 2026 Research Program — Northern Wasatch',
    dateRange: '2025 – 2026',
    startYear: 2025,
    activity: 'Research & validation',
    state: 'UT',
    url: 'https://water.utah.gov/cloudseeding/',
    sourceType: 'Academic Study',
    operator: 'Rainmaker Technology Corporation',
    agency: 'University of Utah / Utah State University',
    notes: 'Researchers from U of U and USU leading the largest cloud seeding research effort ever conducted in the state. Focuses on winter storms over the northern Wasatch Mountains. Goal is to better understand how cloud seeding affects snowfall and spring runoff. Will calibrate two cutting-edge models to simulate cloud seeding effects on natural precipitation.',
    rainmakerRelated: true,
    lat: 40.8,
    lng: -111.7
  },
  {
    id: 'DRI-SIERRA-2023',
    designation: 'Sierra Nevada Cloud Seeding Efficacy Study',
    dateRange: '2020 – 2023',
    startYear: 2020,
    activity: 'Augment snowpack',
    state: 'CA',
    url: 'https://www.dri.edu/cloud-seeding/',
    sourceType: 'Academic Study',
    operator: 'Desert Research Institute',
    agency: 'DRI / California Dept of Water Resources',
    notes: 'Independent peer-reviewed study found 10–15% precipitation increase from ground-based silver iodide generators in the Sierra Nevada. One event yielded 275 acre-feet of additional water in just 24 minutes of seeding. Rainmaker uses similar AgI-based techniques.',
    rainmakerRelated: false,
    lat: 39.3,
    lng: -120.2
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  FAA WAIVERS & FEDERAL REGULATORY FILINGS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'FAA-107W-00728',
    designation: 'FAA BVLOS + In-Cloud Operations Waiver',
    dateRange: 'Mar 14, 2025',
    startYear: 2025,
    activity: 'Regulatory authorization',
    state: 'US',
    url: 'https://www.faa.gov/media/91776',
    sourceType: 'FAA Waiver',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Federal Aviation Administration',
    notes: 'Certificate of Waiver 107W-2025-00728. Waives 14 CFR §107.31 (Visual Line of Sight), §107.33(b)(c)(2) (Visual Observer), §107.51(c) (Visibility <3 statute miles), §107.51(d) (Cloud Clearance). Authorizes sUAS BVLOS operations, in-cloud operations, and reduced visibility flights. Responsible person: Sam Kim. Issued from 115 Eucalyptus Drive, El Segundo, CA.',
    rainmakerRelated: true,
    lat: 33.9,
    lng: -118.4
  },
  {
    id: 'FAA-107W-00730',
    designation: 'FAA High-Altitude Operations Waiver (5,000 ft AGL)',
    dateRange: 'May 16, 2025',
    startYear: 2025,
    activity: 'Regulatory authorization',
    state: 'US',
    url: 'https://www.faa.gov/media/95001',
    sourceType: 'FAA Waiver',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Federal Aviation Administration',
    notes: 'Certificate of Waiver 107W-2025-00730. Waives 14 CFR §107.51(b) — allows sUAS operations up to 5,000 ft AGL, above the standard 400 ft limit. Responsible person: Sam Kim.',
    rainmakerRelated: true,
    lat: 33.9,
    lng: -118.4
  },
  {
    id: 'FAA-107W-03025',
    designation: 'FAA Amended Altitude Waiver (5,000 ft AGL)',
    dateRange: 'Oct 31, 2025',
    startYear: 2025,
    activity: 'Regulatory authorization',
    state: 'US',
    url: 'https://www.faa.gov/media/106576',
    sourceType: 'FAA Waiver',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Federal Aviation Administration',
    notes: 'Certificate of Waiver 107W-2025-03025. Amends/supersedes waiver 107W-2025-00766. Waives 14 CFR §107.51(b) for altitude up to 5,000 ft AGL. Address updated to 251 Little Falls Drive, Wilmington, DE (corporate restructuring). Responsible person: Sam Kim.',
    rainmakerRelated: true,
    lat: 39.7,
    lng: -75.5
  },
  {
    id: 'FAA-PET-14285',
    designation: 'FAA Petition for Exemption — Hazardous Materials (AgI Flares)',
    dateRange: 'Jul 29, 2025',
    startYear: 2025,
    activity: 'Regulatory authorization',
    state: 'US',
    url: 'https://www.federalregister.gov/documents/2025/07/29/2025-14285/petition-for-exemption-summary-of-petition-received-rainmaker-technology-corporation',
    sourceType: 'Federal Register',
    operator: 'Rainmaker Technology Corporation',
    agency: 'Federal Aviation Administration',
    notes: 'Docket 2025-14285. Rainmaker petitioning FAA for exemption to carry hazardous materials (silver iodide flares) on small drones — not covered by existing Part 107 rules. Air Line Pilots Association (ALPA) filed opposition in Sep 2025 citing safety concerns. FAA had not yet ruled as of early 2026. Published in Federal Register Jul 29, 2025.',
    rainmakerRelated: true,
    lat: 38.9,
    lng: -77.0
  },
  {
    id: 'EPA-VISIT-2025',
    designation: 'Rainmaker EPA Headquarters Visit — Silver Iodide Regulation',
    dateRange: 'Jul 2025',
    startYear: 2025,
    activity: 'Regulatory engagement',
    state: 'DC',
    url: 'https://www.politico.com/news/2026/02/01/how-a-cloud-seeding-startup-leaned-into-controversy-to-get-washingtons-attention-00753086',
    sourceType: 'Government Contract',
    operator: 'Rainmaker Technology Corporation',
    agency: 'EPA',
    notes: 'COO Parker Cardwell and another official visited EPA HQ in July 2025 to discuss silver iodide regulation. Rainmaker hired LSN Partners and Capitol Pillar for federal lobbying starting mid-2024. Capitol Pillar led by Casey Hammond (former Trump Interior acting assistant secretary). LSN advocated on drone waivers, certification, and drought control. Rainmaker has raised $50M+ from investors including Lowercarbon Capital.',
    rainmakerRelated: true,
    lat: 38.9,
    lng: -77.0
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  LEGACY / PRE-RAINMAKER TEXAS FINAL REPORTS (same projects Rainmaker now operates)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: '2024TXWT-F',
    designation: 'West Texas Weather Modification — 2024 Final Report (Pre-Rainmaker)',
    dateRange: 'Mar 1, 2024 – Sep 24, 2024',
    startYear: 2024,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025TXWT-F.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'West Texas Weather Modification Association',
    agency: 'NOAA',
    notes: 'Final season before Rainmaker took over operations. Filed by Keefer McKenna (Project Meteorologist). Based at 8696 Hangar Road, San Angelo, TX. Same program Rainmaker now operates as 2025TXWT-1.',
    rainmakerRelated: false,
    lat: 31.9,
    lng: -102.1
  },
  {
    id: '2024TXTP-F',
    designation: 'Trans-Pecos WMA — 2024 Final Report (Pre-Rainmaker)',
    dateRange: 'May 1, 2024 – Sep 6, 2024',
    startYear: 2024,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q2/2025TXTP-F.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'Trans-Pecos Weather Modification Association',
    agency: 'NOAA',
    notes: 'Final season before Rainmaker took over. 14 modification days, 2,717 airborne hours, 23.7g AgI. Filed by Keefer McKenna. Same program Rainmaker now operates as 2025TXTP-1.',
    rainmakerRelated: false,
    lat: 31.4,
    lng: -103.5
  },
  {
    id: '2024TXST-F',
    designation: 'South Texas WMA — 2024 Final Report (Pre-Rainmaker)',
    dateRange: 'Apr 1, 2024 – Sep 25, 2024',
    startYear: 2024,
    activity: 'Increase precipitation',
    state: 'TX',
    url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY25/Q3/2025TXST-F.pdf',
    sourceType: 'NOAA Final Report',
    operator: 'South Texas Weather Modification Association',
    agency: 'NOAA',
    notes: 'Final season before Rainmaker took over. 39 modification days, 101.95 airborne hours. 3,426.5g AgI + 13,000g NaCl. Filed by Bria DeCarlo. Same program Rainmaker now operates as 2025TXST-1.',
    rainmakerRelated: false,
    lat: 28.5,
    lng: -99.0
  }
];
