import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rainmaker Ops Search | Public Government Records',
  description: 'Search publicly available NOAA weather modification reports and government documents for Rainmaker and cloud seeding operations — as discussed on the Shawn Ryan Show.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
