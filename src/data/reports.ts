export interface Report {
  id: string;
  designation: string;
  dateRange: string;
  startYear: number;
  activity: string;
  state: string;
  url: string;
}

export const REPORTS: Report[] = [
  // === RAINMAKER / Recent TX Operations ===
  { id: '2021TXB-2', designation: 'Texas Big Bend WMA - Snowpack Augmentation (Final Report)', dateRange: '3/1/2021 - 11/15/2021', startYear: 2021, activity: 'Augment snowpack', state: 'TX', url: 'http://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY22/2021TXB.pdf' },
  { id: '2021TXWT-2', designation: 'Texas West Texas WMA - Snowpack Augmentation (Final Report)', dateRange: '3/1/2021 - 11/15/2021', startYear: 2021, activity: 'Augment snowpack', state: 'TX', url: 'http://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY22/2021TXWT.pdf' },
  // === RECENT CALIFORNIA ===
  { id: '2024CAMOKE-1', designation: 'Mokelumne River Watershed, California - Precipitation Increase', dateRange: '11/1/2023 - 12/31/2023', startYear: 2023, activity: 'Increase precipitation', state: 'CA', url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY24/Q2/2024CAMOKE-1.pdf' },
  { id: '2024CACARE-1', designation: 'Alameda, California - Marine Boundary Layer Study', dateRange: '4/2/2024 - 5/24/2024', startYear: 2024, activity: 'Marine boundary layer', state: 'CA', url: 'https://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/FY24/Q3/2024CACARE-1.pdf' },
  // === UTAH - Alta/Snowbird ===
  { id: '05-1260', designation: 'Alta/Snowbird, Utah - Snowpack Augmentation', dateRange: '10/15/2004 - 12/24/2004', startYear: 2004, activity: 'Augment snowpack', state: 'UT', url: 'http://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/Alta%20-%20Snowbird_05-1260_10.15.2004-12.24.2004.pdf' },
  { id: '06-1307', designation: 'Alta/Snowbird, Utah - Snowpack Augmentation', dateRange: '10/15/2005 - 12/24/2005', startYear: 2005, activity: 'Augment snowpack', state: 'UT', url: 'http://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/Alta%20-%20Snowbird_06-1307_10.15.2005-12.24.2005.pdf' },
  { id: '07-1346', designation: 'Alta/Snowbird, Utah - Snowpack Augmentation', dateRange: '10/17/2006 - 12/24/2006', startYear: 2006, activity: 'Augment snowpack', state: 'UT', url: 'http://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/Alta%20-%20Snowbird_07-1346_10.17.2006-12.24.2006.pdf' },
  { id: '07-1384', designation: 'Alta/Snowbird, Utah - Snowpack Augmentation (2007–08)', dateRange: '10/15/2007 - 12/24/2007', startYear: 2007, activity: 'Augment snowpack', state: 'UT', url: 'http://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/Alta%20-%20Snowbird,%20Utah_07-1384_10.15.2007-12.24.2007.pdf' },
  { id: '08-1422', designation: 'Alta/Snowbird, Utah - Snowpack Augmentation (2008–09)', dateRange: '10/15/2008 - 12/24/2008', startYear: 2008, activity: 'Augment snowpack', state: 'UT', url: 'http://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/Alta%20-%20Snowbird,%20Utah_08-1422_10.15.2008-12.24.2008.pdf' },
  { id: '10-1485', designation: 'Alta/Snowbird, Utah - Snowpack Augmentation (2009–10)', dateRange: '10/15/2009 - 12/24/2009', startYear: 2009, activity: 'Augment snowpack', state: 'UT', url: 'http://library.oarcloud.noaa.gov/noaa_documents.lib/OAR/OWAQ/Weather_Modification_Project/Alta%20-%20Snowbird,%20Utah_10-1485_10.15.2009-12.24.2009.pdf' },
  // === COLORADO ===
  { id: 'CO-PRECIP-2022-1', designation: 'Colorado River Basin - Precipitation Enhancement Program', dateRange: '11/1/2022 - 4/30/2023', startYear: 2022, activity: 'Increase precipitation', state: 'CO', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  { id: 'CO-SNOW-2021-1', designation: 'Colorado Headwaters - Snowpack Augmentation', dateRange: '12/1/2021 - 3/31/2022', startYear: 2021, activity: 'Augment snowpack', state: 'CO', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === OREGON ===
  { id: 'OR-PEND-2022-1', designation: 'Pendleton, Oregon - Cloud Seeding Operation (Rainmaker)', dateRange: '1/15/2022 - 3/30/2022', startYear: 2022, activity: 'Increase precipitation', state: 'OR', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  { id: 'OR-WILL-2023-1', designation: 'Willamette Valley, Oregon - Precipitation Enhancement', dateRange: '11/10/2023 - 2/28/2024', startYear: 2023, activity: 'Increase precipitation', state: 'OR', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === NEVADA ===
  { id: 'NV-LAKE-2020-1', designation: 'Lake Tahoe Basin, Nevada - Snowpack Augmentation', dateRange: '11/1/2020 - 3/31/2021', startYear: 2020, activity: 'Augment snowpack', state: 'NV', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  { id: 'NV-TRUC-2021-1', designation: 'Truckee River Basin, Nevada - Precipitation Increase', dateRange: '12/1/2021 - 4/15/2022', startYear: 2021, activity: 'Increase precipitation', state: 'NV', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === ARIZONA ===
  { id: 'AZ-SALT-2023-1', designation: 'Salt River Project, Arizona - Cloud Seeding Program', dateRange: '7/1/2023 - 9/30/2023', startYear: 2023, activity: 'Increase precipitation', state: 'AZ', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === WYOMING ===
  { id: 'WY-WIND-2022-1', designation: 'Wind River Range, Wyoming - Snowpack Enhancement', dateRange: '11/15/2022 - 3/31/2023', startYear: 2022, activity: 'Augment snowpack', state: 'WY', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === IDAHO ===
  { id: 'ID-BOI-2021-1', designation: 'Boise River Basin, Idaho - Cloud Seeding Operations', dateRange: '1/1/2021 - 4/30/2021', startYear: 2021, activity: 'Increase precipitation', state: 'ID', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === NEW MEXICO ===
  { id: 'NM-RIOGRANDE-2023-1', designation: 'Rio Grande Headwaters, New Mexico - Precipitation Enhancement', dateRange: '6/1/2023 - 9/30/2023', startYear: 2023, activity: 'Increase precipitation', state: 'NM', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === HISTORIC UTAH ===
  { id: 'UT-GSL-2020-1', designation: 'Great Salt Lake, Utah - Precipitation Enhancement Project', dateRange: '11/1/2020 - 4/30/2021', startYear: 2020, activity: 'Increase precipitation', state: 'UT', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  { id: 'UT-PROVO-2019-1', designation: 'Provo River Watershed, Utah - Cloud Seeding', dateRange: '11/15/2019 - 3/31/2020', startYear: 2019, activity: 'Augment snowpack', state: 'UT', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === SOUTH DAKOTA ===
  { id: 'SD-HAIL-2021-1', designation: 'South Dakota Hail Suppression Program', dateRange: '5/1/2021 - 9/30/2021', startYear: 2021, activity: 'Hail suppression', state: 'SD', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  { id: 'SD-HAIL-2022-1', designation: 'South Dakota Hail Suppression Program 2022', dateRange: '5/1/2022 - 9/30/2022', startYear: 2022, activity: 'Hail suppression', state: 'SD', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === NORTH DAKOTA ===
  { id: 'ND-PREC-2022-1', designation: 'North Dakota Cloud Modification Project - Precipitation', dateRange: '4/15/2022 - 9/30/2022', startYear: 2022, activity: 'Increase precipitation', state: 'ND', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === WASHINGTON STATE ===
  { id: 'WA-CASC-2023-1', designation: 'Cascade Mountains, Washington - Snowpack Augmentation', dateRange: '11/20/2023 - 3/31/2024', startYear: 2023, activity: 'Augment snowpack', state: 'WA', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === HISTORIC OPERATIONS ===
  { id: 'HIST-RAINMAKER-OR-2022', designation: 'Rainmaker Technology Corp - Eastern Oregon Cloud Seeding', dateRange: '2/1/2022 - 4/30/2022', startYear: 2022, activity: 'Increase precipitation', state: 'OR', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  { id: 'HIST-RAINMAKER-UT-2023', designation: 'Rainmaker Technology Corp - Utah Department of Natural Resources Contract', dateRange: '11/1/2023 - 4/30/2024', startYear: 2023, activity: 'Increase precipitation', state: 'UT', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  { id: 'HIST-RAINMAKER-CO-2023', designation: 'Rainmaker Technology Corp - Colorado Operations', dateRange: '12/1/2023 - 3/31/2024', startYear: 2023, activity: 'Augment snowpack', state: 'CO', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  { id: 'HIST-RAINMAKER-TX-2025', designation: 'Rainmaker Technology Corp - Texas Cloud Seeding Mission (July 2025)', dateRange: '7/2/2025 - 7/2/2025', startYear: 2025, activity: 'Increase precipitation', state: 'TX', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  // === FOG DISPERSAL ===
  { id: 'CA-FOG-2019-1', designation: 'California Central Valley - Fog Dispersal Program', dateRange: '12/1/2019 - 2/28/2020', startYear: 2019, activity: 'Fog dispersal', state: 'CA', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
  { id: 'CA-FOG-2021-1', designation: 'California Central Valley - Tule Fog Dispersal Operation', dateRange: '12/15/2021 - 2/28/2022', startYear: 2021, activity: 'Fog dispersal', state: 'CA', url: 'https://library.noaa.gov/weather-climate/weather-modification-project-reports' },
];
