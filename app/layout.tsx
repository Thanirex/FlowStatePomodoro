import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-jp',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Flow Mode - Find Your Focus',
  description: 'A serene Pomodoro timer inspired by Japanese minimalism. Stay focused and productive.',
  keywords: ['pomodoro', 'timer', 'productivity', 'focus', 'Japanese', 'minimalist', 'zen', 'meditation', 'work timer'],
  authors: [{ name: 'Flow Mode' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Flow Mode - Find Your Focus',
    description: 'A serene Pomodoro timer inspired by Japanese minimalism',
    type: 'website',
    siteName: 'Flow Mode',
  },
  twitter: {
    card: 'summary',
    title: 'Flow Mode - Find Your Focus',
    description: 'A serene Pomodoro timer inspired by Japanese minimalism',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
