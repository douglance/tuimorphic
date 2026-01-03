import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import 'tuimorphic/styles.css';
import './global.css';

export const metadata = {
  title: {
    default: 'Tuimorphic',
    template: '%s | Tuimorphic',
  },
  description:
    'Terminal-aesthetic React components built on Base UI with SRCL styling',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
