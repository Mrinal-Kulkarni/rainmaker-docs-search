import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rainmaker Operations Database',
  description:
    'Search publicly available government records tied to Rainmaker Technology Corporation weather modification operations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
