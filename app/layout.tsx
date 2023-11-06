import './globals.css';
import './styles/animations.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Groceries App',
  description: 'App built with Next.js, TypeScript, Tailwind and NextAuth',
}

export default function RootLayout({ children }: { children: ReactNode }) {

  // For default font: <body className={inter.className}>

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Asap&display=swap" rel="stylesheet" />
      </head>

      <body>
        <div className="col-v min-h-screen">
          <AuthContext>
            <ToasterContext />
            {children}
          </AuthContext>
        </div>
      </body>
    </html>
  )
}
