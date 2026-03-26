import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rainmaker Ops — Public Records',
  description: 'Search publicly available government records for Rainmaker Technology Corp weather modification operations.',
  icons: { icon: 'https://www.rainmaker.com/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
