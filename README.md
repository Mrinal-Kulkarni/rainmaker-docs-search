# Rainmaker Ops Search

A public search engine for NOAA weather modification reports — the government documents referenced by Rainmaker CEO **Augustus Doricko** on the **Shawn Ryan Show** (SRS #207 and SRS #217).

## What is this?

Under the **Weather Modification Reporting Act of 1972** (15 U.S.C. § 330) and the **Weather Modification Act of 1976** (15 CFR § 908), every company conducting cloud seeding in the US must file reports with NOAA at least 10 days before each operation. These are **fully public records**.

On SRS #217, Augustus Doricko specifically said:
> *"All of these reports are publicly available on state government websites right now... We are regulatorially required to do that already."*

This app makes those reports easy to find and search.

## Data Source

- [NOAA Weather Modification Project Reports](https://library.noaa.gov/weather-climate/weather-modification-project-reports) — 1,179+ reports

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Deployed on Vercel**
- Zero external dependencies (pure client-side search)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Mrinal-Kulkarni/rainmaker-docs-search)
